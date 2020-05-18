function checkUserData(emailInput, passwordInput) {
    const validity = {
        existEmail: false,
        rightPassword: false,
        user: false
    };
    validity.user = isUserExist(emailInput.toLowerCase());
    if (!validity.user) {
        return validity;
    } else {
        validity.existEmail = true;
        const EncodedEnteredPassword = encode(passwordInput);
        if (validity.user.password !== EncodedEnteredPassword) {
            return validity;
        } else {
            validity.rightPassword = true;
            return validity;
        }
    }
}
