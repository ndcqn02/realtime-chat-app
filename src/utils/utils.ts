import { format } from 'date-fns';

export function formatDateTime(dateTimeString:string) {
  const dateTime = new Date(dateTimeString);
  return format(dateTime, 'dd/MM HH:mm');
}

