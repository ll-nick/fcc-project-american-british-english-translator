const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');

const translator = new Translator()

suite('Unit Tests', () => {

    // American to British
    test('Mangoes are my favorite fruit.', () => {
        const input = 'Mangoes are my favorite fruit.'
        const output = translator.translate(input, 'american-to-british');

        assert.equal(output, `Mangoes are my ${translator.highlight('favourite')} fruit.`)
    })

    test('I ate yogurt for breakfast.', () => {
        const input = 'I ate yogurt for breakfast.'
        const output = translator.translate(input, 'american-to-british');

        assert.equal(output, `I ate ${translator.highlight('yoghurt')} for breakfast.`)
    })

    test('We had a party at my friend\'s condo.', () => {
        const input = 'We had a party at my friend\'s condo.'
        const output = translator.translate(input, 'american-to-british');

        assert.equal(output, `We had a party at my friend's ${translator.highlight('flat')}.`)
    })

    test('Can you toss this in the trashcan for me?', () => {
        const input = 'Can you toss this in the trashcan for me?'
        const output = translator.translate(input, 'american-to-british');

        assert.equal(output, `Can you toss this in the ${translator.highlight('bin')} for me?`)
    })

    test('The parking lot was full.', () => {
        const input = 'The parking lot was full.'
        const output = translator.translate(input, 'american-to-british');

        assert.equal(output, `The ${translator.highlight('car park')} was full.`)
    })

    test('Like a high tech Rube Goldberg machine.', () => {
        const input = 'Like a high tech Rube Goldberg machine.'
        const output = translator.translate(input, 'american-to-british');

        assert.equal(output, `Like a high tech ${translator.highlight('Heath Robinson device')}.`)
    })

    test('To play hooky means to skip class or work.', () => {
        const input = 'To play hooky means to skip class or work.'
        const output = translator.translate(input, 'american-to-british');

        assert.equal(output, `To ${translator.highlight('bunk off')} means to skip class or work.`)
    })

    test('No Mr. Bond, I expect you to die.', () => {
        const input = 'No Mr. Bond, I expect you to die.'
        const output = translator.translate(input, 'american-to-british');

        assert.equal(output, `No ${translator.highlight('Mr')} Bond, I expect you to die.`)
    })

    test('Dr. Grosh will see you now.', () => {
        const input = 'Dr. Grosh will see you now.'
        const output = translator.translate(input, 'american-to-british');

        assert.equal(output, `${translator.highlight('Dr')} Grosh will see you now.`)
    })

    test('Lunch is at 12:15 today.', () => {
        const input = 'Lunch is at 12:15 today.'
        const output = translator.translate(input, 'american-to-british');

        assert.equal(output, `Lunch is at ${translator.highlight('12.15')} today.`)
    })

    // British to American
    test('We watched the footie match for a while.', () => {
        const input = 'We watched the footie match for a while.'
        const output = translator.translate(input, 'british-to-american');

        assert.equal(output, `We watched the ${translator.highlight('soccer')} match for a while.`)
    })

    test('Paracetamol takes up to an hour to work.', () => {
        const input = 'Paracetamol takes up to an hour to work.'
        const output = translator.translate(input, 'british-to-american');

        assert.equal(output, `${translator.highlight('Tylenol')} takes up to an hour to work.`)
    })

    test('First, caramelise the onions.', () => {
        const input = 'First, caramelise the onions.'
        const output = translator.translate(input, 'british-to-american');

        assert.equal(output, `First, ${translator.highlight('caramelize')} the onions.`)
    })

    test('I spent the bank holiday at the funfair.', () => {
        const input = 'I spent the bank holiday at the funfair.'
        const output = translator.translate(input, 'british-to-american');

        assert.equal(output, `I spent the ${translator.highlight('public holiday')} at the ${translator.highlight('carnival')}.`)
    })

    test('I had a bicky then went to the chippy.', () => {
        const input = 'I had a bicky then went to the chippy.'
        const output = translator.translate(input, 'british-to-american');

        assert.equal(output, `I had a ${translator.highlight('cookie')} then went to the ${translator.highlight('fish-and-chip shop')}.`)
    })

    test('I\'ve just got bits and bobs in my bum bag.', () => {
        const input = 'I\'ve just got bits and bobs in my bum bag.'
        const output = translator.translate(input, 'british-to-american');

        assert.equal(output, `I've just got ${translator.highlight('odds and ends')} in my ${translator.highlight('fanny pack')}.`)
    })

    test('The car boot sale at Boxted Airfield was called off.', () => {
        const input = 'The car boot sale at Boxted Airfield was called off.'
        const output = translator.translate(input, 'british-to-american');

        assert.equal(output, `The ${translator.highlight('swap meet')} at Boxted Airfield was called off.`)
    })

    test('Have you met Mrs Kalyani.', () => {
        const input = 'Have you met Mrs Kalyani.'
        const output = translator.translate(input, 'british-to-american');

        assert.equal(output, `Have you met ${translator.highlight('Mrs.')} Kalyani.`)
    })

    test('Prof Joyner of King\'s College, London.', () => {
        const input = 'Prof Joyner of King\'s College, London.'
        const output = translator.translate(input, 'british-to-american');

        assert.equal(output, `${translator.highlight('Prof.')} Joyner of King's College, London.`)
    })

    test('Tea time is usually around 4 or 4.30.', () => {
        const input = 'Tea time is usually around 4 or 4.30.'
        const output = translator.translate(input, 'british-to-american');

        assert.equal(output, `Tea time is usually around 4 or ${translator.highlight('4:30')}.`)
    })

});
