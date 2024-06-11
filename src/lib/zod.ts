import { z } from 'zod';

export const TaskSchema = z.object({
  title: z.string().min(1, { message: 'Title is required.' }),
  description: z.string(),
  status: z.boolean({ message: 'Status is required.' }),
});