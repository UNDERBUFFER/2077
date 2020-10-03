
'use strict';


function getRandomInteger(min, max) {
    let rand = min + Math.random() * (max - min)
    return Math.round(rand)
}


function parseCSSValue(value) {
    return Number(value.slice(0, -2))
}


const sortingFunctions = {
    ArrowUp: (a, b) => {
        return parseCSSValue(a.style.marginTop) - parseCSSValue(b.style.marginTop)
    },
    ArrowDown: (a, b) => {
        return parseCSSValue(b.style.marginTop) - parseCSSValue(a.style.marginTop)
    },
    ArrowLeft: (a, b) => {
        return parseCSSValue(a.style.marginLeft) - parseCSSValue(b.style.marginLeft)
    },
    ArrowRight: (a, b) => {
        return parseCSSValue(b.style.marginLeft) - parseCSSValue(a.style.marginLeft)
    }
}
