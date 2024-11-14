import { Cell } from './cell.js';
function GetID(r,c){
    return 'cell_'+String(r).padStart(2,'0')+'_'+String(c).padStart(2,'0');
}
let grid = document.getElementById("grid");
let size = 10;
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
    let bombCtr=0;
    while(bombCtr<10){
        let nr = Math.floor(Math.random() * (size+1));
        let nc = Math.floor(Math.random() * (size+1));
        let cell = cells.get(GetID(nr,nc));
        if(cell.type == 0){
            cell.SetType('bomb');
            bombCtr++;
        }

    }

    cells.forEach((value,key) => {
        if(value.type == 'bomb') console.log(value);
    });
}

Init();
console.log(cells);