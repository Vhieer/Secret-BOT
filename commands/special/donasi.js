exports.run = {
   usage: ['dnsiii', 'donasi'],
   async: async (m, {
      client
   }) => {
      client.sendMessageModify(m.chat, info(), m, {
            title: 'D O N A S I',
            largeThumb: true,
            thumbnail: await Func.fetchBuffer('https://telegra.ph/file/20b22b4902ccf84615a0a.jpg')
            })         
   },
   error: false,
   cache: true,
   location: __filename
}

let info = () => {
   return `*❏ D O N A S I*
┏━━⬣ 
┃Mari berdonasi bersama kami
┃untuk meringankan user beban
┃
┃Bagi Anda yang memiliki saldo lebih
┃bisa di donasikan melalui berikut ini.
┃
┃D A N A : [ ]
┃P U L S A : [ ]
┃G O P A Y : [  ]
┗⬣

note : *donasi seikhlasnya aja*`
}
