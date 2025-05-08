import { Message } from '@/lib/models';
import { format, isToday, isYesterday } from 'date-fns';

export const prepareMessagesWithDateSeparators = (messages: Message[]) => {
  const result: (Message | { type: 'separator'; label: string })[] = [];

  let lastDate: string | null = null;

  messages.forEach((message) => {
    const date = new Date(message!.createdAt!);
    const dateStr = format(date, 'yyyy-MM-dd');

    if (lastDate !== dateStr) {
      let label = '';

      if (isToday(date)) label = 'Aujourd\'hui';
      else if (isYesterday(date)) label = 'Hier';
      else label = format(date, 'MMMM d, yyyy');

      result.push({ type: 'separator', label });
      lastDate = dateStr;
    }

    result.push(message);
  });

  return result;
};
