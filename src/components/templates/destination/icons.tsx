import {
  Plane,
  TrainFront,
  Car,
  Sun,
  Clock,
  Route,
  Landmark,
  Waves,
  Moon,
  Flower2,
  Star,
  Flame,
  type LucideIcon,
} from "lucide-react";
import type { IconKey } from "@/src/lib/seed/destinationMeta";

/** Maps serialisable icon keys (from destinationMeta) to lucide components. */
export const ICONS: Record<IconKey, LucideIcon> = {
  plane: Plane,
  train: TrainFront,
  car: Car,
  sun: Sun,
  clock: Clock,
  route: Route,
  landmark: Landmark,
  waves: Waves,
  moon: Moon,
  flower: Flower2,
  star: Star,
  flame: Flame,
};
