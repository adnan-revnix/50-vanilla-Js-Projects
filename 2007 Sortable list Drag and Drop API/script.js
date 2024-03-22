const draggableList = document.getElementById('draggable-list')
const check = document.getElementById('check');

const richestPeople = [
    'Jeff Bezos',
    'Bill Gates',
    'Warren Buffet',
    'Bernard Arnault',
    'Carlos Slim Helu',
    'Amancio Ortega',
    'Larry Ellison',
    'Mark Zuckerberg',
    'Michael Bloomberg',
    'Larry Page'
];


// Store LI
const listItems = [];

let dragStartIndex;

createList();

// Insert list items int DOM

function createList(){
    [...richestPeople]
    .map(a => ({value: a, sort: Math.random()}))
    .sort((a,b) => a.sort - b.sort)
    .map( a => a.value)
    .forEach((person, index) => {

        const listItem = document.createElement('li');
        // listItem.classList.add('right')

        listItem.setAttribute('data-index', index);

        listItem.innerHTML = `
            <span class='number'>${index + 1}</span>
            <div class="draggable" draggable='true'>
                <p class='person-name'>${person}</p>
                <i class="fas fa-grip-lines"></i>
            </div>
        `;

        listItems.push(listItem);

        draggableList.append(listItem)
    })

    addEventListeners();
};


// DRAG DROP EVENTS
function dragStart() {
    dragStartIndex = +this.closest('li').getAttribute('data-index');

}
function dragEnter() {
    this.classList.add('over')
}
function dragLeave() {
    this.classList.remove('over')
}
function dragOver(e) {
    e.preventDefault();
}
function dragDrop() {
    const dragEndIndex = +this.getAttribute('data-index');

    swapItems(dragStartIndex, dragEndIndex);

    this.classList.remove('over')
}


// SWAP ITEMS
function swapItems(fromIndex, toIndex){
  const itemOne = listItems[fromIndex].querySelector('.draggable');
  const itemTwo = listItems[toIndex].querySelector('.draggable');

    listItems[fromIndex].append(itemTwo);
    listItems[toIndex].append(itemOne);
}

// Check Order of List Items 

function checkOrder(){

    listItems.forEach((listItem, index) =>{
        const personName = listItem.querySelector('.draggable').innerText.trim();

        if(personName !== richestPeople[index]) {
            listItem.classList.add('wrong')
        } else{

            listItem.classList.remove('wrong');
            listItem.classList.add('right');
        }
    })
}


function addEventListeners(){
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart)
    })
    dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
    })
}

check.addEventListener('click', checkOrder)