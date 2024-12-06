import { useState } from 'react';
import { events } from '../data/events';
import type { CalendarEvent } from '../types';

export function useCalendarEvents() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedType, setSelectedType] = useState('all');

  const filteredEvents = events.filter(
    (event) => selectedType === 'all' || event.type === selectedType
  );

  const selectedDateEvents = filteredEvents.filter(
    (event) => event.date === date?.toISOString().split('T')[0]
  );

  const hasEventsOnDate = (date: Date) => {
    return filteredEvents.some(
      (event) => event.date === date.toISOString().split('T')[0]
    );
  };

  return {
    date,
    setDate,
    selectedType,
    setSelectedType,
    filteredEvents,
    selectedDateEvents,
    hasEventsOnDate,
  };
}