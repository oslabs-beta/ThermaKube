const aws4 = require('aws4');
const axios = require('axios');

let opts = {
  host: 'eks.us-east-1.amazonaws.com',
  path: '/clusters',
};

let access = {
  secretAccessKey: '4tMcXNH2S6kFxn7CHOPgEEuHUrUgvB1Iwtuj9wvP',
  accessKeyId: 'AKIARMJWSBR6H3HAIKW2',
};
const query = aws4.sign(opts, access);
console.log('opt', query);
const fetchCluster = async () => {
  try {
    const res = await axios(
      'https://eks.us-east-1.amazonaws.com/clusters',
      query
    );
    console.log('res', res.data);
    return res;
  } catch (err) {
    console.log('error');
  }
};
