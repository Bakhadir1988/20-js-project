const currencyElementOne = document.getElementById("currency-one");
const amountElementOne = document.getElementById("amount-one");
const currencyElementTwo = document.getElementById("currency-two");
const amountElementTwo = document.getElementById("amount-two");

const rate = document.getElementById('rate');
const swap = document.getElementById('swap')

// Fetch exchange rates and update the DOM
function calculate () {
  const currencyOne = currencyElementOne.value;
  const currencyTwo = currencyElementTwo.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${currencyOne}`)
    .then(res => res.json())
    .then(data => {
      // console.log(data)
      const rateEl = data.rates[currencyTwo];

      rate.innerText = `1 ${currencyOne} = ${rateEl} ${currencyTwo}`;

      amountElementTwo.value = (amountElementOne.value * rateEl).toFixed(2)
    })
}


// Event Listeners
currencyElementOne.addEventListener('change', calculate);
amountElementOne.addEventListener("input", calculate);
currencyElementTwo.addEventListener("change", calculate);
amountElementTwo.addEventListener("input", calculate);

swap.addEventListener('click', () => {
  const temp = currencyElementOne.value;
  currencyElementOne.value = currencyElementTwo.value;
  currencyElementTwo.value = temp;
  calculate();
})

calculate();