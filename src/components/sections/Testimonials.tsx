import { Avatar } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';

const testimonials = [
  {
    content: "Smart Learner has revolutionized how we manage our institution. The AI-powered insights have been game-changing for student success.",
    author: {
      name: 'Dr. Sarah Chen',
      role: 'Principal, Future Academy',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    content: "The platform's intuitive design and powerful features have made administrative tasks a breeze. Our staff couldn't be happier!",
    author: {
      name: 'James Wilson',
      role: 'IT Director, Global School',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    content: "The community features have transformed how we engage with parents. Communication has never been more seamless.",
    author: {
      name: 'Maria Rodriguez',
      role: 'Head of Communications',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
];

export function Testimonials() {
  return (
    <div id="testimonials" className="bg-gray-50/50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-lg font-semibold leading-8 tracking-tight text-primary">
            Success Stories
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Trusted by leading institutions
          </p>
        </div>
        <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, testimonialIdx) => (
              <Card key={testimonialIdx} 
                className="flex flex-col justify-between p-8 transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
                <div>
                  <div className="relative h-7 w-7 text-primary mb-4">
                    <svg
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="absolute h-7 w-7 opacity-25"
                    >
                      <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                    </svg>
                  </div>
                  <p className="text-lg leading-7 text-gray-600">{testimonial.content}</p>
                </div>
                <div className="mt-6 flex items-center gap-x-4">
                  <Avatar>
                    <img
                      className="h-10 w-10 rounded-full bg-gray-50"
                      src={testimonial.author.image}
                      alt={testimonial.author.name}
                    />
                  </Avatar>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.author.name}</div>
                    <div className="text-sm leading-6 text-gray-600">{testimonial.author.role}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}