import { GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Logo({ className, ...props }: LogoProps) {
  return (
    <div className={cn("flex items-center", className)} {...props}>
      <GraduationCap className="h-6 w-6 text-primary" />
      <span className="ml-2 text-xl font-bold">Smart Learner</span>
    </div>
  );
}