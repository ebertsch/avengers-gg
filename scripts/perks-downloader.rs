const got = require('got');
const R = require('ramda');
const path = require('path');
const fs = require('fs').promises;

const Keywords = [
    new RegExp(/pym payload/, 'gi'),
    new RegExp(/shield payload/, 'gi'),
    new RegExp(/jarvis barrier/, 'gi'),
    new RegExp(/tachyon surge/, 'gi'),
    new RegExp(/taunted/, 'gi'),
    new RegExp(/stun/, 'gi'),
    new RegExp(/^\d{0,2}(\.\d{1,4})? *%?$/),
    new RegExp(/^\d{0,2}(\.\d{1,4})? *#?$/),
    '%',
    '#'
]
function addHighlightTags(value) {
    const newString = R.reduce((acc, cur)=>{

        if(R.type(cur) === 'RegExp') {
            const matches = value.match(cur);
            return !matches
                ? acc
                : R.reduce(
                    (a, c) => a.replace(c, "[" + R.toUpper(c) + "]"), acc, matches)
        }

        return acc.replace(cur, R.toUpper(`[${cur}]`), )
    }, value, Keywords)

    return R.reduce((acc, cur) => acc.replace(cur[0], cur[1]), newString, corrections);
}

const corrections = [
    [/\[PARTICLE\]s/ig, 'particles'],
    ['[[', '['],
    [']]', ']'],
    [/Privelege/ig, 'Privilege'],
    [/Fininshers/ig, 'Finishers'],
    [/affecred/ig, 'affected']
]
function fixHighlights(value) {
    return R.reduce((acc, cur) => acc.replace(cur[0], cur[1]), value, corrections);
}

const heroes = [
    [/iron man/, 'ironman'],
    [/captain america/, 'captain'],
    [/ms. marvel/, 'kamala'],
    [/black widow/, 'blackwidow']
]
function fixHeroNames(value) {
    return R.reduce((acc, cur) => acc.replace(cur[0], cur[1]), value, heroes)
}

(async () => { 
    try {
        const perks = await got("https://api.assemblers.world/perks").json();
        let x = 1
        const newPerks = R.sortBy(R.prop('title'), R.map((p) => {
            return {
                id: `p${x++}`,
                title: R.prop('name', p),
                description: fixHighlights(addHighlightTags(R.path(['content', 'description'], p))),
                gear: R.map(i => R.toLower(i), R.path(['content', 'gearCategories'], p) || []),
                heroId: fixHeroNames(R.toLower(R.path(['content', 'character'], p) || '*'))
            }
        }, perks.results))
        
        await fs.writeFile(
            path.join(__dirname, 'server-json-data', 'perks.json'),
            JSON.stringify({ "perks": newPerks })
        )
    } catch (error) { 
        console.log('error', error)
    }
})()

