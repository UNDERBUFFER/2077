
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


function setStyles() {
    const mainDiv = document.getElementById('map')
    for (let elemnt of document.getElementsByClassName('spider')) mainDiv.removeChild(element)
    for (let i = 0; i < MAP_HEIGHT; i += BLOCK_HEIGHT) {
        for (let j = 0; j < MAP_WIDTH; j += BLOCK_WIDTH) {
            const innerDiv = document.createElement('div')
            innerDiv.className = 'spider'
            innerDiv.style.marginTop = `${i}px`
            innerDiv.style.marginLeft = `${j}px`
            mainDiv.appendChild(innerDiv)
        }
    }
}
