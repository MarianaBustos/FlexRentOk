const connection = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class userController {
  //pueba
  // checkmail = (req, res) => {
  //   let { email } = req.body;

  //   let sqlUser = `SELECT * FROM user WHERE email = ${email} and is_deleted = 0`;

  //   connection.query(sqlUser, (error, result) => {
  //     if (error) {
  //       res.status(400).json({ error });
  //     }
  //   });
  // };

  //1.Crear usuario
  //localhost:4000/users/createUser

  createUser = (req, res) => {
    const { name, last_name, dni, birth_date, email, password } = req.body;

    let saltRounds = 8;
    bcrypt.genSalt(saltRounds, function (err, saltRounds) {
      bcrypt.hash(password, saltRounds, function (err, hash) {
        let sql = `INSERT INTO user (name, last_name, dni, birth_date, phone_number, email, password, about) VALUES ( '${name}','${last_name}','${dni}', '${birth_date}', "", '${email}', '${hash}', "" )`;

        connection.query(sql, (error, result) => {
          console.log(error);
          console.log(result);
          error
            ? res.status(400).json({ error })
            : res.status(201).json(result);
        });
      });
    });
  };

  //-------------------------------------------------
  //2.- Login
  //localhost:4000/users/login
  login = (req, res) => {
    let { email, password } = req.body;
    console.log(req.body);
    let sql = `SELECT * FROM user WHERE email = '${email}'`;

    connection.query(sql, (error, result) => {
      console.log(result);
      // console.log(result[0].is_deleted, "==========result===============");
      //   //en caso de error en la consulta
      if (error) return res.status(400).json(error);

      //   //en caso de no encontrar un user con dicho user_name o mail.
      if (!result || !result.length || result[0].is_deleted == 1) {
        res.status(401).json("Usuario no registrado");
      } else {
        //     //en caso de que el mail o user_name SEA correcto
        //     //aqui lo estamos haciendo con el mail
        const [user] = result;
        //  const user = result[0]
        const hash = user.password;

        //     //capturo el user_id
        const user_id = user.user_id;

        //     //comparamos contraseñas
        bcrypt.compare(password, hash, (error, response) => {
          if (error) return res.status(400).json(error);
          //si las contraseñas coinciden
          if (response === true) {
            const token = jwt.sign(
              {
                user: {
                  email: user.email,
                  name: user.name,
                  last_name: user.last_name,
                  user_id: user_id,
                  category: user.category,
                  profile_photo: user.profile_photo,
                },
              },
              process.env.SECRET,
              { expiresIn: "10d" }
            );
            res.status(200).json({ token, user: result[0] });
            //si las contraseñas no coinciden
          } else {
            res.status(401).json("Usuario y contraseña incorrectos");
          }
        });
      }
    });
  };

  //---------------------------------------------------
  //3.- Trae la información de un usuario
  //localhost:4000/users/oneUser/:user_id

  selectOneUser = (req, res) => {
    const user_id = req.params.user_id;

    let sqlUser = `SELECT * FROM user WHERE user_id = ${user_id} and is_deleted_user = 0`;
    let sqlProperty = `SELECT * FROM property WHERE user_id = ${user_id} and is_deleted = 0`;

    connection.query(sqlUser, (error, resultUser) => {
      if (error) {
        res.status(400).json({ error });
      } else {
        connection.query(sqlProperty, (error2, resultProperty) => {
          if (error2) {
            res.status(400).json({ error: error2 });
          } else {
            res.status(200).json({ resultUser, resultProperty });
          }
        });
      }
    });
  };

  //---------------------------------------------------

  /// 4.- Editar un usuario
  //localhost:4000/users/editUser/:userId
  editUser = (req, res) => {
    let user_id = req.params.user_id;
    console.log("esteeee eeesss ellll user_id", user_id);
    // console.log(req);
    console.log(JSON.parse(req.body.editUser));

    const {
      name,
      last_name,
      dni,
      birth_date,
      phone_number,
      occupation,
      about,
    } = JSON.parse(req.body.editUser);

    // // const { name, lastname, phone, address, email } = req.body;

    let img = "";

    let sql = `UPDATE user SET name = "${name}", last_name = "${last_name}", dni = "${dni}", birth_date = "${birth_date}", phone_number = "${phone_number}", occupation = "${occupation}", about = "${about}" WHERE user_id = "${user_id}"`;

    if (req.file != undefined) {
      img = req.file.filename;
      sql = `UPDATE user SET name = "${name}", last_name = "${last_name}", dni = "${dni}", birth_date = "${birth_date}", phone_number = "${phone_number}", occupation = "${occupation}", about = "${about}", profile_photo = "${img}" WHERE user_id = "${user_id}"`;
    }

    connection.query(sql, (error, result) => {
      if (error) console.log(error);
      error
        ? res.status(400).json({ error })
        : res.status(200).json({ result, img });
    });
  };

  //-----------------------------------------------
  // 5.- Eliminar un usuario de manera lógica
  //localhost:4000/users/deleteUser/:userId

  deleteUser = (req, res) => {
    let user_id = req.params.user_id;
    let sql = `UPDATE user SET is_deleted = 1 WHERE user_id = "${user_id}"`;
    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  //-----------------------------------------------
  // 6.- Trae la info de un usuario para editarlo
  //localhost:4000/users/editUser/:userId

  getEditOneUser = (req, res) => {
    console.log(req);
    let user_id = req.params.user_id;
    let sql = `SELECT * FROM user WHERE user_id = "${user_id}"`;
    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };
  //-----------------------------------------------
  // 7.- Trae la info de las bids de un  usuario junto a esa propiedad
  //localhost:4000/users/getUserBids/:userId

  getUserBids = (req, res) => {
    console.log(req);
    let user_id = req.params.user_id;
    let sql = `SELECT bid.*, property.*, photo.file_name, city.city_name, country.name AS country_name
    FROM bid
    JOIN property ON bid.property_id = property.property_id
    JOIN address ON property.property_id = address.property_id
    JOIN city ON address.city_id = city.city_id AND address.province_id = city.province_id AND address.state_id = city.state_id AND address.country_id = city.country_id
    JOIN country ON address.country_id = country.country_id
    JOIN (
        SELECT property_id, file_name
        FROM photo
        GROUP BY property_id
    ) AS photo ON property.property_id = photo.property_id
    WHERE bid.user_id = ${user_id}`;
    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };
}

module.exports = new userController();
