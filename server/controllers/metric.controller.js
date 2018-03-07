import Metric from '../models/metric';

/**
 * Get all metrics
 * @param req
 * @param res
 * @returns void
 */
export function getMetrics(req, res) {
  Metric.find().sort('-dateAdded').exec((err, metrics) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ metrics });
  });
}

/**
 * Get a single metric
 * @param req
 * @param res
 * @returns void
 */
export function getMetric(req, res) {
  Metric.findOne({ _id: req.params.id }).exec((err, metric) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ metric });
  });
}
