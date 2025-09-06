import type { ServiceCategory, ServiceStatus } from '@/lib/types';
import {
  Wrench,
  Lightbulb,
  Paintbrush,
  Trash2,
  VolumeX,
  HelpCircle,
  CircleDot,
  CircleDashed,
  CircleCheck,
  CircleX,
  type LucideIcon,
} from 'lucide-react';

export const categoryIcons: Record<ServiceCategory, LucideIcon> = {
  'Pothole Repair': Wrench,
  'Streetlight Maintenance': Lightbulb,
  'Graffiti Removal': Paintbrush,
  'Trash Collection': Trash2,
  'Noise Complaint': VolumeX,
  'Other': HelpCircle,
};

export const statusIcons: Record<ServiceStatus, LucideIcon> = {
  'Open': CircleDot,
  'In Progress': CircleDashed,
  'Closed': CircleCheck,
  'Rejected': CircleX,
};
