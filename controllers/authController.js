const User = require("../models/User")
const authHelper = require("../helpers/authHelper")

const jwt = require("jsonwebtoken")

const registerController = async(req, res) => {
    try {
        const { name, email, password, phone, address } = req.body
            //validations
        if (!name) {
            return res.send({ error: "Name is Required" })
        }
        if (!email) {
            return res.send({ error: "Email is Required" })
        }
        if (!password) {
            return res.send({ error: "Password is Required" })
        }
        if (!phone) {
            return res.send({ error: "Phone no is Required" })
        }
        if (!address) {
            return res.send({ error: "Address is Required" })
        }

        //checking user
        const existingUser = await User.findOne({ email })

        //existing user
        if (existingUser) {
            return res.status(200).send({
                success: true,
                message: "Already registered please login",
            })
        }
        //register user
        const hashedPassword = await authHelper.hashPassword(password)
        const user = await new User({
            name,
            email,
            phone,
            address,
            password: hashedPassword,
        }).save()

        res.status(201).send({
            success: true,
            message: "User registered Successfully",
            user,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Registration",
            error,
        })
    }
}
const loginController = async(req, res) => {
    try {
        const { email, password } = req.body
            //validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid email or password",
            })
        }
        //check user
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registered",
            })
        }
        const match = await authHelper.comparePassword(password, user.password)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password",
            })
        }
        //token
        const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        })
        res.status(200).send({
            success: true,
            message: "Login Successfully",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
            },
            token,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Login",
            error,
        })
    }
}

module.exports = { registerController, loginController }