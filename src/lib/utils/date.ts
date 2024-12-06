import { format, formatDistance } from 'date-fns';

export const formatDate = (date: string | Date) => {
  return format(new Date(date), 'PPP');
};

export const formatTime = (date: string | Date) => {
  return format(new Date(date), 'p');
};

export const formatRelative = (date: string | Date) => {
  return formatDistance(new Date(date), new Date(), { addSuffix: true });
};