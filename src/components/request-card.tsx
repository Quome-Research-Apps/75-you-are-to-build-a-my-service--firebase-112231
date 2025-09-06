import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { CalendarIcon, MoreVertical, TrashIcon } from 'lucide-react';
import { type ServiceRequest, type ServiceStatus, SERVICE_STATUSES } from '@/lib/types';
import { categoryIcons, statusIcons } from '@/components/icons';
import { format, parseISO } from 'date-fns';

interface RequestCardProps {
  request: ServiceRequest;
  onStatusChange: (id: string, status: ServiceStatus) => void;
  onDelete: (id: string) => void;
}

export function RequestCard({ request, onStatusChange, onDelete }: RequestCardProps) {
  const CategoryIcon = categoryIcons[request.category];
  const StatusIcon = statusIcons[request.status];

  return (
    <Card className="w-full overflow-hidden transition-all hover:shadow-lg flex flex-col bg-card">
      <CardHeader>
        <div className="flex justify-between items-start gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-3 rounded-lg">
              <CategoryIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg font-headline">{request.category}</CardTitle>
              <CardDescription className="flex items-center text-xs">
                <CalendarIcon className="mr-1.5 h-3 w-3" />
                {format(parseISO(request.submissionDate), 'MMM d, yyyy')}
              </CardDescription>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onDelete(request.id)} className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                <TrashIcon className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-foreground/80">{request.description}</p>
      </CardContent>
      <CardFooter>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-sm">
              <StatusIcon className="mr-2 h-4 w-4" />
              Status: <span className="font-semibold ml-1">{request.status}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[--radix-dropdown-menu-trigger-width]">
            {SERVICE_STATUSES.map(status => (
              <DropdownMenuItem key={status} onSelect={() => onStatusChange(request.id, status)}>
                <statusIcons[status] className="mr-2 h-4 w-4"/>
                {status}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
}
