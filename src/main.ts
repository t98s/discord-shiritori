import { Client, Intents, TextChannel, Collection, Message } from 'discord.js'

const fetchAll = async function (channel: TextChannel) {
  let lastID: string|undefined = undefined;
  const messages = [];
  while (true) {
    const ret = await channel.messages.fetch({
      limit: 100,
      before: lastID
    }) as Collection<string, Message<boolean>>;
    const last = ret.last()
    if(last) lastID = last.id
    messages.push(...ret.values());
    if (ret.size < 100) break;
  }
  return new Collection(messages.sort((a, b) => BigInt(a.id) < BigInt(b.id) ? 1 : -1).map(e => [e.id, e]));
}

const client = new Client({ intents: Intents.FLAGS.GUILDS | Intents.FLAGS.GUILD_MESSAGES });

client.on('ready', () => {
  console.log(`
    へ(^o^)へ
    　 　|へ 膝、腰
    　　/
    
    ＼(^o^ )へ
    　 ＼|　 楽チン！
    　　　＞
    
    ＜( ^o^)＞
    　三) )三　コンドロイチンッ！
    ＜￣￣＞
    
    __△_
    (｡×ω×) ﾁｰﾝ
    
    ＿人人人人＿
    ＞突然の死＜
    ￣Y^Y^Y^Y￣
  `);
});

client.on('messageCreate', async msg => {
  if (msg.author.bot) return;
  if( !(msg.channel instanceof TextChannel) ) return;
  if (msg.channelId != process.env.CHANNEL_ID ) return;
  const messages = await fetchAll(msg.channel)
  if(messages.find(m => m.content == msg.content && m.id != msg.id)) {
    msg.reply("被ってるよ")
  }
});

client.login(process.env.TOKEN);
