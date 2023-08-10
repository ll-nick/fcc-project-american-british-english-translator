const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

function invertObject(ojb) {
  const invertedObj = {};

  for (const key in ojb) {
    if (ojb.hasOwnProperty(key)) {
      const value = ojb[key];
      invertedObj[value] = key;
    }
  }

  return invertedObj;
}

const britishToAmericaSpelling = invertObject(americanToBritishSpelling);
const britishToAmericaTitles = invertObject(americanToBritishTitles);

function isFirstCharUpperCase(str) {
  return str.charAt(0) === str.charAt(0).toUpperCase();
}

function capitalizeFirstChar(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

class Translator {
  translate(text, locale) {
    this.validateText(text);
    const americanToBritish = this.isAmericanToBritish(locale);

    let translated;
    if (americanToBritish) {
      translated = this.translateAmericanToBritish(text);
    } else {
      translated = this.translateBritishToAmerican(text);
    }

    if (translated === text) {
      return 'Everything looks good to me!'
    }
    return translated;
  }

  translateAmericanToBritish(text) {
    let translated = text;

    translated = this.replaceStringsFromDict(translated, americanOnly);
    translated = this.replaceStringsFromDict(translated, americanToBritishSpelling);
    translated = this.replaceStringsFromDict(translated, americanToBritishTitles);

    const americanTimeRegex = /(\d{1,2}):(\d\d)/;
    translated = translated.replace(americanTimeRegex, this.highlight('$1.$2'));

    return translated
  }

  translateBritishToAmerican(text) {
    let translated = text;

    translated = this.replaceStringsFromDict(translated, britishOnly);
    translated = this.replaceStringsFromDict(translated, britishToAmericaSpelling);
    translated = this.replaceStringsFromDict(translated, britishToAmericaTitles);

    const englishTimeRegex = /(\d{1,2})\.(\d\d)/;
    translated = translated.replace(englishTimeRegex, this.highlight('$1:$2'));

    return translated
  }

  replaceStringsFromDict(text, dict) {
    for (const word in dict) {
      const reg = new RegExp('(?<=^| )(' + word + ')(?=[ ,.]|$)', 'gi');
      const match = text.match(reg)
      if (match) {
        const replaceWith = isFirstCharUpperCase(match[0]) ? capitalizeFirstChar(dict[word]) : dict[word]
        text = text.replace(reg, this.highlight(replaceWith));
      }
    }
    return text;
  }

  highlight(str) {
    return `<span class="highlight">${str}</span>`
  }

  validateText(text) {
    if (text === '') throw new Error('No text to translate')
    if (!text) throw new Error('Required field(s) missing');
  }

  isAmericanToBritish(locale) {
    if (!locale) throw new Error('Required field(s) missing');
    if (locale === 'american-to-british') return true;
    if (locale === 'british-to-american') return false;
    throw new Error('Invalid value for locale field');
  }
}

module.exports = Translator;