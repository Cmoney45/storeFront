// controllers.usersController.js

module.exports = {

    // Control for registering a new user
    registerUser: require("./userControls/registerUser"),

    // Control for logging in a user
    loginUser: require("./userControls/loginUser"),

    //  Control for pulling the current user info
    currentUser: require("./userControls/currentUser"),

}
