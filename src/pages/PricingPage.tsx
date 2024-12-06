import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const tiers = [
  {
    name: 'Basic',
    price: 29,
    description: 'Perfect for small schools getting started',
    features: [
      'Up to 500 students',
      'Basic analytics',
      'Student management',
      'Parent portal',
      'Email support',
      'Basic reporting',
    ],
  },
  {
    name: 'Professional',
    price: 79,
    description: 'Ideal for growing institutions',
    features: [
      'Up to 2000 students',
      'Advanced analytics',
      'Custom branding',
      'Priority support',
      'API access',
      'Advanced reporting',
      'Resource scheduling',
      'Mobile app access',
    ],
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 149,
    description: 'For large educational institutions',
    features: [
      'Unlimited students',
      'AI-powered insights',
      'Custom integration',
      '24/7 phone support',
      'Advanced security',
      'Custom reporting',
      'Multi-campus support',
      'Dedicated account manager',
      'Staff training',
    ],
  },
];

export function PricingPage() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-base font-semibold leading-7 text-primary">Pricing</h1>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Choose the right plan for your institution
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Flexible pricing options designed to meet the needs of educational institutions of all sizes.
          </p>
        </div>

        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 xl:gap-x-12">
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              className={`relative flex flex-col justify-between rounded-3xl ring-1 ring-gray-200 p-8 xl:p-10 ${
                tier.featured ? 'bg-gray-50 ring-2 ring-primary' : 'bg-white'
              }`}
            >
              {tier.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="inline-flex items-center rounded-full bg-primary px-4 py-1 text-sm font-medium text-white">
                    Most Popular
                  </div>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between gap-x-4">
                  <h2 className="text-lg font-semibold leading-8 text-gray-900">{tier.name}</h2>
                </div>
                <p className="mt-4 text-sm leading-6 text-gray-600">{tier.description}</p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">${tier.price}</span>
                  <span className="text-sm font-semibold leading-6 text-gray-600">/month</span>
                </p>
                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <Check className="h-6 w-5 flex-none text-primary" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <Button
                className={`mt-8 ${
                  tier.featured
                    ? 'bg-primary hover:bg-primary/90'
                    : 'bg-white text-primary hover:bg-gray-50 ring-1 ring-inset ring-primary/20'
                }`}
              >
                Get started today
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}