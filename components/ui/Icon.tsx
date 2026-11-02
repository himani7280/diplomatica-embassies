import {
  Building2,
  CalendarCheck,
  ClipboardList,
  FileCheck2,
  FileText,
  Globe,
  GraduationCap,
  Headset,
  Home,
  MessageSquare,
  Signpost,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/data/siteData";

const ICONS: Record<IconName, LucideIcon> = {
  graduation: GraduationCap,
  "file-user": FileText,
  "file-check": FileCheck2,
  signpost: Signpost,
  users: Users,
  globe: Globe,
  "clipboard-user": ClipboardList,
  "clipboard-list": ClipboardList,
  home: Home,
  building: Building2,
  headset: Headset,
  "trending-up": TrendingUp,
  message: MessageSquare,
  calendar: CalendarCheck,
};

export function Icon({
  name,
  className,
  strokeWidth = 1.6,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}) {
  const Cmp = ICONS[name] ?? Globe;
  return <Cmp className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}
