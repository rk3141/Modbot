"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onlycommand = exports.opscommand = exports.byroles = exports.byrole = exports.inchannel = void 0;
const inchannel = (msg, channel_name) => {
    var _a;
    return ((_a = msg.guild) === null || _a === void 0 ? void 0 : _a.channels.cache.find(ch => ch.name == channel_name)) == msg.channel;
};
exports.inchannel = inchannel;
const byrole = (msg, rolename) => {
    var _a;
    let member = (_a = msg.guild) === null || _a === void 0 ? void 0 : _a.member(msg.author);
    if (!member) {
        return false;
    }
    member.roles.cache.find(role => role.name == rolename);
};
exports.byrole = byrole;
const byroles = (msg, rolenames) => {
    var _a;
    let member = (_a = msg.guild) === null || _a === void 0 ? void 0 : _a.member(msg.author);
    if (!member) {
        return false;
    }
    for (const rol of rolenames) {
        if (member.roles.cache.find(role => role.name === rol)) {
            return true;
        }
    }
    return false;
};
exports.byroles = byroles;
const opscommand = (msg, prefix, rest) => {
    return msg.content.startsWith(prefix + rest);
};
exports.opscommand = opscommand;
const onlycommand = (msg, prefix, rest) => {
    return msg.content === prefix + rest;
};
exports.onlycommand = onlycommand;
//# sourceMappingURL=utils.js.map