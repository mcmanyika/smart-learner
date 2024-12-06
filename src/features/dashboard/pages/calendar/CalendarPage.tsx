import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Plus } from 'lucide-react';
import { EventTypeFilter } from './components/EventTypeFilter';
import { EventList } from './components/EventList';
import { useCalendarEvents } from './hooks/useCalendarEvents';

export function CalendarPage() {
  const {
    date,
    setDate,
    selectedType,
    setSelectedType,
    selectedDateEvents,
    hasEventsOnDate,
  } = useCalendarEvents();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Academic Calendar</h1>
          <p className="text-muted-foreground">
            Manage your schedule and upcoming events
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <EventTypeFilter value={selectedType} onChange={setSelectedType} />
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Event
          </Button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr,300px]">
        <Card className="p-6">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
            components={{
              DayContent: ({ date: dayDate }) => {
                const hasEvents = hasEventsOnDate(dayDate);
                return (
                  <div className="relative">
                    <div>{dayDate.getDate()}</div>
                    {hasEvents && (
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                    )}
                  </div>
                );
              },
            }}
          />
        </Card>

        <EventList date={date} events={selectedDateEvents} />
      </div>
    </div>
  );
}