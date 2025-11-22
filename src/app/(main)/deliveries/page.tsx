import { MoreHorizontal, PlusCircle, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { operations } from "@/lib/data";
import type { OperationStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

const statusVariant: Record<OperationStatus, "default" | "secondary" | "outline" | "destructive"> = {
    Done: 'default',
    Waiting: 'secondary',
    Draft: 'outline',
    Canceled: 'destructive'
}

const deliveryOperations = operations.filter(op => op.type === 'Delivery');

export default function DeliveriesPage() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Truck className="h-6 w-6" />
              <CardTitle className="font-headline">Delivery Orders (Outgoing Goods)</CardTitle>
            </div>
            <CardDescription>Manage stock leaving the warehouse for customer shipments.</CardDescription>
          </div>
          <Button size="sm" className="gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">New Delivery</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Scheduled Date</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deliveryOperations.map((op) => (
              <TableRow key={op.id}>
                <TableCell className="font-medium">{op.id}</TableCell>
                <TableCell>{op.contact}</TableCell>
                <TableCell>
                  <Badge variant={statusVariant[op.status]}>{op.status}</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {op.scheduledDate.toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Pick Items</DropdownMenuItem>
                      <DropdownMenuItem>Pack Items</DropdownMenuItem>
                      <DropdownMenuItem>Validate</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
