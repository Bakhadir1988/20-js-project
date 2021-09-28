const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWelthBtn = document.getElementById("calculate-welth");

let data = [];

// fetch random user and add money
async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api')
  const data = await res.json();
  const user = data.results[0];
  const newWser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newWser);
}

// double Money
function doubleMoney() {
  data = data.map(user => {
    return { ...user, money: user.money * 2 }
  })

  updateDOM();
}

// Sort user
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);

  updateDOM();
}

// Filter
function showMillionaires() {
  data = data.filter(user => user.money > 1000000);

  updateDOM();
}

// calculate Welth
function calculateWelth() {
  const welth = data.reduce((acc, user) => (acc += user.money), 0);
  const welthEl = document.createElement('div');
  welthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(welth)}</strong></h3>`;
  main.appendChild(welthEl);
}

// Add new obj
function addData(obj) {
  data.push(obj);

  updateDOM();
}

// update DOM
function updateDOM(providedData = data) {
  // clear main div
  main.innerHTML = "<h2><strong>Preson</strong> Wealth</h2>";
  providedData.forEach(item => {
    const element = document.createElement('div');
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
    main.appendChild(element)
  });
}

// Format number as money
function formatMoney(number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

// Event Listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showMillionairesBtn.addEventListener("click", showMillionaires);
calculateWelthBtn.addEventListener("click", calculateWelth);