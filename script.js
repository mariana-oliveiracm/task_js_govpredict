var mainDiv = document.querySelector('.form');
var sendEmailButton = document.getElementById('sendEmailButton');
var inputTitle = document.getElementById('title');
var inputFullName = document.getElementById('fullName');
var inputStreetAddress = document.getElementById('streetAdress');
var inputZipCode = document.getElementById('zipCode');
var inputPhoneNumber = document.getElementById('phoneNumber');
var inputEmail = document.getElementById('emailAddress');
var isFullNameOkForMessage = false;
var isStreetAdressOkForMessage = false;
var isZipCodeOkForMessage = false;
var expandRecipientsText = document.getElementById('expandRecipients');
var loadingDiv= document.getElementById('loading');
var recipientsTopText= document.getElementById('recipientsTop');
var recipientsDetailDiv = document.getElementById('recipientsDetail');
var emailClosingDiv = document.getElementById('closing');
var okToSend = false;

addEvents();

function addEvents(){    
    sendEmailButton.addEventListener('click', event =>{
        event.preventDefault();
        setValueAssessment();
        var fieldsAreValid = checkValidations();
        if(fieldsAreValid){
            sendEmailButton.classList.remove('gradient');
            sendEmailButton.classList.add('buttonLoading');
            sendEmailButton.innerHTML = "";
            setTimeout(() => {
                sendForm();                
            }, 2000);
        }
        
    });
    
    inputTitle.addEventListener('blur', event =>{
        validateTitle();
    });

    inputFullName.addEventListener('blur', event =>{
        validateFullName();
        showMessage();
    });
    
    inputStreetAddress.addEventListener('blur', event =>{
        validateStreetAddress();
        showMessage();
    });
    
    inputZipCode.addEventListener('blur', event =>{
        validateZipCode();
        showMessage();
    });
    
    inputPhoneNumber.addEventListener('blur', event =>{
        validatePhoneNumber();
    });
    
    inputEmail.addEventListener('blur', event =>{
        validateEmail();
    });
}


function setValueAssessment(){
    var hiddenInputAssessment = document.getElementById('assessment');
    hiddenInputAssessment.value = 'assessment';
}

function checkEmptyInputs(input){
    var noEmptyFields = false;    
    var div = input.closest('div');
    var error = div.querySelector('p');
    if (input.value == ""){
        error.style.display = "block";
        input.classList.add('inputWithError');
        noEmptyFields = false;
    } else if (input.value != ""){
        error.style.display = "none";
        input.classList.remove('inputWithError');
        noEmptyFields = true;
    }

    return noEmptyFields;
}

function checkValidations(){
    var allValideFields = false;   

    var validTitle = validateTitle();
    var validFullName = validateFullName();
    var valideStreetAdress = validateStreetAddress();
    var valideZipCode = validateZipCode();
    var validePhoneNumber = validatePhoneNumber();
    var valideEmail = validateEmail();

    if(validTitle && validFullName && valideStreetAdress && valideZipCode && validePhoneNumber && valideEmail){
        allValideFields = true;
    }
    return allValideFields
}

function validateTitle(){
    var isValideTitle = checkEmptyInputs(inputTitle);
    return isValideTitle;
}

function validateFullName(){
    checkEmptyInputs(inputFullName);
    var div = inputFullName.closest('div');
    var error = div.querySelector('p');
    var regex = /^([\w]{1,})+\s+([\w\s]{1,})+$/i
    if (!regex.test(inputFullName.value)){
        error.style.display = "block";
        inputFullName.classList.add('inputWithError');
        isFullNameOkForMessage = false;
        return false
    } else {
        error.style.display = "none";
        inputFullName.classList.remove('inputWithError');
        isFullNameOkForMessage = true;
        return true
    }    
}

