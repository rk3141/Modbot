exports.report = (msg) => {
    let arr = msg.content.split(" ");
    if (arr.length > 2 || arr.length == 2) {
        arr[1] = arr.slice(1,arr.length).join(" ");
    } else {
        msg.channel.send("Invalid Syntax: $modapply \"Reason\"")
        return;
    }
        
    let member = msg.guild.member(msg.author);
    if (!member) {return}
    let reports = msg.guild.channels.cache.find(channel => channel.name == "reports");
    (await reports.send(
        `**REPORT by ${msg.author.username}#${msg.author.discriminator} @ ${arr[1]}**`
    )).suppressEmbeds();
}