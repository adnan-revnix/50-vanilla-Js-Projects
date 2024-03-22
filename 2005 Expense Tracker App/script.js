const balance = document.getElementById('balance')
const moneyPlus = document.getElementById('money-plus')
const moneyMinus = document.getElementById('money-minus')
const list = document.getElementById('list')
const form = document.getElementById('form')
const text = document.getElementById('text')
const amount = document.getElementById('amount');


// const dummyTransactions = [
//     {id: 1, text: "Flower", amount: -20},
//     {id: 2, text: "Salary", amount: 300},
//     {id: 3, text: "Book", amount: -10},
//     {id: 4, text: "Camera", amount: 150}
// ];

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transcations = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];


// ADD Transaction
function addTransaction(e){
    e.preventDefault();

    if(text.value.trim() === '' || amount.value.trim() === ''){
        alert('please enter a value')
    } else{
       const  transcation = {
            id: generateID(),
            text: text.value,
            amount: +amount.value,
        }

         transcations.push(transcation);

         addTransactionDOM(transcation);
         updateValues();
         updateLocalStorage()
         text.value = '';
         amount.value = '';
    }

}
// Generate Id
function generateID(){
    return Math.floor(Math.random() * 1000000)
}


// Update local storage transactions

function updateLocalStorage(){
    localStorage.setItem('transactions', JSON.stringify(transcations));
}
// ADD transactions to DOM list
function addTransactionDOM(transaction){
    // Get Sign
    const sign = transaction.amount < 0 ? "-" : '+';

    const item = document.createElement('li');

    // Add class based on value 
    item.classList.add(transaction.amount < 0 ? 'minus': 'plus');
    item.innerHTML = `
    ${transaction.text} <span> ${sign}${Math.abs(transaction.amount)}  </span> <button class = 'delete-btn' onclick = "removeTransaction(${transaction.id})"> x </button>
    `;

    list.append(item);
}
// Update Balance income 
function updateValues(){

    const amounts =  transcations.map( transcation => transcation.amount);  
      
    const total =(amounts.reduce((acc, curr) => { return acc +=curr}, 0)).toFixed(2);

    const expense = (amounts.filter(item => item <0).reduce((acc , item ) => { return acc +=item}, 0) * -1).toFixed(2);

    const income = amounts.filter(item => item > 0).reduce((acc, item) =>{
        return acc += item
    }, 0).toFixed(2);
    balance.innerText = `$${total}`;
    moneyPlus.innerText =  `$${income}`;
    moneyMinus.innerText = `$${expense}`;

}

// Delete Transaction

// function removeTransaction(e){
//     e.target.parentElement.remove();
// transcations.pop(e.target.parentElement)
//     updateValues()
  
// }

function removeTransaction(id){
    transcations = transcations.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    init()
}

// Init app
function init(){
    list.innerHTML = '';
    transcations.forEach(addTransactionDOM);
    updateValues()
}

init();

form.addEventListener('submit', addTransaction);
// list.addEventListener('click', removeTransaction)