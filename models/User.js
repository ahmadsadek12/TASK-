const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const mongoosePaginate = require('mongoose-paginate-v2')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,

    },
    lastName: {
        type: String,

    },
    email: {
        type: String,

    },
    password: {
        type: String,

    },
    userType: {
        type: Number,

    },
    dateOfBirth: {
        type: String,

    },
    gender: {
        type: String,

    },
    pronouns: {
        type: String,
    },
    otherGender: {
        type: String,
    },
    country: {
        type: String,

    },
    phoneNumber: {
        type: String,
    },
    biography: {
        type: String,
    },
    location: {
        type: String,
    },
    experience: {
        type: Array,
    },
    user_bookmarks: {
        type: Array,
    },
    averageRating: {
        type: Number,
        default: 0,
    },
}, { timestamps: true })

// static signup method
userSchema.statics.register = async function (firstName, lastName, email, password, c_password, userType, dob, gender, otherGender, pronouns, country, phoneNumber) {

    // validation
    if (!email || !password || !firstName || !lastName) {
        throw Error('All fields must be filled');
    }
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }
    if (password !== c_password) {
        throw Error('Passwords must match')
    }

    if (password.length < 8) {
        throw Error('Passwords must be 8 or more characters long')
    }


    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('Email already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ firstName, lastName, email, password: hash, userType, dateOfBirth: dob, gender, otherGender: gender === 'Other' ? otherGender : '', pronouns, country, phoneNumber, biography: '', experience: [] })

    return user
}

// static login method
userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ email })

    const match = await bcrypt.compare(password, user.password)

    if (!user || !match) {
        throw Error('Incorrect email or password')
    }

    return user

}

userSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', userSchema)