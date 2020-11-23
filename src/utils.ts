import { Message } from "discord.js";
const inchannel = (msg: Message, channel_name: string) => {
    return msg.guild?.channels.cache.find(ch => ch.name == channel_name) == msg.channel;
}

const byrole = (msg: Message, rolename: string) => {
    let member = msg.guild?.member(msg.author);
    if (!member) {return false;}

    member.roles.cache.find(role => role.name == rolename)
}

const byroles = (msg: Message, rolenames: string[]) => {
    let member = msg.guild?.member(msg.author);
    if (!member) {return false;}

    for (const rol of rolenames) {
        if (member.roles.cache.find(role => role.name === rol)) {return true;}
    }
    return false;
}

const opscommand = (msg: Message,prefix: string,rest: string) => {
    return msg.content.startsWith(prefix+rest);
}

const onlycommand = (msg: Message,prefix: string,rest: string) => {
    return msg.content === prefix+rest;
}

export {
    inchannel,
    byrole,
    byroles,
    opscommand,
    onlycommand
};