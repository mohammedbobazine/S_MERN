const router = require("express").Router();
const authController = require("../controllers/auth.controller");

const userController = require("../controllers/user.controller");

//partie 1: authentif
router.post("/register", authController.singUp);

router.post("/login", authController.singIn);

router.get("/logout", authController.logout);

//partie 2:
router.get("/", userController.getAllUsers);

router.get("/:id", userController.userInfo);

router.put("/:id", userController.updateUser);

router.delete("/:id", userController.deleteUser);

router.patch("/follow/:id", userController.follow);

router.patch("/unfollow/:id", userController.unfollow);

module.exports = router;
