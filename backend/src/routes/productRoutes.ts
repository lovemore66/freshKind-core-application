import express from 'express';
import multer from 'multer';
import {  getProducts } from '../controllers/productController';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (reeq, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

router.get('/', getProducts);
//router.get('/:id', getProductById);
//router.put('/:id', upload.single('image'), updateProduct);
//router.delete('/:id', deleteProduct);

export default router;