function validateStreetAddress(){
    checkEmptyInputs(inputStreetAddress);
    var div = inputStreetAddress.closest('div');
    var error = div.querySelector('p');
    if (inputStreetAddress.value.length < 3){
        error.style.display = "block";
        inputStreetAddress.classList.add('inputWithError');
        isStreetAdressOkForMessage = false;
        return false
    } else {
        error.style.display = "none";
        inputStreetAddress.classList.remove('inputWithError');
        isStreetAdressOkForMessage = true;
        return true
    }    
}

function validateZipCode(){
    checkEmptyInputs(inputZipCode);
    var div = inputZipCode.closest('div');
    var error = div.querySelector('p');
    if (inputZipCode.value.length != 5){
        error.style.display = "block";
        inputZipCode.classList.add('inputWithError');
        isZipCodeOkForMessage = false;
        return false
    } else {
        error.style.display = "none";
        inputZipCode.classList.remove('inputWithError');
        isZipCodeOkForMessage = true;
        return true
    }
    
}

function validatePhoneNumber(){
    checkEmptyInputs(inputPhoneNumber);
    var div = inputPhoneNumber.closest('div');
    var error = div.querySelector('p');
    var regex = /^[0-9]*$/gm;
    var regexTest = regex.test(inputPhoneNumber.value)
    if (!regexTest || inputPhoneNumber.value == "" || inputPhoneNumber.value.toString().length < 10 || inputPhoneNumber.value.toString().length > 11){
        error.style.display = "block";
        inputPhoneNumber.classList.add('inputWithError');
        return false
    } else {
        error.style.display = "none";
        inputPhoneNumber.classList.remove('inputWithError');
        return true
    }    
}

function validateEmail(){
    checkEmptyInputs(inputEmail);
    var div = inputEmail.closest('div');
    var error = div.querySelector('p');
    var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regex.test(inputEmail.value)){
        error.style.display = "block";
        inputEmail.classList.add('inputWithError');
        return false
    } else {
        error.style.display = "none";
        inputEmail.classList.remove('inputWithError');
        return true
    }    
}

function showMessage(){
    if (isFullNameOkForMessage && isStreetAdressOkForMessage && isZipCodeOkForMessage){
        loadingDiv.style.display = 'block';

        sendEmailButton.classList.remove('gradient');
        sendEmailButton.classList.add('buttonLoading');
        sendEmailButton.innerHTML = "";
        setTimeout(() => {
            loadingDiv.style.display = 'none';
            sendEmailButton.classList.remove('buttonLoading');
            sendEmailButton.classList.add('gradient');
            sendEmailButton.innerHTML = "Send Email";
            recipientsTopText.style.display = 'block';
            emailClosingDiv.innerHTML = `
                Regards, <br>
                ${inputFullName.value}<br>
                ${inputStreetAddress.value}
            `
        }, 2000);  
    }
}

function toggleRecipients(){    
    if (recipientsDetailDiv.style.display == 'block'){
        recipientsDetailDiv.style.display = 'none';
    } else if (recipientsDetailDiv.style.display == 'none' || recipientsDetailDiv.style.display == ''){
        recipientsDetailDiv.style.display = 'block';
    }
    changeTopText();
}

function changeTopText() {
    if (recipientsTopText.innerHTML.includes('minimize')){
        recipientsTopText.innerHTML = `
        <p>Dear Sen. Gillibrand <span id="expandRecipients" onclick="toggleRecipients()">(and 1 other)</span>,</p>
        `;
        
    } else if (recipientsTopText.innerHTML.includes('other')){
        recipientsTopText.innerHTML = `
        <p>Sending to: <span id="minimizeRecipients" onclick="toggleRecipients()">(minimize)</span></p>
    `;
    }    
}

function sendForm(){
    mainDiv.style.textAlign = "center";
    mainDiv.innerHTML = `
        <b>Please encourage others to act by sharing on social media.</b>
        <br><br><br><br>
        <img id="emoji" class="bounce" src="https://d2r7nnfg2zsagj.cloudfront.net/img/emojis/party_popper.png?v=1614717852" alt="Celebrating emoji"></img>
    `
}



