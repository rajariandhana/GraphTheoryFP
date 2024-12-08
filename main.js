// let isPlaying = false;
export let Game = {
    status: "NOT STARTED",
    emo_bomb : '💣',
    emo_flag : '🏴‍☠️',
    numBombs:0,
    flaggedBomb:0,
    revealed:0,
    target:0
}

import { Cell } from './cell.js';

function GetID(r,c){
    return 'cell_'+String(r).padStart(2,'0')+'_'+String(c).padStart(2,'0');
}
let n_mines = document.getElementById('n_mines');
let grid = document.getElementById("grid");
let reset = document.getElementById('reset');
reset.style.display = 'none';
let size = 12;
let cells = new Map();
function Init(){
    cells = new Map();
    // cells.set(1,100);
    while(grid.firstChild) grid.removeChild(grid.firstChild);

    for(let i=0; i<size; i++){
        for(let j=0; j<size; j++){
            let id = GetID(i,j);
            let cell = new Cell(id);
            cells.set(id,cell);
            // cells[id] = new Cell(id);
        }
    }
    let mr=[-1,-1,-1,0,0,1,1,1];
    let mc=[-1,0,1,-1,1,-1,0,1];
    for(let i=0; i<size; i++){
        for(let j=0; j<size; j++){
            let id = GetID(i,j);
            let cell = cells.get(id);
            if(!cell) continue;
            for(let k=0; k<8; k++){
                let nr = i+mr[k];
                let nc = j+mc[k];
                if(nr<0 || nr>=size || nc<0 || nc>=size) continue;
                let nid = GetID(nr,nc);
                let ncell = cells.get(nid);
                if(!ncell) continue;
                cell.AddNeighbor(ncell);
            }
        }
    }
    
}
export function GenerateBombs(cell){
    // isPlaying=true;
    // Example string
    let regex = /^cell_(\d{2})_(\d{2})$/;
    let match = cell.id.match(regex);
    let cr = parseInt(match[1], 10);
    let cc = parseInt(match[2], 10);

    let bombCtr=0;
    Game.numBombs = 12;
    Game.target = (Game.numBombs*Game.numBombs)-Game.numBombs;
    while(bombCtr<12){
        let nr = Math.floor(Math.random() * (size+1));
        let nc = Math.floor(Math.random() * (size+1));
        // console.log(nr+" "+nc);
        if(Math.abs(nr-cr)<=1 || Math.abs(nc-cc)<=1) continue;
        let ncell = cells.get(GetID(nr,nc));
        if(!ncell) continue;
        if(ncell.value == 0){
            ncell.value = -1;
            bombCtr++;
        }

    }
    // console.log("Bomb has been generated");

    cells.forEach((cell,cellID) => {
        if(cell.value == -1) {
            // console.log(cell);
            // cell.element.textContent='B';
            cell.neighbors.forEach(neighbor => {
                if(neighbor.value != -1) neighbor.value++;
                // neighbor.element.textContent = 'O';
            });
        }
    });
    // cells.forEach((cell,cellID)=>{
    //     cell.element.textContent = cell.value;
    //     cell.element.textContent = cell.value==-1? emo_bomb: cell.value;
    // });
    n_mines.textContent = 'There are '+Game.numBombs+' '+Game.emo_bomb;
    n_mines.classList.remove('text-gray-900');
    timeDisplay.classList.remove('text-gray-900');
    reset.style.display = 'flex';
    StartStopwatch();

    // reset.classList.remove('hidden');
    // n_mines.classList.remove('hidden');
}
export function CheckStatus(){
    // if(Game.status=="PLAYING") return;

    // console.log(Game.status);
    // console.log(Game.target+" "+Game.revealed);
    if(Game.status == "WIN" || Game.flaggedBomb == Game.numBombs || Game.target==Game.revealed){
        Game.status = "WIN";
        StopStopwatch();
        reset.textContent = 'You win! play again';
    }
    else if(Game.status=="LOST"){
        StopStopwatch();
        reset.textContent = 'Oh no you lost, go play again';
    }
    // if(Game.status == "WIN"){
    //     cells.forEach((cell,cellID)=>{
    //         cell.Disable();
    //     });
    // }
}

Init();
// GenerateBombs();
// console.log(cells);