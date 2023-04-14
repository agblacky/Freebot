const { parseString } = require('xml2js');
const axios = require('axios');

//Gets Image URL
async function getImage() {
  let { data } = await axios({
    url: 'https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&limit=100&json=1',
    method: 'GET',
  });
  const { file_url, preview_url } =
    data[await getRandomInt(0, data.length - 1)];
  return { file_url, preview_url };
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

module.exports = { getImage };
