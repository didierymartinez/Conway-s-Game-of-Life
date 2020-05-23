import { nextGeneration } from "./functions.js";
import { grid } from "./grid.js"

const controls = {};


const calculateNextGeneration = () => {
    const next = nextGeneration(100)(grid.currentState());
    grid.refresh(next);
}

const buttons = () => {
    const next = document.createElement('button');
    next.type = "button";
    next.innerHTML = ">>>";
    next.addEventListener('click', calculateNextGeneration);

    return next;
}



controls.ini = () => {
    const container = document.createElement('section');
    container.appendChild(buttons());
    return container;
}

export { controls };