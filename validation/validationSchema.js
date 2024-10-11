import * as Yup from 'yup';

export const validationSchema = Yup.object({
  zone: Yup.string().required('Zone is required'),
  level: Yup.string().required('Level is required').min(1, 'Level must be at least 1'),
  description: Yup.string().required('Description is required'),
  expired: Yup.date().nullable().required('Expired date is required'),
  barcode: Yup.string().required('Barcode is required'),
  qty: Yup.number().required('Quantity is required').min(1, 'Quantity must be at least 1'),
  uom: Yup.string().required('Unit of Measure is required'),
});