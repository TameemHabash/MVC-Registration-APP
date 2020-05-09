let invalidSignupname = false;
let invalidSignupPhone = false;
let invalidSignupEmail = false;
let invalidSignupPassword = false;


getElement('#signupFname').addEventListener('focusout', function () {
    const fName = getElement('#signupFname').value;
    if (fName !== '') {
        if (fName.length < 3) {
            getElement('#FnameError').classList.remove('d-none');
            getElement('#signupFname').classList.add('border-error');
            invalidSignupname = true;
        }
        else {
            getElement('#FnameError').classList.add('d-none');
            getElement('#signupFname').classList.remove('border-error');
            invalidSignupname = false;
        }
    }
    else {
        getElement('#FnameError').classList.add('d-none');
        getElement('#signupFname').classList.remove('border-error');
    }
});
getElement('#signupLname').addEventListener('focusout', function () {
    const lName = getElement('#signupLname').value;
    if (lName !== '') {
        if (lName.length < 3) {
            getElement('#LnameError').classList.remove('d-none');
            getElement('#signupLname').classList.add('border-error');
            invalidSignupname = true;
        }
        else {
            getElement('#LnameError').classList.add('d-none');
            getElement('#signupLname').classList.remove('border-error');
            invalidSignupname = false;
        }
    }
    else {
        getElement('#LnameError').classList.add('d-none');
        getElement('#signupLname').classList.remove('border-error');
    }
});

getElement('#signupPhone').addEventListener('focusout', function () {
    const phone = getElement('#signupPhone').value;
    if (phone !== '') {
        if (!(phone.startsWith('07') && phone.length === 10)) {
            getElement('#signupPhone').classList.add('border-error');
            invalidSignupPhone = true;
        }
        else {
            getElement('#signupPhone').classList.remove('border-error');
            invalidSignupPhone = false;
        }
    }
    else {
        getElement('#signupPhone').classList.remove('border-error');
    }
});

getElement('#signupEmail').addEventListener("focusout", function () {
    const email = getElement('#signupEmail').value.toLowerCase();
    if (email !== '') {
        if (!(email.includes('@') && (email.endsWith('.com') || email.endsWith('.edu')))) {
            getElement('#signupEmail').classList.add('border-error');
            invalidSignupEmail = true;
        }
        else {
            getElement('#signupEmail').classList.remove('border-error');
            invalidSignupEmail = false;
        }
    }
    else {
        getElement('#signupEmail').classList.remove('border-error');
    }
});


getElement('#signupPassword1').addEventListener("focusout", function () {
    const password1 = getElement('#signupPassword1').value;

    if (password1 !== '') {
        if (password1.length < 6 || password1.length > 31) {
            Password1Error
            getElement('#Password1Error').classList.remove('d-none');
            getElement('#signupPassword1').classList.add('border-error');
            invalidSignupPassword = true;
        }
        else {
            getElement('#signupPassword1').classList.remove('border-error');
            getElement('#Password1Error').classList.add('d-none');
            invalidSignupPassword = false;
        }
    }
    else {
        getElement('#signupPassword1').classList.remove('border-error');
        getElement('#Password1Error').classList.add('d-none');
    }
});

getElement('#signupPassword2').addEventListener("focusout", function () {
    const password1 = getElement('#signupPassword1').value;
    const password2 = getElement('#signupPassword2').value;

    if (password2 !== '') {
        if (password1 !== password2) {
            getElement('#Password2NotMatchError').classList.remove('d-none');
            getElement('#signupPassword2').classList.add('border-error');
            invalidSignupPassword = true;
        }
        else {
            getElement('#signupPassword2').classList.remove('border-error');
            getElement('#Password2NotMatchError').classList.add('d-none');
            invalidSignupPassword = false;
        }
    }
    else {
        getElement('#signupPassword2').classList.remove('border-error');
        getElement('#Password2NotMatchError').classList.add('d-none');
    }
});

getElement('#signupBtn').addEventListener('mouseover', function () {
    const fName = getElement('#signupFname').value;
    const lName = getElement('#signupLname').value;
    const phone = getElement('#signupPhone').value;
    const email = getElement('#signupEmail').value.toLowerCase();
    const password = getElement('#signupPassword2').value;
    getElement('#signupBtn').classList.remove('disabled');
    getElement('#signupBtn').classList.remove('cursor-default');
    if (invalidSignupname || invalidSignupPhone || invalidSignupEmail || invalidSignupPassword) {
        getElement('#signupBtn').classList.add('disabled');
        getElement('#signupBtn').classList.add('cursor-default');
    }
    else {
        getElement('#signupBtn').addEventListener('click', function () {
            if (fName === '' || lName === '' || phone === '' || phone === '' || email === '' || password === '') {
                getElement('#fullInfoError').classList.remove('d-none');
            }
            else {
                getElement('#fullInfoError').classList.add('d-none');

                if (isUserExist(email)) {
                    getElement('#existAccountError').classList.remove('d-none');
                }
                else {
                    getElement('#existAccountError').classList.add('d-none');
                    createUserFromUI(fName, lName, email, phone, password);
                    getElement('#signup').innerHTML = '';
                    getElement('#signup').insertAdjacentHTML('beforeend', `<button id="loginToCreatedAccount" class="btn btn-info px-4 mb-5 mt-2">Login to your new account</button>`);
                    getElement('#loginToCreatedAccount').addEventListener('click', showLoginPage);
                }
            }
        });
    }


});

getElement('#loginFromSignup').addEventListener('click', showLoginPage);