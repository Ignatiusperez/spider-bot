// img.js
const util = require('util');
const { zokou } = require(__dirname + '/../framework/zokou');
const axios = require('axios');

zokou(
  {
    nomCom: 'img',
    categorie: 'Search',
    reaction: '📸',
  },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre, arg, nomAuteurMessage } = commandeOptions;

    try {
      console.log('DEBUG - img triggered:', { arg, nomAuteurMessage });

      if (!arg[0]) {
        return repondre(`𝐒𝐏𝐈𝐋𝐔𝐗-𝐌𝐃\n\n◈━━━━━━━━━━━━━━━━◈\n│❒ YO ${nomAuteurMessage}, STOP SLACKING! Give me a query, like .img cat! 😡\n◈━━━━━━━━━━━━━━━━◈`);
      }

      const query = arg.join(' ').trim();
      const apiUrl = `https://api.giftedtech.web.id/api/search/googleimage?apikey=gifted&query=${encodeURIComponent(query)}`;

      await repondre(`𝐒𝐏𝐈𝐋𝐔𝐗-𝐌𝐃\n\n◈━━━━━━━━━━━━━━━━◈\n│❒ Hold up, ${nomAuteurMessage}! Grabbing your ${query} image like a pro! 🔍\n◈━━━━━━━━━━━━━━━━◈`);

      const response = await axios.get(apiUrl);
      const data = response.data;

      if (!data.success || !data.results || data.results.length === 0) {
        return repondre(`𝐒𝐏𝐈𝐋𝐔𝐗-𝐌𝐃\n\n◈━━━━━━━━━━━━━━━━◈\n│❒ NO IMAGES, ${nomAuteurMessage}! Your ${query} query is TRASH! Try again! 😣\n◈━━━━━━━━━━━━━━━━◈`);
      }

      // Pick a random image URL from results
      const imageUrl = data.results[Math.floor(Math.random() * data.results.length)];

      await zk.sendMessage(
        dest,
        {
          image: { url: imageUrl },
          caption: `𝐒𝐏𝐈𝐋𝐔𝐗-𝐌𝐃\n\n◈━━━━━━━━━━━━━━━━◈\n│❒ BAM, ${nomAuteurMessage}! Your ${query} image is STRAIGHT FIRE! 🔥\n│❒ Powered by spilux_lau\n◈━━━━━━━━━━━━━━━━◈`,
          footer: `Hey ${nomAuteurMessage}! I'm Spilux-MD, created by 𝐬𝐩𝐢𝐥𝐮𝐱_𝐥𝐚𝐮 😎`,
        },
        { quoted: ms }
      );

    } catch (e) {
      console.error('Image search error:', e);
      await repondre(`𝐒𝐏𝐈𝐋𝐔𝐗-𝐌𝐃\n\n◈━━━━━━━━━━━━━━━━◈\n│❒ TOTAL DISASTER, ${nomAuteurMessage}! Something broke: ${e.message} 😡 Fix it or scram!\n◈━━━━━━━━━━━━━━━━◈`);
    }
  }
);