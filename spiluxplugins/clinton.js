const { zokou } = require('../framework/zokou');

zokou(
  {
    nomCom: 'info',
    categorie: 'General',
    reaction: '🗿'
  },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre, prefix, nomAuteurMessage } = commandeOptions;

    try {
      // Group and Channel links
      const groupLink = 'https://chat.whatsapp.com/GoXKLVJgTAAC3556FXkfFI';
      const channelLink = 'https://whatsapp.com/channel/0029VagJlnG6xCSU2tS1Vz19';

      // Prepare the info message content
      const infoMsg = `
𝐒𝐏𝐈𝐋𝐔𝐗-𝐌𝐃

◈━━━━━━━━━━━━━━━━◈
│❒ Yo ${nomAuteurMessage}, here’s the dope on ���𝔩��-𝔐𝔇! 🔥
│❒ *📩 𝐆𝐫𝐨𝐮𝐩*: ${groupLink}
│❒ *📢 𝐂𝐡𝐚𝐧𝐧𝐞𝐥*: ${channelLink}
│❒ Wanna vibe with the owner? Use *${prefix}owner*! 😎
│❒ Powered by spilux_lau
◈━━━━━━━━━━━━━━━━◈
      `;

      // Send the info message
      await zk.sendMessage(
        dest,
        {
          text: infoMsg,
          footer: `Hey ${nomAuteurMessage}! I'm Spilux-MD, created by ���𝐥��_��� 😎`
        },
        { quoted: ms }
      );

    } catch (error) {
      console.error("Error in info command:", error.stack);
      await repondre(`𝐒𝐏𝐈𝐋𝐔𝐗-𝐌𝐃\n\n◈━━━━━━━━━━━━━━━━◈\n│❒ TOTAL BUST, ${nomAuteurMessage}! ���𝔩��-𝔐𝔇 tripped while dropping the info: ${error.message} 😡 Try again or flop! 😣\n◈━━━━━━━━━━━━━━━━◈`);
    }
  }
);