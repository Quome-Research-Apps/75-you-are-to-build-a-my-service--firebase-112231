"use client";

import { useState, useEffect, useCallback } from 'react';
import { type ServiceRequest, type ServiceStatus, type NewServiceRequest, ServiceRequestSchema } from '@/lib/types';
import { z } from 'zod';
import { useToast } from './use-toast';

const STORAGE_KEY = 'civiclog_servicerequests';

export function useServiceRequests() {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    setIsLoading(true);
    try {
      const storedData = localStorage.getItem(STORAGE_KEY);
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        const validatedData = z.array(ServiceRequestSchema).safeParse(parsedData);
        if (validatedData.success) {
          setRequests(validatedData.data.sort((a, b) => new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime()));
        } else {
          console.warn('Invalid data in localStorage, clearing.', validatedData.error);
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    } catch (error) {
      console.error('Failed to parse service requests from localStorage', error);
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveRequests = useCallback((updatedRequests: ServiceRequest[]) => {
    setRequests(updatedRequests);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRequests));
    } catch (error) {
      console.error('Failed to save service requests to localStorage', error);
      toast({
        variant: 'destructive',
        title: 'Error Saving Data',
        description: 'Your changes could not be saved to local storage.'
      })
    }
  }, [toast]);

  const addRequest = useCallback((newRequestData: NewServiceRequest) => {
    const newRequest: ServiceRequest = {
      ...newRequestData,
      id: crypto.randomUUID(),
      submissionDate: new Date().toISOString(),
      status: 'Open',
    };
    const updatedRequests = [newRequest, ...requests];
    saveRequests(updatedRequests);
  }, [requests, saveRequests]);

  const updateRequestStatus = useCallback((id: string, status: ServiceStatus) => {
    const updatedRequests = requests.map(req =>
      req.id === id ? { ...req, status } : req
    );
    saveRequests(updatedRequests);
  }, [requests, saveRequests]);

  const removeRequest = useCallback((id: string) => {
    const updatedRequests = requests.filter(req => req.id !== id);
    saveRequests(updatedRequests);
    toast({
      title: 'Request Deleted',
      description: 'The service request has been removed.',
    })
  }, [requests, saveRequests, toast]);

  return { requests, addRequest, updateRequestStatus, removeRequest, isLoading };
}
