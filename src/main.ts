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
  return new Collection(
    messages
      .sort((a, b) => (BigInt(a.id) < BigInt(b.id) ? 1 : -1))
      .map((e) => [e.content, e])
  );
}

const client = new Client({ intents: Intents.FLAGS.GUILDS | Intents.FLAGS.GUILD_MESSAGES });

let messages:Collection<string, Message<boolean>> = new Collection([])

client.on('ready', async () => {
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
  if(!process.env.CHANNEL_ID){
    console.log("環境変数 CHANNEL_ID が設定されていません")
    process.exit(1)
  }
  const channel = await client.channels.fetch(process.env.CHANNEL_ID)
  if(!channel || !(channel instanceof TextChannel) ){
    console.log("環境変数 CHANNEL_ID からチャンネルが取得できませんでした")
    process.exit(1)
  }
  messages = await fetchAll(channel)
  channel.send('[Announce] 再起動しました')
});

client.on('messageCreate', async msg => {
  console.log(msg)
  if (msg.author.bot) return;
  if( !(msg.channel instanceof TextChannel) ) return;
  if (msg.channelId != process.env.CHANNEL_ID ) return;
  if (messages.get(msg.content)) {
    msg.reply("被ってるよ")
  }
  messages = messages.set(msg.content, msg);
});

client.login(process.env.TOKEN);
