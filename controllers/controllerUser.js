const User = require("../models/User")
const bcrypt = require("bcrypt")
const generateToken = require("../utils/generateToken")

const { loginSchema, registerSchema} = require("../validators/userValidator")

// exports.profile = async (req, res) => {

//     res.status(200).json({
//         message: "Protected profile",
//         user: req.user
//     })
// }

// exports.adminPanel = async (req, res) => {

//     res.status(200).json({
//         message: "Admin panel"
//     })

// }

exports.getUsers = async (req, res) => {
    const users = await User.find()
    res.json(users)
}

exports.profile = async (req, res) => {
    res.status(200).json({
        message: "Himoyalangan profile page",
        user: req.user
    })
}

exports.registerUser = async (req, res) => {
    try {
        const validation = registerSchema.safeParse(req.body)

        if(!validation.success) {
            res.status(400).json(validation.error)
        }

        const {ism, familiya, yosh, email, parol} = req.body

        const existingEmail = await User.findOne({email})

        if(existingEmail) {
            res.status(400).json({message: "Foydalanuvchi avval ro'yxatdan o'tgan!"})
        }

        const hashedPassword = await bcrypt.hash(parol, 10)

        const newUser =
            await User.create({
                ism,
                familiya,
                yosh,
                email,
                parol: hashedPassword
            })

        res.status(201).json({
            message: "Succesfully registered",
            user: newUser
        })

    } catch (error) {
        console.log(error)

        res.status(500).json(error.message)
    }
}

exports.loginUser = async (req, res) => {
    try {

        const validation = loginSchema.safeParse(req.body)

        if (!validation.success) {
            return res.status(400).json({
                message: validation.error.errors
            })
        }

        const { email, parol } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({
                message: "Bu email mavjud emas, registratsiya qiling!"
            })
        }

        const isMatch =
            await bcrypt.compare(parol, user.parol)

        if (!isMatch) {
            return res.status(401).json({
                message: "Login yoki parol xato!"
            })
        }


        const token = generateToken(user)

            res.status(200).json({
                message: "Login successful",
                token
            })

    } catch (error) {

        res.status(500).json({
            message: error.message
        })

    }
}

exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )

        if(!user) {
            res.status(404).json({message: "Bunday foydalanuvchi topilmadi!"})
        }

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message: "Xato databazaga yoki serverga bog'liq!"})
    }
}

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(
      req.params.id
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json({
      message: "User deleted"
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};