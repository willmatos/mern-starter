import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const dimensionSchema = new Schema({
  name: { type: 'String', required: true },
  /*eslint-disable */
  latest_value: {
		type: 'Number',
		required: true,
		validate: {
			validator: Number.isInteger,
			message: '{VALUE} is not an integer value'
		},
	},
	/*eslint-enable */
  metric: { type: Schema.ObjectId, ref: 'Metric', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('Dimension', dimensionSchema);

