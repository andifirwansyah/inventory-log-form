import * as Yup from 'yup';

export const validationSchema = Yup.object({
  location_id: Yup.string().required('Location ID is required'),
  // zone: Yup.string().required('Zone is required'),
  // level: Yup.string().required('Level is required').min(1, 'Level must be at least 1'),
  description: Yup.string().required('Description is required'),
  // barcode: Yup.string().required('Barcode is required'),
  // batch: Yup.string().required('Batch is required'),
  expired: Yup.string().required('Expired date is required'),
  qty: Yup.number().required('Quantity is required').min(1, 'Quantity must be at least 1'),
  uom_qty: Yup.number().required('UOM Quantity is required').min(1, 'UOM Quantity must be at least 1'),
  uom: Yup.string().required('UOM is required'),
  condition: Yup.string().required('Condition is required'),
});