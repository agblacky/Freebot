//WARNING NSFW COMMAND
//This command gets a random image via rule34 api with pre-defined filters while encouraging "normal" considered tags, which will be continuously updated
//This command is intended to aquire API knowledge and is not intended to be used in work environments
const { SlashCommandBuilder } = require('discord.js');
const { getImage } = require('../tools/getimg');

function builder(preview, url, title) {
  const embedImage = {
    title: title,
    url: url,
    image: {
      url: preview,
    },
  };
  return { embedImage };
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('hentai')
    .setDescription('Sends random rule34 image')
    .addStringOption(option =>
      option
        .setName('tags')
        .setDescription('Add tags seperated by spaces')
        .setRequired(false),
    ),
  async execute(interaction) {
    try {
      if (interaction.channel.nsfw) {
        let tags = interaction.options.getString('tags');
        if (tags) {
          tags = tags.split(' ');
        }
        const response = await getImage(tags);
        if (response.err) {
          interaction.reply(`Error: No images found for tags: ${tags}`);
        } else {
          const { embedImage } = builder(
            response.preview_url,
            response.file_url,
            response.title ? response.title.join(' ') : 'Random Rule34 Image',
          );
          await interaction.reply({ embeds: [embedImage] });
        }
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
