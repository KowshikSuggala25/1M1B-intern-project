import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Leaf, 
  Target, 
  Users, 
  TrendingUp, 
  Calendar,
  Award,
  Globe
} from "lucide-react";
import { HabitCard, Habit } from "@/components/HabitCard";
import { DailyTracker } from "@/components/DailyTracker";
import { ProgressDashboard } from "@/components/ProgressDashboard";
import { availableHabits } from "@/data/habits";
import heroImage from "@/assets/hero-sustainability.jpg";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [selectedHabits, setSelectedHabits] = useState<Habit[]>([]);
  const [completedHabits, setCompletedHabits] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();

  // Mock data for demo purposes
  const [progressData] = useState({
    personalSavings: 15.6,
    targetSavings: 25.0,
    daysCompleted: 8,
    totalDays: 12,
    collectiveSavings: 234.7,
    totalParticipants: 15
  });

  const handleHabitToggle = (habitId: string) => {
    const habit = availableHabits.find(h => h.id === habitId);
    if (!habit) return;

    if (selectedHabits.find(h => h.id === habitId)) {
      setSelectedHabits(prev => prev.filter(h => h.id !== habitId));
      toast({
        title: "Habit removed",
        description: `${habit.title} removed from your challenge`,
      });
    } else if (selectedHabits.length < 5) {
      setSelectedHabits(prev => [...prev, habit]);
      toast({
        title: "Habit selected!",
        description: `${habit.title} added to your challenge`,
      });
    } else {
      toast({
        title: "Maximum reached",
        description: "You can select up to 5 habits for your challenge",
        variant: "destructive",
      });
    }
  };

  const handleHabitComplete = (habitId: string, completed: boolean) => {
    setCompletedHabits(prev => ({
      ...prev,
      [habitId]: completed
    }));

    const habit = selectedHabits.find(h => h.id === habitId);
    if (habit && completed) {
      toast({
        title: "Great job! 🌱",
        description: `You saved ${(habit.co2Savings / 7).toFixed(2)} kg CO₂ today!`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative container mx-auto px-4 py-16 text-center">
          <Badge className="mb-4 bg-success/10 text-success border-success/20">
            <Leaf className="h-3 w-3 mr-1" />
            CO₂ Footprint Challenge
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Reduce Your Carbon Footprint
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join our internship challenge to track sustainable habits and measure your real environmental impact. 
            Every action counts towards a greener future.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-card/80 backdrop-blur px-4 py-2 rounded-full">
              <Target className="h-5 w-5 text-success" />
              <span className="font-medium">Track 3-5 Habits</span>
            </div>
            <div className="flex items-center gap-2 bg-card/80 backdrop-blur px-4 py-2 rounded-full">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span className="font-medium">Measure CO₂ Savings</span>
            </div>
            <div className="flex items-center gap-2 bg-card/80 backdrop-blur px-4 py-2 rounded-full">
              <Users className="h-5 w-5 text-accent" />
              <span className="font-medium">Collective Impact</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="habits">Select Habits</TabsTrigger>
            <TabsTrigger value="tracker">Daily Tracker</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
              <Card className="bg-gradient-to-br from-success/10 to-accent/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-success" />
                    Your Challenge
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-success mb-2">
                    {selectedHabits.length} / 5 Habits Selected
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Potential weekly savings: {selectedHabits.reduce((sum, h) => sum + h.co2Savings, 0).toFixed(1)} kg CO₂
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-primary/10 to-earth/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Today's Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-primary mb-2">
                    {Object.values(completedHabits).filter(Boolean).length} / {selectedHabits.length}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Habits completed today
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-accent/10 to-success/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-accent" />
                    Collective Impact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-accent mb-2">
                    {progressData.collectiveSavings} kg
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Total CO₂ saved by all interns
                  </p>
                </CardContent>
              </Card>
            </div>

            <ProgressDashboard {...progressData} />
          </TabsContent>

          <TabsContent value="habits" className="mt-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Choose Your Sustainable Habits</h2>
              <p className="text-muted-foreground">
                Select 3-5 habits you want to track during your internship. Each habit shows the estimated CO₂ savings per week.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {availableHabits.map((habit) => (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  isSelected={selectedHabits.some(h => h.id === habit.id)}
                  onToggle={handleHabitToggle}
                />
              ))}
            </div>

            {selectedHabits.length > 0 && (
              <Card className="mt-6 bg-success/5 border-success/20">
                <CardHeader>
                  <CardTitle className="text-success">Selected Habits Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Weekly CO₂ savings potential: <span className="font-bold text-success">
                      {selectedHabits.reduce((sum, h) => sum + h.co2Savings, 0).toFixed(1)} kg
                    </span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedHabits.map(habit => (
                      <Badge key={habit.id} variant="secondary">
                        {habit.title}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="tracker" className="mt-6">
            <DailyTracker
              selectedHabits={selectedHabits}
              completedHabits={completedHabits}
              onHabitComplete={handleHabitComplete}
            />
          </TabsContent>

          <TabsContent value="progress" className="mt-6">
            <ProgressDashboard {...progressData} />
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Impact Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-semibold mb-2">Your Environmental Impact</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Equivalent to planting {Math.round(progressData.personalSavings / 0.8)} trees</li>
                      <li>• Saved energy for {Math.round(progressData.personalSavings / 2.3)} days of home electricity</li>
                      <li>• Equivalent to {Math.round(progressData.personalSavings * 4.3)} km not driven</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Collective Achievement</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Group planted equivalent of {Math.round(progressData.collectiveSavings / 0.8)} trees</li>
                      <li>• Prevented {Math.round(progressData.collectiveSavings * 4.3)} km of car emissions</li>
                      <li>• Average impact: {(progressData.collectiveSavings / progressData.totalParticipants).toFixed(1)} kg CO₂ per person</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default Index;