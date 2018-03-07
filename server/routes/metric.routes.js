import { Router } from 'express';
import * as MetricController from '../controllers/metric.controller';
const router = new Router();

// Get all Metrics
router.route('/metrics').get(MetricController.getMetrics);

// Get one metric by id
router.route('/metrics/:id').get(MetricController.getMetric);

export default router;
