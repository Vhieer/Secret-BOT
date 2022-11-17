const WP = new (require('../../lib/wattpad'))
exports.run = {
   usage: ['wattpad', 'wattpadget', 'wattpadread'],
   async: async (m, {
      client,
      args,
      text,
      isPrefix,
      command
   }) => {
      try {
         if (command == 'wattpad') {
            if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'mariposa'), m)
            let json = await WP.search(text)
            if (!json.status) return client.reply(m.chat, global.status.fail, m)
            let rows = []
            json.data.map(v => rows.push({
               title: v.title,
               rowId: `${isPrefix}wattpadget ${v.url}`,
               description: `${v.status} | Bagian : ${v.parts} | Dibaca : ${v.reads} | Suara : ${v.votes} | Komen : ${v.comments} | creator : ${v.author.name}`
            }))
            client.sendList(m.chat, '', `pencarian untuk : *${text}*\n\nsilahkan pilih judul di bawah ini untuk menampilkan informasi, dan daftar part cerita 🌈`, '', 'Tap!', rows, m)
         } else if (command == 'wattpadget') {
            if (!args || !args[0]) return
            let json = await WP.detail(args[0])
            if (!json.status) return client.reply(m.chat, global.status.fail, m)
            let caption = `❏ *W A T T P A D*\n\n`
            caption += '	💌  *Judul* : ' + json.data.title + '\n'
            caption += '	📖  *Dibaca* : ' + json.data.reads + '\n'
            caption += '	📊  *Votes* : ' + json.data.votes + '\n'
            caption += '	📝  *Parts* : ' + json.data.numPart + '\n'
            caption += '	🎗️  *Author* : ' + json.data.author + '\n\n'
            caption += global.db.setting.footer
            client.sendMessageModify(m.chat, caption, m, {
            title: '🔒 https://support.wattpad.com',
            largeThumb: true,
            thumbnail: await Func.fetchBuffer(json.data.thumbnail)
            }).then(async () => {
              if (json.data.parts.length == 0) return client.reply(m.chat, global.status.fail, m)
               let rows = []
               json.data.parts.map(v => rows.push({
                  title: v.title,
                  rowId: `${isPrefix}wattpadread ${v.url}`,
                  description: ``
               }))
               client.sendList(m.chat, '', `${json.data.description}`, '', 'Tap!', rows, m)
            })
         } else if (command == 'wattpadread') {
            let json = await WP.read(args[0])
            if (!json.status) return client.reply(m.chat, global.status.fail, m)
            let caption = '*' + json.data.part + '*\n\n'
            caption += json.data.content
            client.sendFile(m.chat, json.data.thumbnail, '', caption, m)      
         }
      } catch (e) {
         console.log(e)
         client.reply(m.chat, global.status.error, m)
      }
   },
   error: false
}