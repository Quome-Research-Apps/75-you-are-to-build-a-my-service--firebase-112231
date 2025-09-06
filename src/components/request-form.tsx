"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Wand2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { NewServiceRequestSchema, SERVICE_CATEGORIES, type NewServiceRequest } from '@/lib/types';
import { intelligentStatusPrediction } from '@/ai/flows/intelligent-status-prediction';

interface RequestFormProps {
  onFormSubmit: (data: NewServiceRequest) => void;
  children: React.ReactNode;
}

const historicalCityData = "Pothole repairs are typically addressed within 5-7 business days. Graffiti removal is faster, usually within 48 hours. Streetlight issues can take up to 2 weeks if a part needs to be ordered. Noise complaints are logged and reviewed, but immediate status changes are rare.";

export function RequestForm({ onFormSubmit, children }: RequestFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<NewServiceRequest>({
    resolver: zodResolver(NewServiceRequestSchema),
    defaultValues: {
      description: '',
      category: undefined,
    },
  });

  const descriptionValue = form.watch('description');

  const handleIntelligentPrediction = async () => {
    if (!descriptionValue || descriptionValue.length < 10) {
      toast({
        variant: "destructive",
        title: "Description too short",
        description: "Please enter a description of at least 10 characters for an AI prediction.",
      });
      return;
    }
    setIsAiLoading(true);
    try {
      const result = await intelligentStatusPrediction({
        requestDescription: descriptionValue,
        historicalCityData: historicalCityData,
      });
      if (result.suggestedStatus) {
        toast({
          title: "Intelligent Prediction",
          description: `Based on the description, the status is likely to be '${result.suggestedStatus}'. New requests are always 'Open' initially.`,
        });
      } else {
         throw new Error('AI did not return a prediction.');
      }
    } catch (error) {
      console.error("AI prediction failed:", error);
      toast({
        variant: "destructive",
        title: "AI Prediction Failed",
        description: "Could not get an AI prediction at this time.",
      });
    } finally {
      setIsAiLoading(false);
    }
  };

  const onSubmit = (data: NewServiceRequest) => {
    onFormSubmit(data);
    form.reset();
    setIsOpen(false);
    toast({
      title: "Request Logged",
      description: "Your new service request has been saved locally.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Log a New Service Request</DialogTitle>
          <DialogDescription>
            Fill in the details of your service request. It will be saved on this device.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Large pothole on the corner of Main St and 1st Ave"
                      {...field}
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {SERVICE_CATEGORIES.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="pt-2">
              <Button type="button" variant="ghost" size="sm" onClick={handleIntelligentPrediction} disabled={isAiLoading}>
                {isAiLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4 text-accent" />}
                Get Intelligent Prediction
              </Button>
            </div>

            <DialogFooter className="pt-4">
              <DialogClose asChild>
                <Button type="button" variant="secondary">Cancel</Button>
              </DialogClose>
              <Button type="submit">Log Request</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
