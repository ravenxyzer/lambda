"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("@sapphire/decorators");
const discord_js_1 = require("discord.js");
const framework_1 = require("@sapphire/framework");
const content_1 = require("../../structures/database/content");
const IPersonal_1 = require("../../structures/client/message/IPersonal");
const IMessageEmbed_1 = require("../../structures/client/message/IMessageEmbed");
let EmbedCommand = class EmbedCommand extends framework_1.Command {
    messageRun(message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const bot = this.container.client.user;
            const option = args.finished ? null : args.pick("string");
            if ((yield option) === null) {
                const reply = new discord_js_1.MessageEmbed()
                    .setTitle(`❌⠀Missing Arguments`)
                    .setDescription(`${content_1.IContent.Description.Embed_Expectation}`)
                    .setColor("RED");
                return yield message.reply({ embeds: [reply] });
            }
            else if (typeof (yield option) == "string") {
                const IOption = (yield option).toLowerCase();
                switch (yield IOption) {
                    case "list":
                        const embedList = new IMessageEmbed_1.IMessageEmbed()
                            .setTitle(`✿⠀Embed Option List`)
                            .setDescription(`${content_1.IContent.Description.Embed_List}`)
                            .setTimestamp();
                        embedList.setFooter({ text: IPersonal_1.Aboutme.watermark, iconURL: bot.displayAvatarURL({ dynamic: false, size: 512 }) });
                        yield message.reply({ embeds: [embedList] });
                        break;
                    case "serverrules":
                        const serverRule = new IMessageEmbed_1.IMessageEmbed()
                            .setTitle(`✿⠀Server Rules`)
                            .setDescription(`${content_1.IContent.Description.Server_Rules}`)
                            .setTimestamp();
                        serverRule.setFooter({ text: IPersonal_1.Aboutme.watermark, iconURL: bot.displayAvatarURL({ dynamic: false, size: 512 }) });
                        yield message.channel.send({ embeds: [serverRule] });
                        break;
                    case "tierlevels":
                        message.delete();
                        const tierLevel = new IMessageEmbed_1.IMessageEmbed()
                            .setTitle(`✿⠀Tier Levels`)
                            .setDescription(`${content_1.IContent.Description.Tier_Levels}`)
                            .setTimestamp();
                        tierLevel.setFooter({ text: IPersonal_1.Aboutme.watermark, iconURL: bot.displayAvatarURL({ dynamic: false, size: 512 }) });
                        yield message.channel.send({ embeds: [tierLevel] });
                        break;
                    default:
                        const notTheOption = new discord_js_1.MessageEmbed()
                            .setTitle(`🚫⠀Option Not Available`)
                            .setDescription(`${content_1.IContent.Description.Not_theOption}`)
                            .setColor("RED");
                        yield message.reply({ embeds: [notTheOption] });
                        return;
                }
            }
            return;
        });
    }
};
EmbedCommand = __decorate([
    (0, decorators_1.ApplyOptions)({
        name: "embed",
        aliases: ['emb'],
        description: ".",
        detailedDescription: ".",
        quotes: [],
        enabled: true,
        preconditions: ["OwnerOnly"]
    })
], EmbedCommand);
exports.default = EmbedCommand;
