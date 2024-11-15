import { Queue } from './queue.js';

export class Cell{
    constructor(id){
        this.id = id;
        this.value = 0;
        this.neighbors = [];
        this.status = 'HIDDEN';

        let el = document.createElement('button');
        el.id = id;
        el.classList.add('size-12');
        el.classList.add('border');
        el.classList.add('border-gray-900');

        el.addEventListener("mousedown",(event)=>this.handleMouseDown(event));
        el.addEventListener("contextmenu",(event)=>this.disableContextMenu(event));
        this.element = el;
        // this.element.onclick = () => {
        //     this.CellClick();
        // };

        grid.appendChild(el);
    }
    handleMouseDown(event){
        if(event.button===0) this.CellClick();
        else if(event.button===2) this.ToggleFlag();
    }
    disableContextMenu(event){
        event.preventDefault();
    }
    AddNeighbor(cell){
        this.neighbors.push(cell);
    }
    Reveal(){
        // console.log("revealed "+this.id);
        if(this.status === 'REVEALED') return;
        this.Unflag();
        this.element.classList.add('bg-gray-300');
        this.status = 'REVEALED';
        // this.element.style.background = '#fefefe';
    }
    // Color(''){
        // this.
    // }
    CellClick(){
        console.log("click");
        if(this.status === 'REVEALED') return;
        else if(this.value == -1){
            console.log("HIT BOMB GAME OVER");
        }
        else if(1<= this.value && this.value<=8){
            this.Reveal();
            console.log("angka "+this.value);
        }
        else{
            this.Reveal();
            let visited = new Map();
            let q = new Queue();
            q.enqueue(this);
            visited.set(this,true);

            while(!q.isEmpty()){
                let cur = q.dequeue();
                if(cur.value == -1) continue;
                cur.Reveal();
                if(1<= cur.value && cur.value <= 8)continue;

                cur.neighbors.forEach((neighbor)=>{
                    if(!visited.has(neighbor) && neighbor.value!=-1){
                        q.enqueue(neighbor);
                        visited.set(neighbor,true);
                    }

                });
            }
        }
    }
    ToggleFlag(){
        if(this.status === 'REVEALED') return;
        else if(this.status === 'FLAG') this.Unflag();
        else if(this.status === 'HIDDEN') this.Flag();
    }
    Unflag(){
        this.element.textContent = this.value;
        this.status = 'HIDDEN';
        console.log("UNFLAG");
    }
    Flag(){
        this.element.textContent = 'F';
        this.status = 'FLAG';
        console.log("FLAG");
    }
}
