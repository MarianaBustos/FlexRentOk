var express = require("express");
const userControllers = require("../controllers/userControllers");
var router = express.Router();
const multer = require("../middleware/multer");
const multerSingle = require("../middleware/multerSingle");
const verify = require("../middleware/verify");

//ruta base de usuarios es  http
//-----------------------------------------------------

//1.- createUser
//localhost:4000/users/createUser
router.post("/createUser", userControllers.createUser);
//-----------------------------------------------------
//2.-login
//localhost:4000/users/login
router.post("/login", userControllers.login);
//-----------------------------------------------------
//3.-Trae la información de un usuario
//localhost:4000/users/oneUser/:user_id
router.get("/oneUser/:user_id", userControllers.selectOneUser);
//-----------------------------------------------------
//4.-Editar un usuario
//localhost:4000/users/editUser/:userId
router.put(
  "/editUser/:user_id",
  multerSingle("user"),
  userControllers.editUser
);
//-----------------------------------------------------
//5.-Borrado lógico de un usuario
//localhost:4000/users/deleteUser/:userId
router.delete("/deleteUser/:user_id", userControllers.deleteUser);
//-----------------------------------------------------
//6.-Trae la información de un usuario para modificarla
//localhost:4000/users/editUser/:user_id
router.get("/getEditUser/:user_id", userControllers.getEditOneUser);
//-----------------------------------------------------
// 7.- Trae la info de las bids de un  usuario
//localhost:4000/users/getUserBids/:userId

router.get("/getUserBids/:user_id", userControllers.getUserBids);

module.exports = router;
