'use server';

/**
 * @fileOverview Generates low stock alerts for inventory items.
 *
 * - generateLowStockAlerts - A function that generates alerts for items falling below reorder points.
 * - LowStockAlertsInput - The input type for the generateLowStockAlerts function.
 * - LowStockAlertsOutput - The return type for the generateLowStockAlerts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LowStockAlertsInputSchema = z.object({
  inventoryData: z.string().describe('A JSON string containing the current inventory data, including product names, SKUs, current stock levels, and reorder points.'),
});
export type LowStockAlertsInput = z.infer<typeof LowStockAlertsInputSchema>;

const LowStockAlertsOutputSchema = z.object({
  alerts: z.array(
    z.object({
      productName: z.string().describe('The name of the product.'),
      sku: z.string().describe('The SKU of the product.'),
      currentStock: z.number().describe('The current stock level of the product.'),
      reorderPoint: z.number().describe('The reorder point of the product.'),
      alertMessage: z.string().describe('A message indicating that the product is below its reorder point.'),
    })
  ).describe('A list of alerts for products that are below their reorder points.'),
});
export type LowStockAlertsOutput = z.infer<typeof LowStockAlertsOutputSchema>;

export async function generateLowStockAlerts(input: LowStockAlertsInput): Promise<LowStockAlertsOutput> {
  return lowStockAlertsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'lowStockAlertsPrompt',
  input: {schema: LowStockAlertsInputSchema},
  output: {schema: LowStockAlertsOutputSchema},
  prompt: `You are an inventory management assistant. You are provided with inventory data, and your task is to identify products that are below their reorder points and generate alerts for them.

Inventory Data: {{{inventoryData}}}

Based on the inventory data, identify the products for which the current stock is below the reorder point. For each such product, generate an alert message.

Return the alerts in the following JSON format:

Output Format:
```json
{{alerts: [{productName: string, sku: string, currentStock: number, reorderPoint: number, alertMessage: string}]}}
```
`, 
});

const lowStockAlertsFlow = ai.defineFlow(
  {
    name: 'lowStockAlertsFlow',
    inputSchema: LowStockAlertsInputSchema,
    outputSchema: LowStockAlertsOutputSchema,
  },
  async input => {
    try {
      // Parse the inventory data to ensure it's valid JSON
      JSON.parse(input.inventoryData);
    } catch (e) {
      throw new Error('Invalid JSON format for inventory data.');
    }

    const {output} = await prompt(input);
    return output!;
  }
);
