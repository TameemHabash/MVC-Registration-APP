let invalidLoginEmail = false;
let invalidLoginPassword = false;



function loginProcess() {
    user = isUserExist(getElement('#loginEmail').value.toLowerCase());

    if (!user) {
        getElement('#invalideEmailError').classList.remove('d-none');
    } else {
        getElement('#invalideEmailError').classList.add('d-none');
        const EncodedEnteredPassword = encode(getElement('#loginPassword').value);
        if (user.password !== EncodedEnteredPassword) {
            getElement('#invalidePasswordError').classList.remove('d-none');
        } else {
            activateUserSession(user);
            showTodoPage();
        }
    }
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

// getElement('#loginBtn').addEventListener('mouseover', function () {
//     if (invalidLoginPassword || invalidLoginEmail) {
//         getElement('#loginBtn').classList.add('disabled');
//     }
//     else {
//         getElement('#loginBtn').classList.remove('disabled');
//     }
// });

getElement('#loginBtn').addEventListener('mouseover', function () {
    const emailInput = getElement('#loginEmail').value;
    const passwordInput = getElement('#loginPassword').value;
    getElement('#loginBtn').classList.remove('disabled');
    getElement('#loginBtn').classList.remove('cursor-default');

    if (invalidLoginPassword || invalidLoginEmail) {
        getElement('#loginBtn').classList.add('disabled');
        getElement('#loginBtn').classList.add('cursor-default');
    } else {
        getElement('#loginBtn').addEventListener('click', function () {
            if (emailInput === '' || passwordInput === '') {
                getElement('#emptyLoginInfoError').classList.remove('d-none');

            } else {
                getElement('#emptyLoginInfoError').classList.add('d-none');
                loginProcess();
            }
        });
    }


});

getElement('#signupFromLoginBtn').addEventListener('click', showSignupPage);