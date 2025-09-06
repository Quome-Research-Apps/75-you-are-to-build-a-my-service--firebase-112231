"use client";

import { PlusCircle } from 'lucide-react';
import { useServiceRequests } from '@/hooks/use-service-requests';
import { RequestForm } from '@/components/request-form';
import { RequestList } from '@/components/request-list';
import { Button } from '@/components/ui/button';

export default function Home() {
  const { requests, addRequest, updateRequestStatus, removeRequest, isLoading } = useServiceRequests();

  return (
    <main className="container mx-auto px-4 py-8 md:py-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12 gap-4">
        <div>
          <h1 className="text-4xl font-bold font-headline text-primary">CivicLog</h1>
          <p className="text-muted-foreground mt-1">
            Your personal dashboard for tracking city service requests.
          </p>
        </div>
        <RequestForm onFormSubmit={addRequest}>
          <Button size="lg">
            <PlusCircle className="mr-2 h-5 w-5" />
            Log New Request
          </Button>
        </RequestForm>
      </header>

      <RequestList
        requests={requests}
        isLoading={isLoading}
        onStatusChange={updateRequestStatus}
        onDelete={removeRequest}
      />
    </main>
  );
}
