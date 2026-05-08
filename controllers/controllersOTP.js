const transporter = require("../config/mail")

const storeOTP = {}

exports.sendOTP = async (req, res) => {
    try {
        const {email} = req.body

        if(!email) {
            res.status(400).json({message: "Email required!"})
        }

        const otp = Math.floor(Math.random() * 900000 + 100000)


        storeOTP[email] = otp

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "OTP xabarnoma",
            text: `Sening OTP: ${otp}`
        })

        res.status(200).json({message: "OTP yuborildi!"})

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

exports.verifyOTP = async (req, res) => {
    try {
        const {email, otp} = req.body

        if(!email || !otp) {
            res.status(400).json({message: "All fields are required"})
        }

        if(storeOTP[email] == otp) {
            delete storeOTP[email]

            res.status(200).json({message: "Tabriklaymiz, OTP muvaffaqqiyatli tasdiqlandi!"})
        }
        
    } catch (error) {
        res.status(500).json(error.message)
    }
}