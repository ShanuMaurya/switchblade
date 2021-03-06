const { Command, SwitchbladeEmbed, CanvasTemplates } = require('../../')
const { Attachment } = require('discord.js')
const snekfetch = require('snekfetch')

module.exports = class UIGradient extends Command {
  constructor (client) {
    super(client)
    this.name = 'uigradient'
    this.aliases = ['rg', 'randomgradient']
    this.category = 'general'
  }

  async run ({ t, author, channel }) {
    const embed = new SwitchbladeEmbed(author)
    channel.startTyping()

    const { body } = await snekfetch.get('https://cdn.jsdelivr.net/gh/ghosh/uiGradients/gradients.json')
    const { name, colors } = body[Math.floor(Math.random() * body.length)]

    const gradient = CanvasTemplates.gradient(colors, 300, 100)

    embed.setTitle(name)
      .setURL(`https://uigradients.com/#${name.replace(' ', '')}`)
      .setColor(colors[0])
      .setImage('attachment://gradient.png')
      .setDescription(`\`${colors.join(`\`, \``)}\``)
      .attachFile(new Attachment(gradient, 'gradient.png'))
    channel.send(embed).then(() => channel.stopTyping())
  }
}
