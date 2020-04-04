// const aws4 = require('aws4');
// const axios = require('axios');

// let opts = {
//   host: 'eks.us-east-1.amazonaws.com',
//   path: '/clusters',
// };
// /* input credentials
//  */

// let access = {
//   // secretAccessKey:
//   // accessKeyId:
// };
// const query = aws4.sign(opts, access);
// console.log('opt', query);
// const fetchCluster = async () => {
//   try {
//     const res = await axios(
//       'https://eks.us-east-1.amazonaws.com/clusters',
//       query
//     );
//     console.log('res', res.data);
//     return res;
//   } catch (err) {
//     console.log('error');
//   }
// };
