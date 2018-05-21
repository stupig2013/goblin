const Finder = require('./finder')
const Goblin = {
    Finder
}

module.exports = Goblin

if (typeof window == 'object' && window.navigator) {
    window.Goblin = Goblin
    if (window.G === undefined) {
        window.G = Goblin
    }
}
