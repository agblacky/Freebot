const {
  SlashCommandBuilder,
  AttachmentBuilder,
  PermissionsBitField,
} = require('discord.js');
const { downloader, delOldFile } = require('../tools/svg-png');

function builder() {
  console.log(`Generating new attachment builder...`.blue);
  const file = new AttachmentBuilder('./bracket.png');

  const exampleEmbed = {
    title: 'Live Tournament Bracket',
    url: 'https://challonge.com/SmashFate2_1',
    image: {
      url: 'attachment://bracket.png',
    },
  };
  return { file, exampleEmbed };
}

//Refreshing the bracket
async function editMessageWithDelay(message, delayInMinutes) {
  try {
    // Pause the function for the specified delay period
    await delay(delayInMinutes);

    await cleanup();
    const { exampleEmbed, file } = builder();
    // Edit the message with the new content and file attachment
    await message.edit({ embeds: [exampleEmbed], files: [file] });
  } catch (err) {
    console.error(err);
  }
}

async function delay(delayInMinutes) {
  return new Promise(resolve =>
    setTimeout(resolve, delayInMinutes * 60 * 1000),
  );
}

//Cleaning up old and getting new bracket
async function cleanup() {
  try {
    delOldFile('input.svg');
    delOldFile('bracket.png');
    await downloader('https://challonge.com/SmashFate2_1.svg', 'input.svg');
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('bracket')
    .setDescription('Sends the tournament bracket')
    .addIntegerOption(option =>
      option
        .setName('duration')
        .setDescription('How long the bracket refreshes in minutes.')
        .setMinValue(0)
        .setMaxValue(120)
        .setRequired(true),
    ),
  async execute(interaction) {
    try {
      //Check for permissions
      if (
        interaction.member.permissions.has(
          PermissionsBitField.Flags.ManageChannels,
        )
      ) {
        const message = await interaction.deferReply();
        //Get the number of repetitions
        const duration = interaction.options.getInteger('duration');

        await cleanup();
        const { exampleEmbed, file } = builder();
        await message.edit({
          embeds: [exampleEmbed],
          files: [file],
        });

        //Converting the duration into repetitions without going below 0
        const repetitions = Math.max(Math.floor(duration / 5) - 1, 0);
        //Loop through the repetitions
        for (let rep = 0; rep < repetitions; rep++) {
          await editMessageWithDelay(message, 5);
        }
      } else {
        interaction.reply('Insufficient permissions');
      }
    } catch (err) {
      console.error(err);
    }
  },
};
