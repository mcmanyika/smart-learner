import { EventType, EventColors } from '../types';

export const EVENT_TYPES: EventType[] = [
  { value: 'all', label: 'All Events' },
  { value: 'class', label: 'Classes' },
  { value: 'assessment', label: 'Assessments' },
  { value: 'assignment', label: 'Assignments' },
  { value: 'meeting', label: 'Meetings' },
];

export const EVENT_COLORS: EventColors = {
  assessment: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  class: 'bg-blue-100 text-blue-800 border-blue-200',
  assignment: 'bg-green-100 text-green-800 border-green-200',
  meeting: 'bg-purple-100 text-purple-800 border-purple-200',
};