
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
