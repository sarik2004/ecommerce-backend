const { body } = require("express-validator");

const Validator = [
    body("name")
        .notEmpty()
        .withMessage("name is required"),

    body("email")
        .notEmpty()
        .withMessage("email is required"),

    body("password")
        .notEmpty()
        .isLength({ min: 8 })
        .withMessage("password must be at least 8 characters"),

    body("phone")
        .notEmpty()
        .withMessage("phone number is required"),
];

module.exports ={Validator};
