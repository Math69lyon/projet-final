const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')

const validRegistrationInput = require ('../validation/registration');
const validConnectionInput = require('../validation/connection');

router.route('/registration')
    .post((req, res) => {
        const { isValid, errors } = validRegistrationInput(req.body)

        if (!isValid) {
            return res.status(404).json(errors)
        }

        User.findOne({ email: req.body.email })
            .then(user => {
                if (user) {
                    errors.email = 'This email is already exist'
                    return res.status(404).json(errors)
                }

                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(req.body.password, salt, function (err, hash) {
                        const newUser = new User({
                            login: req.body.login,
                            email: req.body.email,
                            password: hash
                        })

                        newUser.save()
                            .then(newUser => res.json(newUser))
                            .catch(err => console.log(err))
                    })
                })
            })
})

router.route('/connection')
    .post((req, res) => {
        const { errors, isValid } = validConnectionInput(req.body)

        if (!isValid) {
            return res.status(404).json(errors)
        }

        User.findOne({ login: req.body.login })
            .then(user => {
                if (user) {
                    bcrypt.compare(req.body.password, user.password)
                    .then(isMatch => {
                        if (isMatch) {
                            const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: '1d' }, function (err, token) {
                                return res.json({
                                    success: true,
                                    token: token
                                })
                            })
                        } else {
                            errors.password = 'Password is incorrect'
                            return res.status(404).json(errors)
                        }
                    })
                } else {
                    errors.login = 'User not found'
                    return res.status(404).json(errors)
                }
            })
})

router.route('/')
    .get( passport.authenticate('jwt', { session: false }),(req, res) => {
        res.json({
            _id: req.user._id,
            login: req.user.login,
            email: req.user.email
        })
})

router.route('/search')
    .post((req, res) => {
        User.findOne({
            $or: [
                {email: req.body.text},
                {login: req.body.text}
            ]
        })
        .then(user => res.json({ userId: user._id }))
        .catch(err => res.status(404).json({ msg: 'Not found'}))
})

module.exports = router