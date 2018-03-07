import { Router } from 'express';
import * as DimensionController from '../controllers/dimension.controller';
const router = new Router();

// Get all Dimensions
router.route('/dimensions').get(DimensionController.getDimensions);

// Get one dimension by id
router.route('/dimensions/:id').get(DimensionController.getDimension);

export default router;
