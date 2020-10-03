
'use strict';

const BLOCKS = []

function newBlock() {
    const innerDiv = document.createElement('div')
    innerDiv.className = 'block'
    innerDiv.innerHTML += '<center><h1>2</h1></center>';

    for (let i = 0; i < 100; i++) {
        innerDiv.style.marginLeft = `${getRandomInteger(0, ( MAP_WIDTH / BLOCK_WIDTH ) - 1) * BLOCK_WIDTH}px`
        innerDiv.style.marginTop = `${getRandomInteger(0, ( MAP_HEIGHT / BLOCK_HEIGHT ) - 1) * BLOCK_HEIGHT}px`

        if (checkList(innerDiv)) {
            BLOCKS.push(document.getElementById('map').appendChild(innerDiv))
            return true
        }
    }

    console.log('endgame')
    return true

}

function checkList(innerDiv, marginLeft=null, marginTop=null) {
    for (let block of BLOCKS) {
        const passedBlock = {
            marginLeft: marginLeft === null || marginTop === null ? innerDiv.style.marginLeft : marginLeft,
            marginTop: marginLeft === null || marginTop === null ? innerDiv.style.marginTop: marginTop
        }
        if ( passedBlock.marginLeft == block.style.marginLeft &&
            passedBlock.marginTop == block.style.marginTop ) {
            return false
        }
    }
    return true
}

function moveBlocks(keyName) {
    let sortedBlocks = []
    switch (keyName) {
        case 'ArrowUp':
            sortedBlocks = [...BLOCKS].sort( (a, b) => {
                return Number(a.style.marginTop.slice(0, -2)) - Number(b.style.marginTop.slice(0, -2))
            } )
            for (let block of sortedBlocks) {
                while ( block.style.marginTop != '0px' ) {
                    let newValue = `${Number(block.style.marginTop.slice(0, -2)) - BLOCK_HEIGHT}px`
                    if ( !checkList( null, block.style.marginLeft, newValue ) ) break
                    block.style.marginTop = newValue
                }
            }
            break
        case 'ArrowDown':
            sortedBlocks = [...BLOCKS].sort( (a, b) => {
                return Number(b.style.marginTop.slice(0, -2)) - Number(a.style.marginTop.slice(0, -2))
            } )
            for (let block of sortedBlocks) {
                while ( block.style.marginTop != `${MAP_HEIGHT - BLOCK_HEIGHT}px` ) {
                    let newValue = `${Number(block.style.marginTop.slice(0, -2)) + BLOCK_HEIGHT}px`
                    if ( !checkList( null, block.style.marginLeft, newValue ) ) break
                    block.style.marginTop = newValue
                }
            }
            break
        case 'ArrowLeft':
            sortedBlocks = [...BLOCKS].sort( (a, b) => {
                return Number(a.style.marginLeft.slice(0, -2)) - Number(b.style.marginLeft.slice(0, -2))
            } )
            for (let block of sortedBlocks) {
                while ( block.style.marginLeft != '0px' ) {
                    let newValue = `${Number(block.style.marginLeft.slice(0, -2)) - BLOCK_WIDTH}px`
                    if ( !checkList( null, newValue, block.style.marginTop ) ) break
                    block.style.marginLeft = newValue
                }
            }
            break
        case 'ArrowRight':
            sortedBlocks = [...BLOCKS].sort( (a, b) => {
                return Number(b.style.marginLeft.slice(0, -2)) - Number(a.style.marginLeft.slice(0, -2))
            } )
            for (let block of sortedBlocks) {
                while ( block.style.marginLeft != `${MAP_WIDTH - BLOCK_WIDTH}px` ) {
                    let newValue = `${Number(block.style.marginLeft.slice(0, -2)) + BLOCK_WIDTH}px`
                    if ( !checkList( null, newValue, block.style.marginTop ) ) break
                    block.style.marginLeft = newValue
                }
            }
            break
    }
}

document.addEventListener('keydown', (event) => {
    moveBlocks(event.key)
})

