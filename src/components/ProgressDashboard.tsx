import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Target, Calendar } from "lucide-react";

interface ProgressDashboardProps {
  personalSavings: number;
  targetSavings: number;
  daysCompleted: number;
  totalDays: number;
  collectiveSavings: number;
  totalParticipants: number;
}

export const ProgressDashboard = ({
  personalSavings,
  targetSavings,
  daysCompleted,
  totalDays,
  collectiveSavings,
  totalParticipants
}: ProgressDashboardProps) => {
  const progressPercentage = (personalSavings / targetSavings) * 100;
  const dayProgressPercentage = (daysCompleted / totalDays) * 100;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-gradient-to-br from-success/10 to-accent/10">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Personal CO₂ Saved</CardTitle>
          <TrendingUp className="h-4 w-4 text-success" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-success">{personalSavings.toFixed(1)} kg</div>
          <Progress value={progressPercentage} className="mt-2" />
          <p className="text-xs text-muted-foreground mt-2">
            {progressPercentage.toFixed(0)}% of target ({targetSavings} kg)
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-primary/10 to-earth/10">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Days Completed</CardTitle>
          <Calendar className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">{daysCompleted}</div>
          <Progress value={dayProgressPercentage} className="mt-2" />
          <p className="text-xs text-muted-foreground mt-2">
            {dayProgressPercentage.toFixed(0)}% of internship ({totalDays} days)
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-accent/10 to-primary/10">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Collective Impact</CardTitle>
          <Users className="h-4 w-4 text-accent" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-accent">{collectiveSavings.toFixed(1)} kg</div>
          <p className="text-xs text-muted-foreground mt-2">
            Total saved by {totalParticipants} participants
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-earth/10 to-success/10">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Impact Level</CardTitle>
          <Target className="h-4 w-4 text-earth" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-earth">
            {personalSavings > 20 ? "High" : personalSavings > 10 ? "Medium" : "Getting Started"}
          </div>
          <Badge variant="secondary" className="mt-2">
            {personalSavings > 20 ? "🌟 Eco Champion" : personalSavings > 10 ? "🌱 Growing Impact" : "🌿 Started Journey"}
          </Badge>
        </CardContent>
      </Card>
    </div>
  );
};