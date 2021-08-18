const is = require('is_js');
const bcrypt = require('bcrypt');
const { validate } = require('micro-validator').default;
const { userModel } = require('../models/user');
const userValidations = require('../validations/user');
const { redisClient } = require('../config/config');

module.exports.getAllUsers = async (req, res) => {
    try {
        const usersList = await userModel.find();
        if (usersList && usersList.length > 0) {
            return res.status(200).json({ message: usersList });
        } else {
            return res.status(200).json({ message: [] })
        }
    } catch (err) {
        return err;
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
            return res.status(404).json({
                errors: {
                    duplicate: ['User with this email id already exist']
                }
            })
        }

        await generatePassword(req.body.password).then(data => {
            const hashedPassword = data;
            if (hashedPassword) {
                const User = new userModel({ ...req.body, password: hashedPassword })

                User
                    .save()
                    .then(() => {
                        return res.status(200).json({ message: 'User created successfully' })
                    })
                    .catch(err => {
                        return res.status(404).json({ message: 'Something went wrong. Unable to create user' })
                    })
            } else {
                return res.status(404).json({ message: 'Something went wrong. Unable to create user' })
            }
        })
    } catch (err) {
        console.log(err)
    }
};


module.exports.getRepos = async (req, res, next) => {
    try {
        console.log('Fetching Data...');

        const { userid } = req.params;

        const response = await userModel.findOne({ _id: userid });

        if(response._doc){
            
            const data = response._doc;
    
            // Set data to Redis
            redisClient.setex(userid, 3600, JSON.stringify(data));
    
            return res.send(data);
        }else{
           return res.status(500);
        }
        

    } catch (err) {
        console.error(err);
        res.status(500);
    }
}

// Cache middleware
module.exports.cache = async (req, res, next) => {
    const { userid } = req.params;

    redisClient.get(userid, (err, data) => {
        if (err) throw err;

        if (data !== null) {
           return res.send(JSON.parse(data));
        } else {
            next();
        }
    });
}