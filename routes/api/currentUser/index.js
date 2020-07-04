// routes.api.currentUser.index.js

const router = require("express").Router();
const passport = require("passport");
const usersController = require("../../../controllers/usersController");

// @route GET api/users/currentUser
// @desc Return current user
// @access Private
router
    .route("/")
    .get(
        passport.authenticate("jwt", { session: false }),
        usersController.currentUser
    )

module.exports = router;
