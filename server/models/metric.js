import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const metricSchema = new Schema({
  source_id: { type: 'String', required: true },
  name: { type: 'String', required: true },
  /*eslint-disable */
  status: { // 0=OK, 1=ERROR, 2=WORKING
		type: 'Number',
		min: 0,
		max: 2,
		required: true,
		default: 0,
		validate: {
			validator: Number.isInteger,
			message: '{VALUE} is not an integer value',
		},
	},
	/*eslint-enable */
  dimensions: [{ type: Schema.Types.ObjectId, ref: 'Dimension' }],
  dependent_metrics_ids: [{ type: Schema.Types.ObjectId, ref: 'Metric' }],
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('Metric', metricSchema);

