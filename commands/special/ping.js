exports.run = {
   usage: ['ping'],
   async: async (m, {
      client,
      text
   }) => {
      client.reply(m.chat, text || 'ā *Download* : 80.61 mbps\nā *Upload* : 1006.27 mbps\nā *Response* : 3365 ms', m)
   },
   error: false,
   cache: true,
   location: __filename
}