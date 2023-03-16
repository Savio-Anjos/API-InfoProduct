import { Router } from 'express';
import multer from 'multer';

import uploadConfig  from './config/multer';

import { CreateProductController } from './controllers/CreateProductController';



const router = Router();

const upload = multer(uploadConfig.upload("./tmp"))



router.post('/products', upload.single('file'), new CreateProductController().handle)

export { router }


