const axios = require('axios');
const { filterList, tagList } = require('../config/config.json');
//Gets Image via API endpoint
async function getImage(tags) {
  try {
    if (!tags) {
      url = `https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&limit=1000&json=1&tags=${tagList.join(
        '+',
      )}+-${filterList.join('+-')}`;
    } else {
      url = `https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&limit=1000&json=1&tags=${tags.join(
        '+',
      )}`;
    }
    let { data } = await axios({
      url: url,
      method: 'GET',
    });
    if (data.length == 0) {
      return { err: true };
    }
    const image = data[await getRandomInt(0, data.length - 1)];
    const { file_url, preview_url } = image;
    console.log(`Image tags are: ${image.tags}`.blue);

    return { file_url, preview_url, title: tags, err: false };
  } catch (err) {
    console.error(err);
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum and the minimum are inclusive
}

module.exports = { getImage };
