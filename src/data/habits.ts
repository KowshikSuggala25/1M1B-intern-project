import { Habit } from "@/components/HabitCard";

export const availableHabits: Habit[] = [
  {
    id: "cycling",
    title: "Cycle to Work",
    description: "Use bicycle instead of car/public transport for daily commute",
    co2Savings: 2.5,
    icon: "bike",
    category: "Transport"
  },
  {
    id: "plant-based-meal",
    title: "One Plant-Based Meal Daily",
    description: "Replace one meat meal with a plant-based alternative each day",
    co2Savings: 3.2,
    icon: "utensils",
    category: "Food"
  },
  {
    id: "no-single-use-plastic",
    title: "Skip Single-Use Plastics",
    description: "Avoid single-use plastic items like bottles, bags, and utensils",
    co2Savings: 1.8,
    icon: "recycle",
    category: "Consumption"
  },
  {
    id: "energy-saving",
    title: "Switch Off Devices",
    description: "Turn off electronics and unplug chargers when not in use",
    co2Savings: 2.1,
    icon: "zap",
    category: "Energy"
  },
  {
    id: "digital-receipts",
    title: "Go Digital",
    description: "Choose digital receipts and documents over paper versions",
    co2Savings: 0.9,
    icon: "leaf",
    category: "Digital"
  },
  {
    id: "public-transport",
    title: "Public Transport",
    description: "Use public transport instead of private vehicle for longer trips",
    co2Savings: 4.2,
    icon: "bike",
    category: "Transport"
  },
  {
    id: "reusable-water",
    title: "Reusable Water Bottle",
    description: "Use a reusable water bottle instead of buying bottled water",
    co2Savings: 1.5,
    icon: "recycle",
    category: "Consumption"
  },
  {
    id: "meal-planning",
    title: "Reduce Food Waste",
    description: "Plan meals to minimize food waste and leftovers",
    co2Savings: 2.8,
    icon: "utensils",
    category: "Food"
  }
];