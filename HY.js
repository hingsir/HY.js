;
(function (window, document, undefined) {
    var HY = {};
    HY.each = function (obj, fn) {
        var value,
            i = 0,
            length = obj.length,
            isArray = this.utils.isArray(obj);
        if (isArray) {
            for (var i = 0; i < length; i++) {
                value = fn.call(obj[i], i, obj[i])
                if (value == false) {
                    break;
                }
            }
        } else {
            for (i in obj) {
                value = fn.call(obj[i], i, obj[i])
                if (value == false) {
                    break;
                }
            }
        }
    };
    HY.event = {
        addHandler: function (target, event, handler) {
            if (target.addEventListener) {
                target.addEventListener(event, handler, false);
            } else if (target.attachEvent) {
                target.attachEvent('on' + event, handler);
            } else {
                target['on' + event ] = handler;
            }
        },
        removeHandler: function (target, event, handler) {
            if (target.removeEventListener) {
                target.removeEventListener(event, handler, false);
            } else if (target.detachEvent) {
                target.detachEvent('on' + event, handler);
            } else {
                target['on' + event ] = null;
            }
        },
        preventDefault: function (event) {
            if (event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
        },
        stopProgation: function (event) {
            if (event.stopProgation) {
                event.stopProgation();
            } else {
                event.cancelBubble();
            }
        },
        getEvent: function (event) {
            return event ? event : window.event;
        },
        getType: function (event) {
            return event.type;
        },
        getTarget: function (event) {
            return event.target || event.srcElement;
        }
    };
    var _isType = function (type) {
        return function (obj) {
            return Object.prototype.toString.call(obj) === "[object " + type + "]";
        }
    }
    HY.utils = {
        isObject: _isType('Object'),
        isString: _isType('String'),
        isArray: _isType('Array'),
        isFunction: _isType('Function'),
        isNumber: _isType("Number"),
        cid: (function () {
            var cid = 1;
            return function () {
                return cid++;
            }
        })(),
        random: function (n) {
            return Math.round(Math.random() * n);
        },
        randomCode: function (n) {
            var words = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            var code = '';
            for (var i = 0; i < n; i++) {
                code += words.charAt(this.random(words.length));
            }
            return code;
        },
        formatString: function (format, args) {
            var args = [].slice.call(arguments).slice(1);
            var i = 0;
            var o = {
                '%d': parseInt,
                '%f': parseFloat,
                '%s': function (obj) {
                    return obj + '';
                }
            }
            var _parse = function (type) {
                return function (obj) {
                    return  o[type](obj);
                }
            }
            format = format.replace(/(%[dfs])/img, function ($1, $2) {
                if (i == args.length) return $2;
                return  _parse($2)(args[i++]);
            })
            return format;
        },
        formatDate: function (date, format) {
            var o = {
                'yyyy': date.getFullYear(),
                'MM': date.getMonth() + 1,
                'dd': date.getDate(),
                'hh': date.getHours(),
                'mm': date.getMinutes(),
                'ss': date.getSeconds()
            }
            format = format.replace(/yyyy|MM|dd|hh|mm|ss/g, function ($) {
                return ('0000' + o[$]).substr(-$.length);
            })
            return format;
        },

        formatTemplate: function (template, data) {
            template = template.replace(/(\$\{((\w+\.?)+)\})/gm, function ($1, $2, $3) {
                return new Function('return ' + $3)()
            })
            return template
        }
    }
    window.HY = HY;
})(window, document);
