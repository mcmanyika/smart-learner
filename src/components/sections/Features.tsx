import {
  Sparkles,
  BarChart3,
  Calendar,
  Users,
  MessageSquare,
  Shield,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
  {
    name: 'Smart Analytics',
    description: 'Get real-time insights into student performance and institutional metrics.',
    icon: BarChart3,
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    name: 'AI-Powered Learning',
    description: 'Personalized learning paths adapted to each student\'s unique needs.',
    icon: Sparkles,
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    name: 'Seamless Scheduling',
    description: 'Intelligent timetabling and resource management system.',
    icon: Calendar,
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    name: 'Community Hub',
    description: 'Connect students, teachers, and parents in one collaborative platform.',
    icon: Users,
    gradient: 'from-orange-500 to-yellow-500'
  },
  {
    name: 'Real-time Communication',
    description: 'Instant messaging and notifications for better coordination.',
    icon: MessageSquare,
    gradient: 'from-red-500 to-rose-500'
  },
  {
    name: 'Advanced Security',
    description: 'Enterprise-grade security to protect sensitive educational data.',
    icon: Shield,
    gradient: 'from-indigo-500 to-violet-500'
  }
];

export function Features() {
  return (
    <section id="features" className="py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">Powerful Features</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to excel in education
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our comprehensive suite of tools empowers educational institutions to deliver exceptional learning experiences.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} 
                className="flex flex-col rounded-2xl border border-gray-100 p-8 transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
                <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-gray-900">
                  <div className={cn(
                    "rounded-lg p-2 bg-gradient-to-br",
                    feature.gradient
                  )}>
                    <feature.icon className="h-5 w-5 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}