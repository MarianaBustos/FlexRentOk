var express = require("express");
var router = express.Router();
var adminController = require("../controllers/adminControllers");
//------------------------------------------
//1.- trae los datos de todos los usuarios..
//localhost:4000/admin/getAllUsers

router.get("/getAllUsers", adminController.getAllUsers);
//--------------------------------------------

//2.- deshabilita un usuario
//localhost:4000/admin/disableUser/:id

router.put("/disableUser/:id", adminController.disableUser);

//--------------------------------------------
//3.- habilita un usuario
//localhost:4000/admin/enableUser/:id

router.put("/enableUser/:id", adminController.enableUser);

//4.- Búsqueda de clientes por nombre
//localhost:4000/admin/searchUser
router.get("/searchUser", adminController.searchUser);

module.exports = router;
