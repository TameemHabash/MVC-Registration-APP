
let invalidLoginEmail = false;
let invalidLoginPassword = false;



function showLoginPage() {
    getElement('#loginEmail').value = '';
    getElement('#loginPassword').value = '';

    getElement('#emptyLoginInfoError').classList.add('d-none');
    getElement('#invalideEmailError').classList.add('d-none');
    getElement('#invalidePasswordError').classList.add('d-none');


    getElement('#loginPage').classList.remove('d-none');
    getElement('#signupPage').classList.add('d-none');
    getElement('#todoPage').classList.add('d-none');

}

getElement('#loginEmail').addEventListener("focusout", function () {
    const input = getElement('#loginEmail').value.toLowerCase();
    if (input !== '') {
        if (!(input.includes('@') && (input.endsWith('.com') || input.endsWith('.edu')))) {
            getElement('#loginEmail').classList.add('border-error');
            invalidLoginEmail = true;
        } else {
            getElement('#loginEmail').classList.remove('border-error');
            invalidLoginEmail = false;
        }
    } else {
        getElement('#loginEmail').classList.remove('border-error');
    }
});

getElement('#loginPassword').addEventListener("focusout", function () {
    const input = getElement('#loginPassword').value;
    if (input !== '') {
        if (input.length < 6) {
            getElement('#loginPassword').classList.add('border-error');
            invalidLoginPassword = true;
        } else {
            getElement('#loginPassword').classList.remove('border-error');
            invalidLoginPassword = false;
        }
    } else {
        getElement('#loginPassword').classList.remove('border-error');
    }
});

getElement('#loginBtn').addEventListener('mouseover', function () {
    if (invalidLoginPassword || invalidLoginEmail) {
        getElement('#loginBtn').classList.add('disabled');
    }
    else {
        getElement('#loginBtn').classList.remove('disabled');
    }
});
function loginClick() {
    const emailInput = getElement('#loginEmail').value;
    const passwordInput = getElement('#loginPassword').value;
    if (emailInput === '' || passwordInput === '') {
        getElement('#emptyLoginInfoError').classList.remove('d-none');

    } else {
        getElement('#emptyLoginInfoError').classList.add('d-none');
        loginProcess(emailInput, passwordInput);
    }
    getElement('#loginBtn').removeEventListener('click', loginClick);
}
getElement('#loginBtn').addEventListener('mouseover', function () {
    getElement('#loginBtn').classList.remove('disabled');
    getElement('#loginBtn').classList.remove('cursor-default');

    if (invalidLoginPassword || invalidLoginEmail) {
        getElement('#loginBtn').classList.add('disabled');
        getElement('#loginBtn').classList.add('cursor-default');
    } else {
        getElement('#loginBtn').addEventListener('click', loginClick);
    }


});


getElement('#signupFromLoginBtn').addEventListener('click', showSignupPage);

function showInvalideEmailError() {
    getElement('#invalideEmailError').classList.remove('d-none');
}
function hideInvalideEmailError() {
    getElement('#invalideEmailError').classList.add('d-none');
}
function showInvalidePasswordError() {
    getElement('#invalidePasswordError').classList.remove('d-none');
}