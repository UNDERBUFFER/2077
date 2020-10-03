
'use strict';


const BLOCKS = []


function newBlock() {
    const innerDiv = document.createElement('div')
    innerDiv.className = 'block'
    innerDiv.innerHTML += '<center><h1>2</h1></center>'

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
    const passedBlock = {
        marginLeft: marginLeft === null || marginTop === null ? innerDiv.style.marginLeft : marginLeft,
        marginTop: marginLeft === null || marginTop === null ? innerDiv.style.marginTop: marginTop
    }
    for (let block of BLOCKS) {
        if ( passedBlock.marginLeft == block.style.marginLeft &&
            passedBlock.marginTop == block.style.marginTop ) {
            return false
        }
    }
    return true
}


function findBlockByCoordinates(innerDiv, marginLeft=null, marginTop=null) {
    const passedBlock = {
        marginLeft: marginLeft === null || marginTop === null ? innerDiv.style.marginLeft : marginLeft,
        marginTop: marginLeft === null || marginTop === null ? innerDiv.style.marginTop: marginTop
    }
    for (let block of BLOCKS) {
        if ( passedBlock.marginLeft == block.style.marginLeft &&
            passedBlock.marginTop == block.style.marginTop ) {
            return block
        }
    }
    return false
}


function insertHTML(block, text) {
    block.innerHTML = `<center><h1>${text}</h1></center>`
}


function clearBlockHistory(block) {
    BLOCKS.remove(block)
    document.getElementById('map').removeChild( block )
}


function connectBlocks(someBlock, mainBlock) {
    clearBlockHistory( someBlock )
    insertHTML( mainBlock, Number(mainBlock.innerText) * 2 )
}


function moveBlocks(keyName) {
    const sortedBlocks = [...BLOCKS].sort( sortingFunctions[keyName] )
    for (let block of sortedBlocks) {
        const style = block.style
        switch (keyName) {
            case 'ArrowUp':
                while ( style.marginTop != '0px' ) {
                    let newValue = `${parseCSSValue(style.marginTop) - BLOCK_HEIGHT}px`
                    let notEmptyBlock = false
                    if ( notEmptyBlock = findBlockByCoordinates( null, style.marginLeft, newValue ) ) {
                        if (notEmptyBlock.innerText == block.innerText) connectBlocks( block, notEmptyBlock )
                        else break
                    }
                    else style.marginTop = newValue
                }
                break
            case 'ArrowDown':
                while ( style.marginTop != `${MAP_HEIGHT - BLOCK_HEIGHT}px` ) {
                    let newValue = `${parseCSSValue(style.marginTop) + BLOCK_HEIGHT}px`
                    let notEmptyBlock = false
                    if ( notEmptyBlock = findBlockByCoordinates( null, style.marginLeft, newValue ) ) {
                        if (notEmptyBlock.innerText == block.innerText) connectBlocks( block, notEmptyBlock )
                        else break
                    }
                    else style.marginTop = newValue
                }
                break
            case 'ArrowLeft':
                while ( style.marginLeft != '0px' ) {
                    let newValue = `${parseCSSValue(style.marginLeft) - BLOCK_WIDTH}px`
                    let notEmptyBlock = false
                    if ( notEmptyBlock = findBlockByCoordinates( null, newValue, style.marginTop ) ) {
                        if (notEmptyBlock.innerText == block.innerText) connectBlocks( block, notEmptyBlock )
                        else break
                    }
                    else style.marginLeft = newValue
                }
                break
            case 'ArrowRight':
                while ( style.marginLeft != `${MAP_WIDTH - BLOCK_WIDTH}px` ) {
                    let newValue = `${parseCSSValue(style.marginLeft) + BLOCK_WIDTH}px`
                    let notEmptyBlock = false
                    if ( notEmptyBlock = findBlockByCoordinates( null, newValue, style.marginTop ) ) {
                        if (notEmptyBlock.innerText == block.innerText) connectBlocks( block, notEmptyBlock )
                        else break
                    }
                    else style.marginLeft = newValue
                }
                break
        }        
    }
}


document.addEventListener('keydown', (event) => {
    moveBlocks(event.key)
    newBlock()
})
