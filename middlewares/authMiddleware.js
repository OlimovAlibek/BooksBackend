const jwt = require("jsonwebtoken")


exports.authMiddleware = (req, res, next) => {


           const authHeader = req.headers.authorization

    if(!authHeader) {
        res.status(401).json({message: "Tokening bilan kel!"})
    }

    const token = authHeader.split(" ")[1]
    const decoded = jwt.verify(token, process.env.JWT_TOKEN)

    req.user = decoded
    next()
}

