// controllers.userControls.registerUser.js

const db = require("../../models");
const bcrypt = require("bcryptjs");

// Load input validation
const validateRegisterInput = require("../../validation/register");


function registerUser(req, res) {

    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    db.User
        .findOne(
            {
                email: req.body.email
            }
        )
        .then(user => {
            if (user) {
                return res.status(400).json(
                    {
                        email: "Email already exists"
                    }
                );
            }
            const newUser = new db.User(
                {
                    role: "user",
                    info: {
                        userName: req.body.userName,
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        email: req.body.email,
                        password: req.body.password
                    }
                }
            );

            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.info.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.info.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        })
}

module.exports = registerUser;
