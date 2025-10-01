import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Leaf, Bike, Utensils, Zap, Recycle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Habit {
  id: string;
  title: string;
  description: string;
  co2Savings: number;
  icon: string;
  category: string;
}

const iconMap = {
  leaf: Leaf,
  bike: Bike,
  utensils: Utensils,
  zap: Zap,
  recycle: Recycle,
};

interface HabitCardProps {
  habit: Habit;
  isSelected: boolean;
  onToggle: (habitId: string) => void;
}

export const HabitCard = ({ habit, isSelected, onToggle }: HabitCardProps) => {
  const IconComponent = iconMap[habit.icon as keyof typeof iconMap] || Leaf;

  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all duration-300 hover:shadow-lg",
        isSelected 
          ? "border-success bg-success/5 shadow-md" 
          : "hover:border-accent/50"
      )}
      onClick={() => onToggle(habit.id)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <IconComponent 
            className={cn(
              "h-6 w-6",
              isSelected ? "text-success" : "text-accent"
            )} 
          />
          <Badge 
            variant={isSelected ? "default" : "secondary"}
            className={cn(
              isSelected && "bg-success text-success-foreground"
            )}
          >
            {habit.co2Savings}kg CO₂/week
          </Badge>
        </div>
        <CardTitle className="text-lg">{habit.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{habit.description}</p>
        <Button 
          variant={isSelected ? "default" : "outline"}
          className={cn(
            "w-full",
            isSelected && "bg-success hover:bg-success/90"
          )}
        >
          {isSelected ? "Selected" : "Select Habit"}
        </Button>
      </CardContent>
    </Card>
  );
};