const util = require('util');
const { zokou } = require(__dirname + '/../framework/zokou');
const axios = require('axios');

zokou(
  {
    nomCom: 'fancy',
    categorie: 'Tools',
    reaction: '✨',
  },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre, arg, nomAuteurMessage } = commandeOptions;

    try {
      console.log('DEBUG - fancy triggered:', { arg, nomAuteurMessage });

      if (!arg[0]) {
        return repondre(`𝐒𝐏𝐈𝐋𝐔𝐗-𝐌𝐃\n\n◈━━━━━━━━━━━━━━━━◈\n│❒ YO ${nomAuteurMessage}, DON’T BE BLAND! Give me some text, like .fancy spilux_lau! 😡\n◈━━━━━━━━━━━━━━━━◈`);
      }

      const text = arg.join(' ').trim();
      await repondre(`𝐒𝐏𝐈𝐋𝐔𝐗-𝐌𝐃\n\n◈━━━━━━━━━━━━━━━━◈\n│❒ Yo ${nomAuteurMessage}, jazzing up "${text}" like a pro! 🔍\n◈━━━━━━━━━━━━━━━━◈`);

      const apiUrl = `https://api.giftedtech.web.id/api/tools/fancy?apikey=gifted&text=${encodeURIComponent(text)}`;
      const response = await axios.get(apiUrl);
      const data = response.data;

      if (!data.success || !data.results || data.results.length === 0) {
        return repondre(`𝐒𝐏𝐈𝐋𝐔𝐗-𝐌𝐃\n\n◈━━━━━━━━━━━━━━━━◈\n│❒ OOPS, ${nomAuteurMessage}! No fancy styles for "${text}"! Try something cooler! 😣\n◈━━━━━━━━━━━━━━━━◈`);
      }

      // Pick a random stylized text
      const fancyText = data.results[Math.floor(Math.random() * data.results.length)].result;

      await zk.sendMessage(
        dest,
        {
          text: `𝐒𝐏𝐈𝐋𝐔𝐗-𝐌𝐃\n\n◈━━━━━━━━━━━━━━━━◈\n│❒ BOOM, ${nomAuteurMessage}! Your text’s now a masterpiece! 🔥\n│❒ Fancy Text: ${fancyText}\n│❒ Powered by spilux_lau\n◈━━━━━━━━━━━━━━━━◈`,
          footer: `Hey ${nomAuteurMessage}! I'm Spilux-MD, created by 𝐬𝐩𝐢𝐥𝐮𝐱_𝐥𝐚𝐮 😎`,
        },
        { quoted: ms }
      );

    } catch (e) {
      console.error('Fancy text error:', e);
      await repondre(`𝐒𝐏𝐈𝐋𝐔𝐗-𝐌𝐃\n\n◈━━━━━━━━━━━━━━━━◈\n│❒ TOTAL FLOP, ${nomAuteurMessage}! Something crashed: ${e.message} 😡 Fix it or bounce! 😣\n◈━━━━━━━━━━━━━━━━◈`);
    }
  }
);