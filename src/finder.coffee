
class Finder
    constructor: (o, keyword) ->
        if !(@ instanceof Finder)
            return new Finder(o, keyword)
        @o = o
        @l = []
        if keyword
            @find(keyword)

    find: (keyword) ->
        if arguments[1]
            o = arguments[1]
            root = arguments[2]
        else
            @keyword = keyword
            o = @o
            root = []
            @result = []

        if o instanceof Array
            for value, index in o
                _root = root.concat([index])
                switch Object.prototype.toString.call(value)
                    when '[object String]', '[object Number]'
                        if (value + '').indexOf(keyword) > -1
                            @log "#{@format(_root)}: #{value}"

                    when '[object Array]', '[object Object]'
                        if @l.indexOf(value) > -1
                            break

                        @l.push(value)
                        @find(keyword, value, _root)
        else
            for key, value of o
                _root = root.concat([key])
                if (key + '').indexOf(keyword) > -1
                    @log @format(_root)

                switch Object.prototype.toString.call(value)
                    when '[object String]', '[object Number]'
                        if (value + '').indexOf(keyword) > -1
                            @log """#{@format(_root)}: #{value}"""

                    when '[object Array]', '[object Object]'
                        if @l.indexOf(value) > -1
                            break

                        @l.push(value)
                        @find(keyword, value, _root)
        if !arguments[1]
            @l = []

        return @

    format: (root) ->
        _root = ''
        for item in root
            if typeof item == 'string'
                _root += """#{item}."""
            else if typeof item == 'number'
                _root.replace /\.?$/, "[#{item}]."
        _root = _root.replace /\.?$/, ''
        return _root

    log: (str) ->
        if !str then return
        if typeof navigator == 'object'
            color = '#00a0e9'
            c = []
            pattern = new RegExp("#{@keyword}", 'g')
            _str = str.replace pattern, (match) ->
                c.push("color: #{color}")
                c.push('color: inherit')
                return "%c#{match}%c"
            c.unshift(_str)
            console.log.apply(console, c)
        else
            @result.push(str)


module.exports = Finder