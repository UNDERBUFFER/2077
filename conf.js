
'use strict';


const MAP_WIDTH = 320
const MAP_HEIGHT = 320
const BLOCK_WIDTH = 80
const BLOCK_HEIGHT = 80


Array.prototype.remove = function() {
    let what, a = arguments, L = a.length, ax
    while (L && this.length) {
        what = a[--L]
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1)
        }
    }
    return this
}


const RANDOM_COLORS = [
    'Crimson',
    'Cyan',
    'DarkBlue',
    'DarkCyan',
    'DarkGoldenRod',
    'DarkKhaki',
    'DarkMagenta',
    'DarkOliveGreen',
    'DarkOrange',
    'DarkOrchid',
    'DarkRed',
    'DarkTurquoise',
    'DarkViolet',
    'DeepPink',
    'DeepSkyBlue'
]


const VALUES_BY_COLORS = new Proxy({
    2: 'violet',
    4: 'turquoise',
    8: 'aqua',
    16: 'aquamarine',
    32: 'chocolate',
    64: 'coral',
    128: 'cyan'
}, {
    get: function(target, name) {
        if (name in target) return target[name]
        target[name] = RANDOM_COLORS[ getRandomInteger(0, RANDOM_COLORS.length - 1) ]
        return target[name]
    }
})
