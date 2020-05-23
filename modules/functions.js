let getAround = (coordenate) => {
    const xy = coordenate.split('@'),
        x = parseInt(xy[0]),
        y = parseInt(xy[1]);

    const u = `${x}@${y+1}`
    const d = `${x}@${y-1}`
    const l = `${x-1}@${y}`
    const r = `${x+1}@${y}`
    const ul = `${x-1}@${y+1}`
    const ur = `${x+1}@${y+1}`
    const dl = `${x-1}@${y-1}`
    const dr = `${x+1}@${y-1}`

    return [ul, u, ur, l, r, dl, d, dr].filter(x => !/0/.test(x));
}

let countBit = binary => {
    let integer = parseInt(binary, 2);
    let count = 0;
    while (integer != 0) {
        integer = integer & integer - 1;
        count++;
    }
    return count;
};
let livingAround = (around, livingcells) => around.map(x => +livingcells.some(y => y == x));
let countLivingAround = cellsAround => countBit(cellsAround.join(''));

let createArrayN = dim => Array.from({ length: dim }, (v, k) => k + 1);
let createGrid = (dim1) => createArrayN(dim1).reduce((acu, cur) => { createArrayN(dim1).map(x => acu.push(`${cur}@${x}`)); return acu; }, []);

let setLives = livingCells => cell => countLivingAround(livingAround(getAround(cell), livingCells));
let nextState = (cur, nA) => (cur == 0 && nA == 3) || (cur == 1 && nA > 1 && nA < 4);

let nextGeneration = sizeGrid => currentState => {
    let calculateLivesAroundCell = setLives(currentState);
    return createGrid(sizeGrid).filter(cord => nextState(+currentState.includes(cord), calculateLivesAroundCell(cord)));
}

export { createArrayN, createGrid, nextGeneration };

/** EJECUCIÓN **/
nextGeneration(["1@1", "1@2", "2@1"])
nextGeneration(["2@1", "2@2", "2@3"])
nextGeneration(["1@1", "1@2", "2@1", "2@2"])

console.log('Celdas contiguas a 2@2', getAround("2@2"));

console.log('Contar unos del binario 100011111', countBit("100011111"));

let la = livingAround(getAround("2@2"), ["3@3", "1@3"]);
console.log('Vivos al rededor', la);
console.log('Cantidad de vivos al rededor', countLivingAround(la));
let sizeBoard = 3;
console.log('Crear una grilla 3x3', createGrid(sizeBoard));