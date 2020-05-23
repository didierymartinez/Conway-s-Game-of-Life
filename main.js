import { createGrid, nextGeneration } from './modules/functions.js'
import { grid } from './modules/grid.js'
import { controls } from './modules/controls.js'

const gridSize = 3;

const html_grid = grid.create_HTML(gridSize);
const html_controls = controls.ini();

document.querySelector('.grid').appendChild(html_grid);
document.querySelector('.controls').appendChild(html_controls)

export { gridSize }