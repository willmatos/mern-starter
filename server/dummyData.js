import cuid from 'cuid';

import countryCodesIso2 from './countryCodesData';

import Post from './models/post';
import Metric from './models/metric';
import Dimension from './models/dimension';

export default function () {
  Metric.count().exec((err, count) => {
    if (count > 0) {
      return;
    }

    // lets make x records
    const numberOfMetricRecordsToMake = 100;
    const metricsToCreate = [];

    for (let i = 0; i < numberOfMetricRecordsToMake; i++) {
      const newMetric = new Metric();

      newMetric.source_id = cuid();

      newMetric.name = `Metric Name ${i}`;
      newMetric.status = Math.floor(Math.random() * Math.floor(3));

      metricsToCreate.push(newMetric);
    }

    Metric.collection.insert(metricsToCreate, (metricsInsertError, metrics) => {
      if (metricsInsertError) {
        // TODO: handle error
      } else {
        // let's add dimensions to these metrics
        metrics.ops.forEach((metric) => {
          // let's add some dimensions for this metric
          const numberOfDimensionRecordsToMake = Math.floor(Math.random() * Math.floor(25));
          const dimensionsToCreate = [];

          for (let j = 0; j < numberOfDimensionRecordsToMake; j++) {
            const newDimension = new Dimension();

            newDimension.name = countryCodesIso2[Math.floor(Math.random() * Math.floor(countryCodesIso2.length))];
            newDimension.latest_value = Math.floor(Math.random() * Math.floor(100));
            newDimension.metric = metric;

            dimensionsToCreate.push(newDimension);
          }

          Dimension.collection.insert(dimensionsToCreate, (dimensionsInsertError, dimensions) => {
            if (dimensionsInsertError) {
              // TODO: handle error
            } else {
              // let's add dimensions to metric's dimensions collection
              const dimensionObjectIds = [];

              dimensions.ops.forEach((dimension) => {
                dimensionObjectIds.push(dimension._id);
              });

              Metric.findOne({ _id: metric._id }, (metricFindOneError, doc) => {
                const metricToSave = doc;
                metricToSave.dimensions = dimensionObjectIds;
                metricToSave.save();
              });
            }
          });
        });
      }
    });


    // let's add the dependent_metric_ids to the metrics
    Metric.find({}, (metricFindAllError, metrics) => {
      if (metricFindAllError) {
        // TODO: handle error
      } else {
        metrics.forEach((metricToUpdate) => {
          const numberOfMetricRecordsToRelate = Math.floor(Math.random() * Math.floor(25));
          const metricsToRelateObjectIds = [];

          Metric.find({}, (relatedMetricsFindError, relatedMetrics) => {
            relatedMetrics.forEach((relatedMetric) => {
              if (relatedMetric._id !== metricToUpdate._id) {
                metricsToRelateObjectIds.push(relatedMetric._id);
              }
            });
          }).limit(numberOfMetricRecordsToRelate);

          Metric.findOne({ _id: metricToUpdate._id }, (metricFindOneError, doc) => {
            const metricToSave = doc;
            metricToSave.dependent_metrics_ids = metricsToRelateObjectIds;
            metricToSave.save();
          });
        });
      }
    });
  });

  // Boilerplate Code
  Post.count().exec((err, count) => {
    if (count > 0) {
      return;
    }

    const content1 = `Sed ut perspiciatis unde omnis iste natus error
      sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
      eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae
      vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
      aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
      qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
      ipsum quia dolor sit amet. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
      enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
      ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
      in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
      occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum`;

    const content2 = `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
      enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
      ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
      in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
      occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum. Sed ut perspiciatis unde omnis iste natus error
      sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
      eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae
      vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
      aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
      qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
      ipsum quia dolor sit amet.`;

    const post1 = new Post({ name: 'Admin', title: 'Hello MERN', slug: 'hello-mern', cuid: 'cikqgkv4q01ck7453ualdn3hd', content: content1 });
    const post2 = new Post({ name: 'Admin', title: 'Lorem Ipsum', slug: 'lorem-ipsum', cuid: 'cikqgkv4q01ck7453ualdn3hf', content: content2 });

    Post.create([post1, post2], (error) => {
      if (!error) {
        // console.log('ready to go....');
      }
    });
  });
}
