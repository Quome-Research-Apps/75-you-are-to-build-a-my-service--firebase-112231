'use server';
/**
 * @fileOverview Suggests a likely status for a service request based on the description and historical city data.
 *
 * - intelligentStatusPrediction - A function that suggests a status for a service request.
 * - IntelligentStatusPredictionInput - The input type for the intelligentStatusPrediction function.
 * - IntelligentStatusPredictionOutput - The return type for the intelligentStatusPrediction function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IntelligentStatusPredictionInputSchema = z.object({
  requestDescription: z
    .string()
    .describe('The description of the service request.'),
  historicalCityData: z
    .string()
    .describe('Historical data from the city about service requests.'),
});
export type IntelligentStatusPredictionInput = z.infer<
  typeof IntelligentStatusPredictionInputSchema
>;

const IntelligentStatusPredictionOutputSchema = z.object({
  suggestedStatus: z
    .enum(['Open', 'In Progress', 'Closed', 'Rejected'])
    .describe('The suggested status for the service request.'),
});
export type IntelligentStatusPredictionOutput = z.infer<
  typeof IntelligentStatusPredictionOutputSchema
>;

export async function intelligentStatusPrediction(
  input: IntelligentStatusPredictionInput
): Promise<IntelligentStatusPredictionOutput> {
  return intelligentStatusPredictionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'intelligentStatusPredictionPrompt',
  input: {schema: IntelligentStatusPredictionInputSchema},
  output: {schema: IntelligentStatusPredictionOutputSchema},
  prompt: `You are an AI assistant helping residents understand the likely status of their service request.

  Based on the following service request description and historical city data, suggest a likely status for the service request. The status must be one of the following options: Open, In Progress, Closed, Rejected.

  Service Request Description: {{{requestDescription}}}

  Historical City Data: {{{historicalCityData}}}

  Consider the historical city data when predicting the status. For example, if the historical data shows that most pothole repairs are completed within 3 days, and the service request is for a pothole repair that was submitted 2 days ago, then the status is likely to be In Progress.
  The suggested status:
  `,
});

const intelligentStatusPredictionFlow = ai.defineFlow(
  {
    name: 'intelligentStatusPredictionFlow',
    inputSchema: IntelligentStatusPredictionInputSchema,
    outputSchema: IntelligentStatusPredictionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
