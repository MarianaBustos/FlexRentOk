const connection = require("../config/db");

class adminController {
  //1.- Trae todos los datos de todos los usuarios
  //localhost:4000/admin/getAllUsers

  getAllUsers = (req, res) => {
    let sql = "SELECT * FROM user ";
    connection.query(sql, (error, result) => {
      if (error) {
        res.status(400).json({ error });
      }
      res.status(200).json(result);
    });
  };

  //-------------------------------------------------
  // 2.- desahibilita un usuario de manera lógica
  //localhost:4000/admin/disableUser/:userId

  disableUser = (req, res) => {
    console.log(req.params);

    let { id } = req.params;
    console.log(id);
    let sql = `UPDATE user SET is_deleted_user = 1 WHERE user_id = "${id}"`;
    let sql2 = "SELECT * from user";

    connection.query(sql, (error, result) => {
      if (error) throw error;
      console.log(error);
    });
    connection.query(sql2, (error, resultUsers) => {
      error
        ? res.status(400).json({ error })
        : res.status(200).json(resultUsers);
    });
  };
  //-------------------------------------------------
  // 3.- habilita un usuario de manera lógica
  //localhost:4000/admin/enableUser/:userId

  enableUser = (req, res) => {
    console.log("********************ESTOY EN EL CONTROLER DISABLE**********");
    console.log(req.params);

    let { id } = req.params;
    console.log(id);
    let sql = `UPDATE user SET is_deleted_user = 0 WHERE user_id = "${id}"`;
    let sql2 = "SELECT * from user";

    connection.query(sql, (error, result) => {
      if (error) throw error;
      console.log(error);
    });
    connection.query(sql2, (error, resultUsers) => {
      error
        ? res.status(400).json({ error })
        : res.status(200).json(resultUsers);
    });
  };

  //-------------------------------------------------
  // 4.- Busqueda de clientes por nombre

  searchUser = (req, res) => {
    let { letter } = req.params;

    let sql = `SELECT * FROM user WHERE name LIKE '%${letter}%' OR last_name LIKE '%${letter}%'`;

    connection.query(sql, (error, result) => {
      if (error) throw error;
      console.log(error);
    });
  };
}
module.exports = new adminController();
