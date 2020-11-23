import { Message } from "discord.js";
declare const inchannel: (msg: Message, channel_name: string) => boolean;
declare const byrole: (msg: Message, rolename: string) => boolean;
declare const byroles: (msg: Message, rolenames: string[]) => boolean;
declare const opscommand: (msg: Message, prefix: string, rest: string) => boolean;
declare const onlycommand: (msg: Message, prefix: string, rest: string) => boolean;
export { inchannel, byrole, byroles, opscommand, onlycommand };
