import { Queue } from './queue.js';
import {Game} from './main.js';
import { GenerateBombs } from './main.js';
import { CheckStatus } from './main.js';
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
        el.classList.add('bg-rose-200');
        el.classList.add('text-xl');

        el.addEventListener("mousedown",(event)=>this.handleMouseDown(event));
        el.addEventListener("contextmenu",(event)=>this.disableContextMenu(event));
        this.element = el;

        grid.appendChild(el);
    }
    handleMouseDown(event){
        if(event.button===0) this.CellClick();
        else if(event.button===2 && Game.status!="NOT STARTED") this.ToggleFlag();
    }
    disableContextMenu(event){
        event.preventDefault();
    }
    AddNeighbor(cell){
        this.neighbors.push(cell);
    }
    Reveal(){
        // console.log("revealed "+this.id);
        if(this.status == 'REVEALED') return;
        this.Unflag();
        if(this.value!= -1){
            this.element.classList.remove('bg-rose-200');
            this.element.classList.add('bg-indigo-200');
            Game.revealed++;
            CheckStatus();
        }

        this.status = 'REVEALED';
        // this.element.textContent = this.value!=0? this.value:'';
        if(this.value == -1) this.element.textContent = Game.emo_bomb;
        else if(this.value > 0) this.element.textContent = this.value;
        switch (this.value) {
            case 1: this.element.classList.add('text-blue-600'); break;
            case 2: this.element.classList.add('text-green-600'); break;
            case 3: this.element.classList.add('text-red-600'); break;
            case 4: this.element.classList.add('text-purple-600'); break;
            case 5: this.element.classList.add('text-orange-600'); break;
            case 6: this.element.classList.add('text-aqua-600'); break;
            case 7: this.element.classList.add('text-pink-600'); break;
            case 8: this.element.classList.add('text-brown-600'); break;
        
            default:
                this.element.classList.add('text-black');
                break;
        }

        // this.element.style.background = '#fefefe';
    }
    // Color(''){
        // this.
    // }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
    async CellClick(){
        if(Game.status == "NOT STARTED") {GenerateBombs(this);Game.status="PLAYING";}
        else if(Game.status == "WIN" || Game.status == "LOST" || this.status == 'REVEALED' || this.status == "FLAG") return;

        this.Reveal();
        if(this.value == -1){
            Game.status = "LOST";
            console.log("HIT BOMB GAME OVER");
            CheckStatus();
        }
        else if(1<= this.value && this.value<=8){
            console.log("angka "+this.value);
        }
        else{
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
                await this.delay(100);

            }
        }
    }
    ToggleFlag(){
        if(Game.status == "WIN" || Game.status == "LOST" || this.status == 'REVEALED') return;

        else if(this.status === 'FLAG') this.Unflag();
        else if(this.status === 'HIDDEN') this.Flag();
    }
    Unflag(){
        console.log("UNFLAG");
        this.element.textContent = this.value>0? this.value : '';
        this.status = 'HIDDEN';
        if(this.value == -1) Game.flaggedBomb--;
    }
    Flag(){
        console.log("FLAG");
        this.element.textContent = Game.emo_flag;
        this.status = 'FLAG';
        if(this.value == -1) Game.flaggedBomb++;
        CheckStatus();
    }
}
