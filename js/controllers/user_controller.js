function createUserFromUI(fName, lName, email, phone, password) {
    user = new User();
    user.fName = fName;
    user.lName = lName;
    user.email = email;
    user.phone = phone;
    user.password = encode(password);

    storeUserInLocalStorage(user);
}