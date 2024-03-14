const { Events } = require('discord.js');
const config = require('../config.json');

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        const client = message.client
        const user = message.author
        const member = message.member
        const guild = message.guild

        if(message.guild.id === config.ids.guild) {
            if(config.toggles.inviteDetection === "true") {
                // Make sure to go through, clean this up sometime in the future and comment TF outta it
                if(message.member.roles.cache.some(role => role.id === config.ids.exemptionRole)) {

                } else {
                    if(message.content.toLowerCase().includes("https://discord.gg/")) {
                        if(member.kickable) {
                            message.member.timeout(48*60*60*1000, 'Discord Invite Detected!');
                            const embed = new EmbedBuilder()
                                .setDescription("A user named <@"+user.id+"> has sent a Discord invite link, they've been muted and their message deleted.")
                                .addFields({ name: 'Content', value: message.cleanContent, inline: false })
                                .setColor(config.embedColours.negative)
                                .setFooter({ text: 'User ID '+ user.id })
                                .setTimestamp();
                            client.channels.cache.get(config.ids.logging).send({ embeds: [embed] })
                            message.delete();
                        } else {
                            const embed = new EmbedBuilder()
                                .setDescription("A user named <@"+user.id+"> has sent a Discord invite link, however I cannot mute them or delete their message")
                                .addFields({ name: 'Content', value: message.cleanContent, inline: false })
                                .setColor(config.embedColours.negative)
                                .setFooter({ text: 'User ID '+ user.id })
                                .setTimestamp();
                            client.channels.cache.get(config.ids.logging).send({ embeds: [embed] })
                        }
                    }
                }
            }
        }
    }
}
