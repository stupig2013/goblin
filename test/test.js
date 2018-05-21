const Goblin = require('../src/main')
const o = {
    a1: 'qweeaaaqwe',
    a2: {
        b1: 'qweaaa333'
    },
    a3aaa: [1, 2, 'aaa']
}

console.log(new Goblin.Finder(o, 'aaa'))