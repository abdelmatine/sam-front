'use server';
/**
 * @fileOverview An AI assistant that summarizes complex medical device specifications and usage instructions.
 *
 * - explainMedicalContent - A function that handles the medical content explanation process.
 * - MedicalContentExplainerInput - The input type for the explainMedicalContent function.
 * - MedicalContentExplainerOutput - The return type for the explainMedicalContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MedicalContentExplainerInputSchema = z.object({
  medicalContent: z
    .string()
    .describe(
      'The complex medical device specifications and usage instructions to summarize.'
    ),
});
export type MedicalContentExplainerInput = z.infer<
  typeof MedicalContentExplainerInputSchema
>;

const MedicalContentExplainerOutputSchema = z.object({
  summary: z
    .string()
    .describe('A concise, easy-to-understand summary of the medical content.'),
});
export type MedicalContentExplainerOutput = z.infer<
  typeof MedicalContentExplainerOutputSchema
>;

export async function explainMedicalContent(
  input: MedicalContentExplainerInput
): Promise<MedicalContentExplainerOutput> {
  return medicalContentExplainerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'medicalContentExplainerPrompt',
  input: {schema: MedicalContentExplainerInputSchema},
  output: {schema: MedicalContentExplainerOutputSchema},
  prompt: `You are an AI assistant specialized in medical content. Your task is to summarize the following complex medical device specifications and usage instructions into a concise, easy-to-understand summary for a customer. Focus on key product details, benefits, and essential usage information, avoiding overly technical jargon where possible. Ensure the summary is accurate and helpful for making an informed purchasing decision.

Medical Content:
{{{medicalContent}}}`,
});

const medicalContentExplainerFlow = ai.defineFlow(
  {
    name: 'medicalContentExplainerFlow',
    inputSchema: MedicalContentExplainerInputSchema,
    outputSchema: MedicalContentExplainerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
