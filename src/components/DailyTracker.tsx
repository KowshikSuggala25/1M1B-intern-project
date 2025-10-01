import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Calendar, CheckCircle2, Plus } from "lucide-react";
import { Habit } from "./HabitCard";
import { format } from "date-fns";

interface DailyTrackerProps {
  selectedHabits: Habit[];
  completedHabits: Record<string, boolean>;
  onHabitComplete: (habitId: string, completed: boolean) => void;
  currentDate?: Date;
}

export const DailyTracker = ({ 
  selectedHabits, 
  completedHabits, 
  onHabitComplete,
  currentDate = new Date()
}: DailyTrackerProps) => {
  const completedCount = Object.values(completedHabits).filter(Boolean).length;
  const totalDailySavings = selectedHabits.reduce((sum, habit) => {
    return completedHabits[habit.id] ? sum + (habit.co2Savings / 7) : sum;
  }, 0);

  const allCompleted = selectedHabits.length > 0 && completedCount === selectedHabits.length;

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-primary/10 to-accent/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Today's Challenge - {format(currentDate, 'MMMM d, yyyy')}
            </CardTitle>
            {allCompleted && (
              <Badge className="bg-success text-success-foreground">
                <CheckCircle2 className="h-4 w-4 mr-1" />
                All Done!
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 mb-4">
            <div className="flex justify-between text-sm">
              <span>Progress: {completedCount} / {selectedHabits.length} habits</span>
              <span className="font-medium text-success">
                {totalDailySavings.toFixed(2)} kg CO₂ saved today
              </span>
            </div>
          </div>

          {selectedHabits.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Plus className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
              <p>No habits selected yet. Choose your sustainable habits to start tracking!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {selectedHabits.map((habit) => (
                <div 
                  key={habit.id}
                  className="flex items-center space-x-3 p-3 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
                >
                  <Checkbox
                    id={habit.id}
                    checked={completedHabits[habit.id] || false}
                    onCheckedChange={(checked) => 
                      onHabitComplete(habit.id, checked as boolean)
                    }
                    className="data-[state=checked]:bg-success data-[state=checked]:border-success"
                  />
                  <label 
                    htmlFor={habit.id}
                    className="flex-1 text-sm font-medium cursor-pointer"
                  >
                    {habit.title}
                  </label>
                  <Badge variant="outline" className="text-xs">
                    {(habit.co2Savings / 7).toFixed(2)} kg CO₂
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};