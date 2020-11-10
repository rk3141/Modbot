"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var Discord = require("discord.js");
// Boilerplate
/*
    if (msg.content.startsWith("$report"))
    {
        
    }
*/
var client = new Discord.Client();
client.once("ready", function () {
    console.log("Ready!");
});
client.on("message", function (msg) { return __awaiter(void 0, void 0, void 0, function () {
    var user, member, user, member, arr, member, reports, params, rolename, rolecolor, arr, member, applications, assignee, member, assignee, member, assignee, member;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (msg.guild.channels.cache.find(function (ch) { return ch.name == "join"; }) == msg.channel) {
                    if (msg.content == "$verify") {
                        msg.guild.member(msg.author).roles.add(msg.guild.roles.cache.find(function (role) { return role.name == "member"; }));
                        msg["delete"]({ timeout: 100 });
                    }
                    else {
                        msg["delete"]({ timeout: 0 });
                    }
                }
                if (msg.content.startsWith("$kick") && msg.guild.member(msg.author).roles.cache.find(function (role) { return role.name == "Mod"; })) {
                    user = msg.mentions.members.first();
                    if (!user) {
                        msg.channel.send("Did you even mention someone");
                    }
                    member = msg.guild.member(user);
                    if (!member) {
                        msg.channel.send("This person ain't a member I suppose. :thinking:");
                    }
                    member.kick((msg.content.split(" ").slice(2, msg.content.split(" ").length) ? msg.content.split(" ").slice(2, msg.content.split(" ").length) : []).join(" ")).then(function (member) {
                        msg.channel.send("Successfully kicked \"" + member.user.username + "#" + member.user.discriminator + "\"");
                    })["catch"](function () {
                        msg.channel.send("Couldn't kick this member!");
                    });
                }
                if (msg.content.startsWith("$ban") && msg.guild.member(msg.author).roles.cache.find(function (role) { return role.name == "Mod"; })) {
                    user = msg.mentions.members.first();
                    if (!user) {
                        msg.channel.send("Did you even mention someone");
                    }
                    member = msg.guild.member(user);
                    if (!member) {
                        msg.channel.send("This person ain't a member I suppose. :thinking:");
                    }
                    member.ban().then(function (member) {
                        msg.channel.send("Successfully banned \"" + member.user.username + "#" + member.user.discriminator + "\"");
                    })["catch"](function () {
                        msg.channel.send("Couldn't ban this member!");
                    });
                }
                if (!msg.content.startsWith("$report")) return [3 /*break*/, 2];
                arr = msg.content.split(" ");
                if (arr.length > 2 || arr.length == 2) {
                    arr[1] = arr.slice(1, arr.length).join(" ");
                }
                else {
                    msg.channel.send("Invalid Syntax: $modapply \"Reason\"");
                    return [2 /*return*/];
                }
                member = msg.guild.member(msg.author);
                if (!member) {
                    return [2 /*return*/];
                }
                reports = msg.guild.channels.cache.find(function (channel) { return channel.name == "reports"; });
                return [4 /*yield*/, reports.send("**REPORT by " + msg.author.username + "#" + msg.author.discriminator + " @ " + arr[1] + "**")];
            case 1:
                (_a.sent()).suppressEmbeds();
                _a.label = 2;
            case 2:
                if (msg.content.startsWith("$cr") && msg.guild.member(msg.author).roles.cache.find(function (role) { return role.name == "Creditor" || role.name == "Owner" || role.name == "Mod"; })) {
                    params = msg.content.split(" ");
                    rolename = params[1];
                    rolecolor = params[2];
                    if (!rolecolor || !rolename) {
                        return [2 /*return*/];
                    }
                    msg.guild.roles.create({
                        data: {
                            name: rolename,
                            color: rolecolor,
                            position: msg.guild.member(msg.author).roles.highest.position + 1,
                            permissions: msg.guild.member(msg.author).roles.highest.permissions
                        }
                    }).then(function (role) { msg.channel.send("**Created role <@&" + role.id + "> with color " + role.hexColor + "**"); msg.guild.member(msg.author).roles.add(role); })["catch"](function (role) { msg.channel.send("Man you're probably an admin or you messed up thr colors"); });
                }
                if (msg.content.startsWith("$modapply")) {
                    arr = msg.content.split(" ");
                    if (arr.length > 2 || arr.length == 2) {
                        arr[1] = arr.slice(1, arr.length).join(" ");
                    }
                    else {
                        msg.channel.send("Invalid Syntax: $modapply \"Reason\"");
                        return [2 /*return*/];
                    }
                    member = msg.guild.member(msg.author);
                    if (!member) {
                        return [2 /*return*/];
                    }
                    applications = msg.guild.channels.cache.find(function (channel) { return channel.name == "mod-requests"; });
                    applications.send("**" + msg.author.username + "#" + msg.author.discriminator + " has applied for <@&775643247103311885>**\n**The Reason provided for consideration:** " + (eval(arr[1]) != "" ? eval(arr[1]) : "None"));
                }
                if (msg.content.startsWith("$trainee") && msg.guild.member(msg.author).roles.cache.find(function (role) { return role.name == "Mod" || role.name == "Admin"; })) {
                    assignee = msg.mentions.users.first();
                    if (!assignee) {
                        msg.channel.send("Did ya mention someone?");
                        return [2 /*return*/];
                    }
                    member = msg.guild.member(assignee);
                    if (!member) {
                        msg.channel.send("Member not found!");
                        return [2 /*return*/];
                    }
                    console.log("Reached");
                    member.roles.add(msg.guild.roles.cache.find(function (role) { return role.name == "Trainee Mod"; })).then(function (mem) {
                        console.log(mem.user.username + " is now a trainee mod");
                    })["catch"](function () {
                        console.log("Error");
                    });
                }
                if (msg.content.startsWith("$apnt") && msg.guild.member(msg.author).roles.cache.find(function (role) { return role.name == "Mod" || role.name == "Admin"; })) {
                    assignee = msg.mentions.users.first();
                    if (!assignee) {
                        msg.channel.send("Did ya mention someone?");
                        return [2 /*return*/];
                    }
                    member = msg.guild.member(assignee);
                    if (!member) {
                        return [2 /*return*/];
                    }
                    member.roles.add(msg.guild.roles.cache.find(function (role) { return role.name == "Mod"; }));
                }
                if (msg.content.startsWith("$dapnt") && msg.guild.member(msg.author).roles.cache.find(function (role) { return role.name == "Admin"; })) {
                    assignee = msg.mentions.users.first();
                    if (!assignee) {
                        msg.channel.send("Did ya mention someone?");
                        return [2 /*return*/];
                    }
                    member = msg.guild.member(assignee);
                    if (!member) {
                        return [2 /*return*/];
                    }
                    member.roles.remove(msg.guild.roles.cache.find(function (role) { return role.name == "Mod"; }));
                }
                return [2 /*return*/];
        }
    });
}); });
client.login("Nzc1NjUxNjE5Mjc0MDk2Njcw.X6pb3A.NBQBemW458XlCe8VTdO7RWzY9lY");
