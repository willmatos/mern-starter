import mongoose from 'mongoose';

import Dimension from '../models/dimension';

/**
 * Get all dimensions
 * @param req
 * @param res
 * @returns void
 */
export function getDimensions(req, res) {
  Dimension.find().sort('-dateAdded').exec((err, dimensions) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ dimensions });
  });
}

/**
 * Get dimensions by Ids
 * @param req
 * @param res
 * @returns void
 */
export function getDimensionsByMetricId(req, res) {
  Dimension.find({
    /*eslint-disable */
    metric: mongoose.Types.ObjectId(req.params.id),
    /*eslint-enable */
  }).sort('-dateAdded').exec((err, dimensions) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ dimensions });
  });
}

/**
 * Get a single dimension
 * @param req
 * @param res
 * @returns void
 */
export function getDimension(req, res) {
  Dimension.findOne({ _id: req.params.id }).exec((err, dimension) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ dimension });
  });
}
