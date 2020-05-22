(function loginView() {

    let invalidLoginEmail = false;
    let invalidLoginPassword = false;


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

    function loginClick() {
        const loginBtn = getElement('#loginBtn');
        const emailInput = getElement('#loginEmail').value;
        const passwordInput = getElement('#loginPassword').value;
        if (emailInput === '' || passwordInput === '') {
            getElement('#emptyLoginInfoError').classList.remove('d-none');

        } else {
            getElement('#emptyLoginInfoError').classList.add('d-none');
            loginProcess(emailInput, passwordInput);
        }
        loginBtn.removeEventListener('click', loginClick);
    }
    getElement('#loginBtn').addEventListener('mouseover', function () {
        const loginBtn = getElement('#loginBtn');
        loginBtn.classList.remove('disabled');
        loginBtn.classList.remove('cursor-default');

        if (invalidLoginPassword || invalidLoginEmail) {
            loginBtn.classList.add('disabled');
            loginBtn.classList.add('cursor-default');
        } else {
            loginBtn.addEventListener('click', loginClick);
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
})();