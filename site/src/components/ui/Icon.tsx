import {
  Sparkles, Heart, Activity, User, Droplet, MessageCircle, Video, Plane, MapPin,
  HeartPulse, House, PiggyBank, ShieldCheck, ClipboardCheck, Palmtree, CalendarCheck,
  Lock, Star, Award, Stethoscope, Globe, type LucideProps,
} from "lucide-react";

const map = {
  Sparkles, Heart, Activity, User, Droplet, MessageCircle, Video, Plane, MapPin,
  HeartPulse, House, PiggyBank, ShieldCheck, ClipboardCheck, Palmtree, CalendarCheck,
  Lock, Star, Award, Stethoscope, Globe,
} as const;

export type IconName = keyof typeof map;

export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const Cmp = map[name as IconName] ?? Sparkles;
  return <Cmp {...props} />;
}
