"use client";

import { RequestCard } from '@/components/request-card';
import { Skeleton } from '@/components/ui/skeleton';
import { type ServiceRequest, type ServiceStatus } from '@/lib/types';
import Image from 'next/image';

interface RequestListProps {
  requests: ServiceRequest[];
  isLoading: boolean;
  onStatusChange: (id: string, status: ServiceStatus) => void;
  onDelete: (id: string) => void;
}

export function RequestList({ requests, isLoading, onStatusChange, onDelete }: RequestListProps) {
  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex flex-col space-y-3">
             <Skeleton className="h-[220px] w-full rounded-xl" />
          </div>
        ))}
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="text-center py-16 px-4 border-2 border-dashed rounded-lg mt-8 bg-card">
        <Image 
          src="https://picsum.photos/300/200" 
          data-ai-hint="empty state illustration" 
          alt="Illustration of a person looking at a map." 
          width={250} 
          height={167}
          className="mx-auto mb-6 rounded-lg opacity-80" 
        />
        <h3 className="text-xl font-semibold font-headline text-primary">No Requests Yet</h3>
        <p className="text-muted-foreground mt-2">Click "Log New Request" to add your first service request.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {requests.map(request => (
        <RequestCard key={request.id} request={request} onStatusChange={onStatusChange} onDelete={onDelete} />
      ))}
    </div>
  );
}
