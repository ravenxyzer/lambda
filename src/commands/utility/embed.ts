import { ApplyOptions } from "@sapphire/decorators";
import { MessageEmbed } from "discord.js"
import { Command, CommandOptions, Args } from "@sapphire/framework";
import { IContent } from "../../structures/database/content"
import { Aboutme } from "../../structures/client/message/IPersonal"
import { IMessageEmbed } from "../../structures/client/message/IMessageEmbed";
import { Message } from "discord.js";

@ApplyOptions<CommandOptions>({
    name: "embed",
    aliases: ['emb'],
    description: ".",
    detailedDescription: ".",
    quotes: [],
    enabled: true,
    preconditions: ["OwnerOnly"]

})
export default class EmbedCommand extends Command {
    public async messageRun(message: Message, args: Args): Promise<Message> {
        const bot = this.container.client.user;
        const option = args.finished ? null : args.pick("string")
        if (await option === null) {
            const reply = new MessageEmbed()
            .setTitle(`❌⠀Missing Arguments`)
            .setDescription(`${IContent.Description.Embed_Expectation}`)
            .setColor("RED")
            return await message.reply({embeds: [reply]})           
        } else if (typeof(await option) == "string") {
            const IOption = (await option).toLowerCase()
            switch (await IOption) {
                case "list": 
                    const embedList = new IMessageEmbed()
                    .setTitle(`✿⠀Embed Option List`)
                    .setDescription(`${IContent.Description.Embed_List}`)
                    .setTimestamp()
                    embedList.setFooter({text: Aboutme.watermark, iconURL: bot.displayAvatarURL({dynamic: false, size: 512})})
                    await message.reply({embeds: [embedList]})
                break;
                case "serverrules":
                    const serverRule = new IMessageEmbed()
                    .setTitle(`✿⠀Server Rules`)
                    .setDescription(`${IContent.Description.Server_Rules}`)
                    .setTimestamp()
                    serverRule.setFooter({text: Aboutme.watermark, iconURL: bot.displayAvatarURL({dynamic: false, size: 512})})
                    await message.channel.send({embeds: [serverRule]})
                break;
                case "tierlevels":
                    message.delete()
                    const tierLevel = new IMessageEmbed()
                    .setTitle(`✿⠀Tier Levels`)
                    .setDescription(`${IContent.Description.Tier_Levels}`)
                    .setTimestamp()
                    tierLevel.setFooter({text: Aboutme.watermark, iconURL: bot.displayAvatarURL({dynamic: false, size: 512})})
                    await message.channel.send({embeds: [tierLevel]})
                break;
                default: 
                    const notTheOption = new MessageEmbed()
                    .setTitle(`🚫⠀Option Not Available`)
                    .setDescription(`${IContent.Description.Not_theOption}`)
                    .setColor("RED")
                    await message.reply({embeds: [notTheOption]})
                return;
            }
        }
        return;
    }
}