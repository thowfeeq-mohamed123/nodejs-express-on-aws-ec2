const is = require('is_js');
const bcrypt = require('bcrypt');
const { validate } = require('micro-validator').default;
const { userModel } = require('../models/user');
const userValidations = require('../validations/user');

module.exports.getAllUsers = async (req, res) => {
    try {
        const usersList = await userModel.find();
        if (usersList && usersList.length > 0) {
            return res.status(200).json({ message: usersList });
        } else {
            return res.status(400).json({ errors: 'Users not found' })
        }
    } catch (err) {
        console.log(err)
    }
}


const saltRounds = 10
const generatePassword = (rawPassword = '') =>
    new Promise(
        (resolve, reject) => {
            bcrypt.hash(rawPassword, saltRounds, function (err, hash) {
                if (err) {
                    reject(err)
                }
                resolve(hash)
            })
        }
    )

module.exports.saveUsers = async (req, res) => {
    const validationErrors = validate(userValidations, req.body);
    if (!is.empty(validationErrors)) {
        return res.status(404).json({ errors: validationErrors })
    }

    try {
        const record = await userModel.find({ email: req.body.email })

        // If exist
        if (record.length) {
            res.status(404).json({
                errors: {
                    duplicate: ['User with this email id already exist']
                }
            })

            throw new Error('User with this email id already exist')
        }

        await generatePassword(req.body.password).then(data => {
            const hashedPassword = data;
            if (hashedPassword) {
                const User = new userModel({ ...req.body, password: hashedPassword })

                User
                    .save()
                    .then(() => {
                        res.status(200).json({ message: 'User created successfully' })
                    })
                    .catch(err => {
                        res.status(404).json({ message: 'Something went wrong. Unable to create user' })
                    })
            } else {
                res.status(404).json({ message: 'Something went wrong. Unable to create user' })
            }
        })
    } catch (err) {
        console.log(err)
    }
};