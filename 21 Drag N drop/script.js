
const fill = document.querySelector('.fill');
const empties = document.querySelectorAll('.empty');


fill.addEventListener('dragstart', dragStart)
fill.addEventListener('dragend', dragEnd)

for(const empty of empties){
    empty.addEventListener('dragover', dragOver)
    empty.addEventListener('dragenter', dragEnter)
    empty.addEventListener('dragleave', dragLeave)
    empty.addEventListener('drop', dragDrop)
}

function dragStart() {
    this.classList.add('hold');
    // this.className += ' hold';
    
    setTimeout(() => this.className = 'invidible', 0);

}

function dragEnd(){
    // console.log('drag end')
    this.className = 'fill';
}
function dragEnter(e) {
    e.preventDefault();
    this.className += ' hovered';

}
function dragLeave() {
     this.className = 'empty';

}
function dragOver(e) {
    e.preventDefault();

}
function dragDrop() {
    this.className = 'empty';
    this.append(fill)
}
