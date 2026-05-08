const express = require("express")
const router = express.Router()
const controllerUser = require("../controllers/controllerUser")
const {authMiddleware} = require("../middlewares/authMiddleware")

router.get(
    "/profile",
    authMiddleware,
    controllerUser.profile
)

router.get(
    "/users",
    controllerUser.getUsers
)

router.post(
    "/register",
    controllerUser.registerUser
)

router.post(
    "/login",
    controllerUser.loginUser
)

router.put(
    "/users/:id",
    controllerUser.updateUser
)

router.delete(
    "/users/:id",
    controllerUser.deleteUser
)



module.exports = router