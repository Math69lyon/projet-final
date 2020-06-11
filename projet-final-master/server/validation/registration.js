const Validator = require('validator')

module.exports = function (data) {
    let errors = {}

    //Login validator:
    if (!Validator.isLength(data.login, { min: 4, max: 20}))
    {
        errors.login = 'Login must between 4 and 20 characters'
    }
    if (Validator.isEmpty(data.login))
    {
        errors.login = 'Login is required'
    }

    //Email validator:
    if (!Validator.isEmail(data.email))
    {
        errors.email = 'Email is invalid'
    }
    if (Validator.isEmpty(data.email))
    {
        errors.email = 'Email is required'
    }

    //Password validator:
    if (!Validator.isLength(data.password, { min: 4, max: 20}))
    {
        errors.password = 'Password must between 4 and 20 characters'
    }
    if (Validator.isEmpty(data.password))
    {
        errors.password = 'Password is required'
    }

    //Password_confirm validator:
    if (!Validator.equals(data.password, data.password_confirm))
    {
        errors.password_confirm = 'Passwords must match'
    }
    if (Validator.isEmpty(data.password_confirm))
    {
        errors.password_confirm = 'Password confirm is required'
    }

    return { errors, isValid: Object.keys(errors).length === 0 }
}