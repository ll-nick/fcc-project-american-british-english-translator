const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
  translate(text, americanToBritish = true) {
    let translated = text;

    const americanTimeRegex = /(\d{1,2}):(\d\d)/;
    const englishTimeRegex = /(\d{1,2})\.(\d\d)/;

    if (americanToBritish) {
      translated = this.replaceStringsFromDict(translated, americanOnly);
      translated = this.replaceStringsFromDict(translated, americanToBritishSpelling);
      translated = this.replaceStringsFromDict(translated, americanToBritishTitles);
      translated = translated.replace(americanTimeRegex, this.highlight('$1.$2'));
    } else {
      const britishToAmericaSpelling = this.invertObject(americanToBritishSpelling);
      const britishToAmericaTitles = this.invertObject(americanToBritishTitles);

      translated = this.replaceStringsFromDict(translated, britishOnly);
      translated = this.replaceStringsFromDict(translated, britishToAmericaSpelling);
      translated = this.replaceStringsFromDict(translated, britishToAmericaTitles);
      translated = translated.replace(englishTimeRegex, this.highlight('$1:$2'));
    }

    if (translated === text) {
      return 'Everything looks good to me!'
    }
    return translated;
  }

  replaceStringsFromDict(text, dict) {
    for (const word in dict) {
      const reg = new RegExp('(?<=^| )(' + word + ')(?=[ ,.]|$)', 'gi');
      if (text.match(reg)) {
        text = text.replace(reg, this.highlight(dict[word]));
      }
    }
    return text;
  }

  highlight(str) {
    return `<span class="highlight">${str}</span>`
  }

  invertObject(ojb) {
    const invertedObj = {};

    for (const key in ojb) {
      if (ojb.hasOwnProperty(key)) {
        const value = ojb[key];
        invertedObj[value] = key;
      }
    }

    return invertedObj;
  }
}

module.exports = Translator;