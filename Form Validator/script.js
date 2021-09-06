const form = document.getElementById('form');
const username = document.getElementById("username");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");


// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error"; 
  const small = formControl.querySelector("small");
  small.innerText = message;
}

// Show success outline
function showSucces(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success"; 
}

// Check email
function isValidEmail(email) {
    const emailRe = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRe.test(String(email).toLowerCase());
}

// Check phone
function isValidPhone(phone) {
    const phoneRe = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
    return phoneRe.test(String(phone));
}

// Check required fields
function checkRequired(inputArr) {
  inputArr.forEach(function(input) {
    if (input.value.trim() == '') {
      showError(input, `${getFielName(input)} is required`);
    } else {
      showSucces(input);
    }
  })
}

// Check passwoed match
function checkPasswordMatch(input1, input2) {
  if(input1.value !== input2.value) {
    showError(input2, 'Password do not match');
  } 
}

// Get field name
function getFielName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Check lenght

function checkLenght(input, min, max) {
  if (input.value.length < min) {
    showError(
      input, 
      `${getFielName(input)} must be at least ${min} charecters`);
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFielName(input)} must be at less than ${max} charecters`
    );
  } else {
    showSucces(input);
  }
}

// Event Listerner
form.addEventListener('submit', function(e) {
  e.preventDefault();
  
  checkRequired([username, email, phone, password, password2])
  checkLenght(username, 3, 15);
  checkLenght(password, 6, 25);
  checkPasswordMatch(password, password2)
})