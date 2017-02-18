(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Finder;

Finder = (function() {
  function Finder(o, keyword) {
    if (!(this instanceof Finder)) {
      return new Finder(o, keyword);
    }
    this.o = o;
    this.l = [];
    if (keyword) {
      this.find(keyword);
    }
  }

  Finder.prototype.find = function(keyword) {
    var _root, i, index, key, len, o, root, value;
    if (arguments[1]) {
      o = arguments[1];
      root = arguments[2];
    } else {
      this.keyword = keyword;
      o = this.o;
      root = [];
    }
    if (o instanceof Array) {
      for (index = i = 0, len = o.length; i < len; index = ++i) {
        value = o[index];
        _root = root.concat([index]);
        switch (Object.prototype.toString.call(value)) {
          case '[object String]':
          case '[object Number]':
            if ((value + '').indexOf(keyword) > -1) {
              this.log((this.format(_root)) + ": " + value);
            }
            break;
          case '[object Array]':
          case '[object Object]':
            if (this.l.indexOf(value) > -1) {
              break;
            }
            this.l.push(value);
            this.find(keyword, value, _root);
        }
      }
    } else {
      for (key in o) {
        value = o[key];
        _root = root.concat([key]);
        if ((key + '').indexOf(keyword) > -1) {
          this.log(this.format(_root));
        }
        switch (Object.prototype.toString.call(value)) {
          case '[object String]':
          case '[object Number]':
            if ((value + '').indexOf(keyword) > -1) {
              this.log((this.format(_root)) + ": " + value);
            }
            break;
          case '[object Array]':
          case '[object Object]':
            if (this.l.indexOf(value) > -1) {
              break;
            }
            this.l.push(value);
            this.find(keyword, value, _root);
        }
      }
    }
    if (!arguments[1]) {
      this.l = [];
    }
    return this;
  };

  Finder.prototype.format = function(root) {
    var _root, i, item, len;
    _root = '';
    for (i = 0, len = root.length; i < len; i++) {
      item = root[i];
      if (typeof item === 'string') {
        _root += item + ".";
      } else if (typeof item === 'number') {
        _root.replace(/\.?$/, "[" + item + "].");
      }
    }
    _root = _root.replace(/\.?$/, '');
    return _root;
  };

  Finder.prototype.log = function(str) {
    var _str, c, color, pattern;
    if (!str) {
      return;
    }
    color = '#00a0e9';
    c = [];
    pattern = new RegExp("" + this.keyword, 'g');
    _str = str.replace(pattern, function(match) {
      c.push("color: " + color);
      c.push('color: inherit');
      return "%c" + match + "%c";
    });
    c.unshift(_str);
    return console.log.apply(console, c);
  };

  return Finder;

})();

module.exports = Finder;


},{}],2:[function(require,module,exports){
var Finder, goblin;

Finder = require('./finder');

goblin = {
  Finder: Finder
};

if (typeof module === 'object' && module.filename) {
  module.exports = goblin;
} else if (typeof define === 'function' && define.amd) {
  define(function() {
    return goblin;
  });
} else {
  window.Goblin = goblin;
  if (window.G == null) {
    window.G = goblin;
  }
}


},{"./finder":1}]},{},[2]);
