const {
  SlashCommandBuilder,
  AttachmentBuilder,
  PermissionsBitField,
} = require('discord.js');
const { cleanup } = require('../tools/svg-png');

function builder(timeStamp) {
  console.log(`Generating new attachment builder...`.blue);
  const bracket = new AttachmentBuilder(`./img/bracket-${timeStamp}.png`);

  const bracketEmbed = {
    title: 'Live Tournament Bracket',
    url: 'https://challonge.com/SmashFate2_1',
    image: {
      url: `attachment://bracket-${timeStamp}.png`,
    },
  };
  return { bracket, bracketEmbed };
}

//Refreshing the bracket
async function editMessageWithDelay(message, delayInMinutes) {
  try {
    console.log(new Date().toTimeString());
    const timeStamp = await cleanup();
    const { bracketEmbed, bracket } = builder(timeStamp);
    // Edit the message with the new content and bracket attachment
    await message.edit({ embeds: [bracketEmbed], files: [bracket] });
    // Pause the function for the specified delay period
    await delay(delayInMinutes);
  } catch (err) {
    console.error(err);
  }
}

async function delay(delayInMinutes) {
  return new Promise(resolve =>
    setTimeout(resolve, delayInMinutes * 60 * 1000),
  );
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

        // const timeStamp = await cleanup();
        // const { bracketEmbed, bracket } = builder(timeStamp);
        // await message.edit({
        //   embeds: [bracketEmbed],
        //   files: [bracket],
        // });

        //Converting the duration into repetitions without going below 0
        const repetitions = Math.max(Math.floor(duration / 5) /*- 1*/, 0);
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
