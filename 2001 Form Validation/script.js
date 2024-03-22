const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Show Input error
function showError(el, msg){
    const formControl=  el.parentElement;
    // formControl

   formControl.classList.add('error');
   const small = formControl.querySelector('small');
   small.innerText = msg;
}

/// Show outline
function showSuccess(el){
    el.parentElement.classList.add('success')
}

 // Check email

function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
      showSuccess(input);
    } else {
      showError(input, 'Email is not valid');
    }
  }

///  check required fields
function checkRequired(inputArr){
    inputArr.forEach(input => {
        if(input.value.trim() ===  ''){
            showError(input, `${getFieldName(input)} is required`);
        }else{
            showSuccess(input)
        }
    });
};

// Check input length
function checkLength(input, min, max){
    if(input.value.length < min){
        showError(input, `${getFieldName(input)} must be atleast ${min} characters`);        
        } else if (input.value.length > max){
            showError(input, `${getFieldName(input)} must be less than  ${max + 1}  characters`);
        } else{
            showSuccess(input)
        }
    }
// Check password match
function checkPaswordsMatch(input1, input2){
    if(input1.value !== input2.value){
        showError(input2, 'Password do not match')
    } 
}

// Get fieldname
function getFieldName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);

    // console.log(input.id.charAt(0).toUpperCase())
}

// Event Listener
form.addEventListener('submit', function(e){
    e.preventDefault();
 
    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPaswordsMatch(password, password2)
});




















// form.addEventListener('submit', function(e){
//     e.preventDefault();
//     if(username.value === ''){
//         showError(username, 'Username is required')
//     } else{
//         showSuccess(username)
//     }
//     if(email.value === ''){
//         showError(email, 'Email is required')
//     } 
//     else if(!isValiidEmail(email.value)){

//         showError(email, 'Please enter a valid email')
//     }
//     else{
//         showSuccess(email)
//     }
//     if(password.value === ''){
//         showError(password, 'Password is required')
//     } else{
//         showSuccess(password)
//     }
//     if(password2.value === ''){
//         showError(password2, 'Password2 is required')
//     } else{
//         showSuccess(password2)
//     }
   
// })