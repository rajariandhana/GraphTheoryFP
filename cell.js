export class Cell{
    constructor(id){
        this.id = id;
        this.type = 0;
        this.neighbors = [];

        let el = document.createElement('button');
        el.id = id;
        el.classList.add('size-12');
        el.classList.add('border');
        el.classList.add('border-gray-900');
        this.element = el;

        grid.appendChild(el);
        this.element.onclick = () => {
            this.CellClick();
        };
    }
    SetType(type){
        this.type = type;
    }
    AddNeighbor(cell){
        this.neighbors.push(cell);
    }
    // Color(''){
        // this.
    // }
    CellClick(){
        // this.element.classList.remove('');
        this.element.classList.add('bg-rose-500');
        this.neighbors.forEach(cell => {
            cell.element.classList.add('bg-indigo-500');
        });
    }
}
