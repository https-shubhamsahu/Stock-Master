import { generateLowStockAlerts } from "@/ai/flows/low-stock-alerts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { getInventoryForAI } from "@/lib/data";
import { AlertTriangle, Bell } from "lucide-react";

export async function LowStockAlert() {
  const inventoryJson = getInventoryForAI();
  const lowStockData = await generateLowStockAlerts({ inventoryData: inventoryJson });

  return (
    <Card className="lg:col-span-3">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          <CardTitle className="font-headline">AI-Powered Low Stock Alerts</CardTitle>
        </div>
        <CardDescription>
          Proactive alerts for items falling below their reorder points.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {lowStockData.alerts.length > 0 ? (
            lowStockData.alerts.map((alert) => (
              <Alert key={alert.sku} variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>{alert.productName}</AlertTitle>
                <AlertDescription>
                  Stock at {alert.currentStock}, which is below reorder point of {alert.reorderPoint}.
                </AlertDescription>
              </Alert>
            ))
          ) : (
            <div className="text-center text-muted-foreground py-8">
              <p>All stock levels are healthy.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
