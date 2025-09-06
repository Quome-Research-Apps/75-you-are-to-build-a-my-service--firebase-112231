import { z } from 'zod';

export const SERVICE_CATEGORIES = [
  'Pothole Repair',
  'Streetlight Maintenance',
  'Graffiti Removal',
  'Trash Collection',
  'Noise Complaint',
  'Other',
] as const;

export const SERVICE_STATUSES = ['Open', 'In Progress', 'Closed', 'Rejected'] as const;

export const ServiceRequestSchema = z.object({
  id: z.string().uuid(),
  description: z.string().min(10, { message: 'Description must be at least 10 characters long.' }),
  category: z.enum(SERVICE_CATEGORIES),
  submissionDate: z.string().datetime(),
  status: z.enum(SERVICE_STATUSES),
});

export const NewServiceRequestSchema = ServiceRequestSchema.pick({ description: true, category: true });

export type ServiceRequest = z.infer<typeof ServiceRequestSchema>;
export type NewServiceRequest = z.infer<typeof NewServiceRequestSchema>;
export type ServiceCategory = (typeof SERVICE_CATEGORIES)[number];
export type ServiceStatus = (typeof SERVICE_STATUSES)[number];
