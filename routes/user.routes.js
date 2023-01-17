const router = require("express").Router();
const authController = require("../controllers/auth.controller");

const userController = require("../controllers/user.controller");

router.post("/register", authController.singUp);

router.get("/", userController.getAllUsers);

router.get("/:id", userController.userInfo);

router.put("/:id", userController.updateUser);

router.delete("/:id", userController.deleteUser);

router.patch("/follow/:id", userController.follow);

router.patch("/unfollow/:id", userController.unfollow);

module.exports = router;
