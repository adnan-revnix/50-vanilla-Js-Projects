const main = document.getElementById('main')
const addUserBtn = document.getElementById('add-user')
const doubleBtn = document.getElementById('double')
const showMillionairesBtn = document.getElementById('show-millionaires')
const sortBtn = document.getElementById('sort')
const calculateWealthBtn = document.getElementById('calculate-wealth');


let data = [];


getRandomUser()
getRandomUser()
getRandomUser()
// Fetch random user and add money
async function getRandomUser(){
   const res = await fetch('https://randomuser.me/api');
   const data = await res.json();

   const user = data.results[0];
   const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
   }

   addData(newUser)
};

// Add new obj to data arr
function addData(obj){
    data.push(obj);
    updateDom()
}

// Double Money
function doubleMoney(){
  data =   data.map(item =>{        // map returns array
        return {...item, money:item.money * 2}
    });

    updateDom()
}

// Sort by Richest

function sortByRichest(){
    data.sort((a,b) => b.money - a.money);
    updateDom()
 
}

// Show Millionaires
function showMillionaires(){
  data =  data.filter(item =>{
      return item.money > 1000000
    })
    updateDom()
}

// Calculate Wealth

function calculateWealth(){
    const wealth = data.reduce((acc, curr) => {
      return acc = acc + curr.money;
    }, 0);

    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3> Total Wealth  <strong> ${formatMoney(wealth)} </strong></h3>`;

    main.appendChild(wealthEl)
    // console.log(formatMoney(wealth))

    // updateDom()
}


// Update DOM
function updateDom(providedData = data){

    // Clear Main Div
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

    providedData.forEach(item =>{
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong> ${item.name} </strong> ${formatMoney(item.money)}`;

        main.append(element)
    })
}

// Format number as money
function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }

  // Event Listener
  addUserBtn.addEventListener('click', getRandomUser)
  doubleBtn.addEventListener('click', doubleMoney);
  sortBtn.addEventListener('click', sortByRichest);
 showMillionairesBtn.addEventListener('click', showMillionaires);
 calculateWealthBtn.addEventListener('click', calculateWealth);

 console.log( Math.floor(Math.random() * 1000000));
 console.log(
    Math.random()
 )