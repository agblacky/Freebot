//WARNING NSFW COMMAND
//This command gets a random image via rule34 api with pre-defined filters while encouraging "normal" considered tags, which will be continuously updated 
//This command is intended to aquire API knowledge and is not intended to be used in work environments
const { SlashCommandBuilder } = require('discord.js');
const { getImage } = require('../tools/getimg');

function builder(preview, url) {
  const exampleEmbed = {
    title: 'Random Rule34 Image',
    url: url,
    image: {
      url: preview,
    },
  };
  return { exampleEmbed };
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('hentai')
    .setDescription('Sends random rule34 image'),
  async execute(interaction) {
    try {
      if (interaction.channel.nsfw) {
        const { file_url, preview_url } = await getImage();
        const { exampleEmbed } = builder(preview_url, file_url);
        await interaction.reply({ embeds: [exampleEmbed] });
      } else {
        interaction.reply(
          'This command can only be used in channels marked nsfw.',
        );
        return;
      }
    } catch (err) {
      console.error(err);
    }
  },
};
