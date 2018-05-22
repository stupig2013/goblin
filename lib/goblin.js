(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

class Finder {
    constructor (target, keyword) {
        this.target = target
        this.result = []
        this._cache = []
        if (keyword !== undefined) {
            this.find(keyword)
        }
    }

    find (keyword) {
        const cache = this._cache
        let target
        let path

        if (arguments[1] !== undefined) {
            target = arguments[1]
            path = arguments[2]
        } else {
            target = this.target
            path = []
            this.keyword = keyword
            this.result = []
        }

        if (target instanceof Array) {
            for (let i = 0; i < target.length;i++) {
                const item = target[i]
                const currentPath = path.concat([i])
                switch (Object.prototype.toString.call(item)) {
                    case '[object String]':
                    case '[object Number]':
                        if (String(item).indexOf(keyword) > -1) {
                            this.log(`${this.format(currentPath)}: ${item}`)
                        }
                        break
                    case '[object Array]':
                    case '[object Object]':
                        if (cache.indexOf(item) > -1)
                            break
                        cache.push(item)
                        this.find(keyword, item, currentPath)
                }
            }
        } else {
            for (const key in target) {
                const item = target[key]
                const currentPath = path.concat([key])
                if (String(key).indexOf(keyword) > -1) {
                    this.log(this.format(currentPath))
                }
                switch (Object.prototype.toString.call(item)) {
                    case '[object String]':
                    case '[object Number]':
                        if (String(item).indexOf(keyword) > -1) {
                            this.log(`${this.format(currentPath)}: ${item}`)
                        }
                        break
                    case '[object Array]':
                    case '[object Object]':
                        if (cache.indexOf(item) > -1) {
                            break
                        }

                        cache.push(item)
                        this.find(keyword, item, currentPath)
                }
            }
        }

        if (arguments[1] === undefined) {
            this._cache = []
        }
        // return this
    }

    format (path) {
        let pathStr = ''
        for (const item of path) {
            if (typeof item === 'string') {
                pathStr += `${item}.`
            } else if (typeof item === 'number') {
                pathStr.replace(/\.?$/, `[${item}].`)
            }
        }
        pathStr = pathStr.replace(/\.?$/, '')
        return pathStr
    }

    log (str) {
        if (str === '') {
            return
        }

        this.result.push(str)
        // console with color in browser(chrome)
        if (typeof window == 'object' && window.navigator) {
            const color = '#00a0e9'
            const consoleArgs = []
            const pattern = new RegExp(`${this.keyword}`, 'g')
            const finalStr = str.replace(pattern, (match) => {
                consoleArgs.push(`color: ${color}`)
                consoleArgs.push('color: inherit')
                return `%c${match}%c`
            })
            consoleArgs.unshift(finalStr)
            console.log.apply(console, consoleArgs)
        }
    }

}

module.exports = Finder
},{}],2:[function(require,module,exports){
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

},{"./finder":1}]},{},[2]);