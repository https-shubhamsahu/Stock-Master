export type Product = {
  id: string;
  name: string;
  sku: string;
  category: string;
  unitOfMeasure: 'pcs' | 'kg' | 'ltr' | 'm';
  stock: number;
  reorderPoint: number;
  imageUrl: string;
};

export type OperationStatus = 'Done' | 'Waiting' | 'Draft' | 'Canceled';

export type Operation = {
  id: string;
  type: 'Receipt' | 'Delivery' | 'Transfer' | 'Adjustment';
  contact?: string;
  scheduledDate: Date;
  status: OperationStatus;
  from?: string;
  to?: string;
};
