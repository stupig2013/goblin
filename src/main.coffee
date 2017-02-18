Finder = require './finder'
goblin = {Finder}

if typeof module == 'object' and typeof module.exports == 'object' and module.filename
    module.exports = goblin
else if typeof define == 'function' and define.amd
    define ->
        goblin
else
    window.Goblin = goblin
    window.G ?= goblin