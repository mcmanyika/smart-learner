import { Card } from '@/components/ui/card';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { EVENT_COLORS } from '../config/constants';
import type { CalendarEvent } from '../types';

interface EventListProps {
  date?: Date;
  events: CalendarEvent[];
}

export function EventList({ date, events }: EventListProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <CalendarIcon className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold">
          Events for {date?.toLocaleDateString()}
        </h2>
      </div>

      {events.length === 0 ? (
        <Card className="p-6">
          <p className="text-center text-muted-foreground">
            No events scheduled for this day
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {events.map((event) => (
            <Card key={event.id} className="p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{event.title}</h3>
                  <span
                    className={cn(
                      'px-2 py-1 rounded-full text-xs font-medium border',
                      EVENT_COLORS[event.type]
                    )}
                  >
                    {event.type}
                  </span>
                </div>
                {event.course && (
                  <p className="text-sm text-muted-foreground">{event.course}</p>
                )}
                <p className="text-sm">{event.description}</p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}