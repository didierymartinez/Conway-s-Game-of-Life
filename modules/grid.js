import { createArrayN } from './functions.js'


const clickCell = (cell) => () => {
    cell.classList.toggle('live');
}

const create_Cell = (row, x) => (cur, y) => {
    const cordenate = `${x}@${y+1}`;
    const cell = document.createElement("div");
    cell.setAttribute('data-cordenate', cordenate);
    cell.title = cordenate;
    cell.classList.add("cell");
    cell.addEventListener('click', clickCell(cell));
    row.appendChild(cell);
    return cell;
};

const create_Row = dim => (c, i) => {
    const row = document.createElement("div");
    row.classList.add("row");
    const insertRow = create_Cell(row, i + 1);
    dim.map(insertRow);
    return row;
}

const findCells = (cells) => {
    const findCell = (cordenate) => document.querySelector(`div[data-cordenate="${cordenate}"]`);
    return cells.map(findCell)
}

const grid = {
    create_HTML: (size) => {
        const container_Grid = document.createElement('div');
        container_Grid.classList.add('container-grid');
        const dim = createArrayN(size);
        const rows = dim.map(create_Row(dim));
        const appendRow = (row) => { container_Grid.appendChild(row); }
        rows.forEach(appendRow);
        return container_Grid;
    },
    currentState: () => {
        const lives = document.querySelectorAll('.cell.live')
        const livingCells = Array.prototype.map.call(lives, (x) => x.dataset.cordenate);
        return livingCells;
    },
    refresh: (livingCells) => {
        const lives = document.querySelectorAll('.cell.live');
        const turnOff = (cell) => cell.classList.remove('live');
        const turnOn = (cell) => cell.classList.add('live');
        const mapElements = (elements, fn) => Array.prototype.map.call(elements, fn);
        mapElements(lives, turnOff);
        const nextGen = findCells(livingCells);
        mapElements(nextGen, turnOn);
    }
};






export { grid };