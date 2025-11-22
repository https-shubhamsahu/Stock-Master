import type { Product, Operation } from './types';
import { placeholderImages } from './placeholder-images.json';

// Mock data is being phased out in favor of Firestore.
// This data will be removed once all pages are migrated.

export const products: Product[] = [
  { id: 'p1', name: 'Ergonomic Office Chair', sku: 'CHR-ERGO-01', category: 'Furniture', unitOfMeasure: 'pcs', stock: 120, reorderPoint: 20, imageUrl: placeholderImages[0].imageUrl },
  { id: 'p2', name: 'Standing Desk', sku: 'DSK-STND-01', category: 'Furniture', unitOfMeasure: 'pcs', stock: 75, reorderPoint: 15, imageUrl: placeholderImages[1].imageUrl },
  { id: 'p3', name: 'Wireless Keyboard', sku: 'KBD-WL-01', category: 'Electronics', unitOfMeasure: 'pcs', stock: 200, reorderPoint: 50, imageUrl: placeholderImages[2].imageUrl },
  { id: 'p4', name: '4K Monitor', sku: 'MON-4K-01', category: 'Electronics', unitOfMeasure: 'pcs', stock: 90, reorderPoint: 25, imageUrl: placeholderImages[3].imageUrl },
  { id: 'p5', name: 'Steel Rods', sku: 'MAT-STL-01', category: 'Materials', unitOfMeasure: 'kg', stock: 500, reorderPoint: 100, imageUrl: placeholderImages[4].imageUrl },
  { id: 'p6', name: 'Industrial Screws (Pack of 100)', sku: 'HWR-SCR-01', category: 'Hardware', unitOfMeasure: 'pcs', stock: 8, reorderPoint: 10, imageUrl: placeholderImages[5].imageUrl },
  { id: 'p7', name: 'Oak Wood Planks', sku: 'MAT-OAK-01', category: 'Materials', unitOfMeasure: 'm', stock: 150, reorderPoint: 30, imageUrl: placeholderImages[6].imageUrl },
  { id: 'p8', name: 'Protective Gloves', sku: 'PPE-GLV-01', category: 'Safety Gear', unitOfMeasure: 'pcs', stock: 3, reorderPoint: 5, imageUrl: placeholderImages[7].imageUrl },
];

export const operations: Operation[] = [
    { id: 'OP-001', type: 'Receipt', contact: 'Vendor A', scheduledDate: new Date('2024-07-20'), status: 'Done' },
    { id: 'OP-002', type: 'Delivery', contact: 'Customer X', scheduledDate: new Date('2024-07-22'), status: 'Done' },
    { id: 'OP-003', type: 'Transfer', from: 'Warehouse A', to: 'Warehouse B', scheduledDate: new Date('2024-07-23'), status: 'Waiting' },
    { id: 'OP-004', type: 'Receipt', contact: 'Vendor B', scheduledDate: new Date('2024-07-25'), status: 'Waiting' },
    { id: 'OP-005', type: 'Adjustment', scheduledDate: new Date('2024-07-19'), status: 'Done' },
    { id: 'OP-006', type: 'Delivery', contact: 'Customer Y', scheduledDate: new Date('2024-07-28'), status: 'Draft' },
    { id: 'OP-007', type: 'Receipt', contact: 'Vendor C', scheduledDate: new Date(), status: 'Waiting' },
    { id: 'OP-008', type: 'Transfer', from: 'Production', to: 'Shipping', scheduledDate: new Date(), status: 'Canceled' },
    { id: 'OP-009', type: 'Delivery', contact: 'Customer Z', scheduledDate: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000), status: 'Waiting'},
    { id: 'OP-010', type: 'Receipt', contact: 'Vendor A', scheduledDate: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000), status: 'Draft' },
];

export const kpis = {
    totalStock: products.reduce((sum, p) => sum + p.stock, 0),
    lowStock: products.filter(p => p.stock < p.reorderPoint).length,
    pendingReceipts: operations.filter(op => op.type === 'Receipt' && op.status === 'Waiting').length,
    pendingDeliveries: operations.filter(op => op.type === 'Delivery' && op.status === 'Waiting').length,
    internalTransfers: operations.filter(op => op.type === 'Transfer' && op.status === 'Waiting').length,
};

export const inventoryChartData = products.slice(0, 5).map(p => ({
    name: p.name,
    stock: p.stock
}));

export const getInventoryForAI = () => {
    // This function will need to be updated to use live data.
    const inventoryData = products.map(p => ({
        productName: p.name,
        sku: p.sku,
        currentStock: p.stock,
        reorderPoint: p.reorderPoint,
    }));
    return JSON.stringify(inventoryData);
}