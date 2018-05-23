(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Finder = function () {
    function Finder(target, keyword) {
        _classCallCheck(this, Finder);

        this.target = target;
        this.result = [];
        this._cache = [];
        if (keyword !== undefined) {
            this.find(keyword);
        }
    }

    _createClass(Finder, [{
        key: 'find',
        value: function find(keyword) {
            var cache = this._cache;
            var target = void 0;
            var path = void 0;

            if (arguments[1] !== undefined) {
                target = arguments[1];
                path = arguments[2];
            } else {
                target = this.target;
                path = [];
                this.keyword = keyword;
                this.result = [];
                cache.push(this);
            }

            if (target instanceof Array) {
                for (var i = 0; i < target.length; i++) {
                    var item = target[i];
                    var currentPath = path.concat([i]);
                    switch (Object.prototype.toString.call(item)) {
                        case '[object String]':
                        case '[object Number]':
                            if (String(item).indexOf(keyword) > -1) {
                                this.log(this.format(currentPath) + ': ' + item);
                            }
                            break;
                        case '[object Array]':
                        case '[object Object]':
                            if (cache.indexOf(item) === -1) {
                                cache.push(item);
                                this.find(keyword, item, currentPath);
                            }
                    }
                }
            } else {
                for (var key in target) {
                    var _item = target[key];
                    var _currentPath = path.concat([key]);
                    if (String(key).indexOf(keyword) > -1) {
                        this.log(this.format(_currentPath));
                    }
                    switch (Object.prototype.toString.call(_item)) {
                        case '[object String]':
                        case '[object Number]':
                            if (String(_item).indexOf(keyword) > -1) {
                                this.log(this.format(_currentPath) + ': ' + _item);
                            }
                            break;
                        case '[object Array]':
                        case '[object Object]':
                            if (cache.indexOf(_item) === -1) {
                                cache.push(_item);
                                this.find(keyword, _item, _currentPath);
                            }
                    }
                }
            }

            if (arguments[1] === undefined) {
                this._cache = [];
            }
            // return this
        }
    }, {
        key: 'format',
        value: function format(path) {
            var pathStr = '';
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = path[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var item = _step.value;

                    if (typeof item === 'string') {
                        pathStr += item + '.';
                    } else if (typeof item === 'number') {
                        pathStr.replace(/\.?$/, '[' + item + '].');
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            pathStr = pathStr.replace(/\.?$/, '');
            return pathStr;
        }
    }, {
        key: 'log',
        value: function log(str) {
            if (str === '') {
                return;
            }

            this.result.push(str);
            // console with color in browser(chrome)
            if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) == 'object' && window.navigator) {
                var color = '#00a0e9';
                var consoleArgs = [];
                var pattern = new RegExp('' + this.keyword, 'g');
                var finalStr = str.replace(pattern, function (match) {
                    consoleArgs.push('color: ' + color);
                    consoleArgs.push('color: inherit');
                    return '%c' + match + '%c';
                });
                consoleArgs.unshift(finalStr);
                console.log.apply(console, consoleArgs);
            }
        }
    }]);

    return Finder;
}();

exports.default = Finder;

},{}],2:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _finder = require('./finder');

var _finder2 = _interopRequireDefault(_finder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Goblin = {
    Finder: _finder2.default
};

module.exports = Goblin;

if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) == 'object' && window.navigator) {
    window.Goblin = Goblin;
    if (window.G === undefined) {
        window.G = Goblin;
    }
}

},{"./finder":1}]},{},[2]);
