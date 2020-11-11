exports.modapply = (msg) => {
    let arr = msg.content.split(" ");
    if (arr.length > 2 || arr.length == 2) {
        arr[1] = arr.slice(1,arr.length).join(" ");
    } else {
        msg.channel.send("Invalid Syntax: $modapply \"Reason\"")
        return;
    }
        
    let member = msg.guild.member(msg.author);
    if (!member) {return}
    let applications = msg.guild.channels.cache.find(channel => channel.name == "mod-requests");
    applications.send(
        `**${msg.author.username}#${msg.author.discriminator} has applied for <@&775643247103311885>**\n**The Reason provided for consideration:** ${eval(arr[1]) != "" ? eval(arr[1]) : "None"}`
    );
}