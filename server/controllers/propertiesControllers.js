const connection = require("../config/db.js");

class propertiesController {
  //1.- createProperty1
  //Crear una propiedad en la tabla Property
  //localhost:4000/properties/createProperty1/:user_id
  createProperty1 = (req, res) => {
    const user_id = req.params.user_id;
    const { name, description, price_night } = req.body;

    let sql = `INSERT INTO property (name, description, price_night, user_id, is_deleted) VALUES ('${name}', '${description}', '${price_night}', '${user_id}', 1)`;

    connection.query(sql, (error, result) => {
      if (error) {
        res.status(400).json({ error });
      } else {
        res.status(200).json({ message: "Property created successfully" });
        console.log(res);
      }
    });
  };

  //-------------------------------------------------

  //2.- createProperty2
  // Crear la info de property_info
  //localhost:4000/properties/createProperty2/:property_id
  createProperty2 = (req, res) => {
    const property_id = req.params.property_id;
    const {
      property_type,
      num_guest,
      num_bedroom,
      num_bathroom,
      num_bed_big_size,
      num_bed_small_size,
    } = req.body.regProperty2;
    const { pool, green_zone, garage, wifi, tv, gym, wash_machine } =
      req.body.formData;
    console.log(req.body, "bodyyyyyyyy");

    const poolValue = pool ? pool : 0;
    const greenZoneValue = green_zone ? green_zone : 0;
    const garageValue = garage ? garage : 0;
    const wifiValue = wifi ? wifi : 0;
    const tvValue = tv ? tv : 0;
    const gymValue = gym ? gym : 0;
    const washMachineValue = wash_machine ? wash_machine : 0;

    let sql = `INSERT INTO property_info (property_id, property_type, num_guest, num_bedroom, num_bathroom, num_bed_big_size, num_bed_small_size, pool, green_zone, garage, wifi, tv, gym, wash_machine, num_sofa_bed) VALUES ('${property_id}','${property_type}', '${num_guest}', '${num_bedroom}', '${num_bathroom}', '${num_bed_big_size}', '${num_bed_small_size}', '${poolValue}', '${greenZoneValue}', '${garageValue}', '${wifiValue}', '${tvValue}', '${gymValue}', '${washMachineValue}', 0)`;

    connection.query(sql, (error, result) => {
      if (error) {
        res.status(400).json({ error });
      } else {
        res.status(200).json({ message: "Property created successfully" });
      }
    });
  };

  //-------------------------------------------------
  //3.- createProperty3
  // Crear la info de address
  //localhost:4000/properties/createProperty3/:property_id
  createProperty3 = (req, res) => {
    const property_id = req.params.property_id;
    const { street, floor } = req.body.regProperty3;
    const stateId = req.body.idState;
    const idProvince = req.body.idProvince;
    const idCity = req.body.idCity;

    let sql = `INSERT INTO address (property_id, country_id, street, floor, state_id, province_id, city_id) VALUES ('${property_id}', 1 ,'${street}', '${floor}', '${stateId}', '${idProvince}' , '${idCity}')`;

    connection.query(sql, (error, result) => {
      if (error) {
        res.status(400).json({ error });
      } else {
        res.status(200).json({ message: "Property created successfully" });
      }
    });
    console.log(req.body);
  };
  //-------------------------------------------------

  //4.- getPropertyId
  //Rescata el property_id
  //localhost:4000/properties/getPropertyId/:user_id

  getPropertyId = (req, res) => {
    const user_id = req.params.user_id;

    let sql = `SELECT property.property_id FROM property WHERE user_id = ${user_id} and is_deleted = 1`;

    connection.query(sql, (error, result) => {
      if (error) {
        res.status(400).json({ error: error });
      } else {
        res.status(200).json({ result });
      }
    });
  };

  //-------------------------------------------------

  //5.- createProperty4
  // Crear la info de photo
  //localhost:4000/properties/createProperty4/:property_id
  createProperty4 = (req, res) => {
    const { property_id } = req.params;
    let img = req.files || []; // Obtén los archivos enviados en la solicitud

    if (req.files != undefined) {
      img = req.files;
      console.log("********************img", img);
      console.log("*********************req.files", req.files);
    }

    this.saveImages(img, property_id); // Guarda las imágenes

    res.status(200).json({ message: "Imágenes guardadas exitosamente" });
  };

  // Función para guardar las imágenes
  saveImages = (images, property_id) => {
    images.forEach((img) => {
      let sql = `INSERT INTO photo (property_id, file_name) VALUES (${property_id},'${img.filename}' )`;
      connection.query(sql, (error, result) => {
        if (error) {
          console.log(error);
        } else {
          console.log(result);
        }
      });
    });
  };

  //-------------------------------------------------

  //6.- publishProperty
  //localhost:4000/properties/publishProperty/:property_id
  // Publica (para a is_deleted 0 la propiedad cuando decide publicarda)
  publishProperty = (req, res) => {
    let property_id = req.params.property_id;

    let sql = `UPDATE property SET is_deleted = 0 where property_id = ${property_id};`;

    connection.query(sql, (error, result) => {
      if (error) console.log(error);
      error
        ? res.status(400).json({ error })
        : res.status(200).json({ result });
    });
  };

  //-------------------------------------------------

  //7.- getAllState
  // buscar todos los states de España
  //localhost:4000/properties/getAllState
  getAllState = (req, res) => {
    let sql = "SELECT * FROM state";

    connection.query(sql, (error, resultState) => {
      if (error) {
        res.status(400).json({ error: error });
      } else {
        res.status(200).json({ resultState });
      }
    });
  };

  //-------------------------------------------------

  //8.- getAllProvince
  // buscar todos las province de España
  //localhost:4000/properties/getAllProvince/:state_id
  getAllProvince = (req, res) => {
    let state_id = req.params.state_id;

    let sql = `SELECT * FROM province WHERE state_id = ${state_id}`;

    connection.query(sql, (error, resultProv) => {
      if (error) {
        res.status(400).json({ error: error });
      } else {
        res.status(200).json({ resultProv });
      }
    });
  };

  //-------------------------------------------------

  //9.- getAllCity
  // buscar todos las city de España
  //localhost:4000/properties/getAllCity/:province_id
  getAllCity = (req, res) => {
    let province_id = req.params.province_id;

    let sql = `SELECT * FROM city WHERE province_id = ${province_id}`;

    connection.query(sql, (error, resultCity) => {
      if (error) {
        res.status(400).json({ error: error });
      } else {
        res.status(200).json({ resultCity });
      }
    });
  };

  //-------------------------------------------------

  //10.- getPropertyPhotos2
  //Trae todas las fotos de una propiedad
  //localhost:4000/properties/getPropertyPhotos2/:property_id
  getPropertyPhotos2 = (req, res) => {
    const property_id = req.params.property_id;
    let sql = `SELECT * from photo WHERE
  property_id = '${property_id}';`;

    connection.query(sql, (error, resultPhoto) => {
      error
        ? res.status(400).json({ error })
        : res.status(200).json(resultPhoto);
    });
  };

  //-------------------------------------------------

  //11.- deleteProperty
  //Borrado lógico de una propiedad
  //localhost:4000/properties/delProperty/:property_id
  deleteProperty = (req, res) => {
    const property_id = req.params.property_id;
    let sql = `UPDATE property SET is_deleted = 1 WHERE property_id = ${property_id}`;
    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  //-------------------------------------------------

  //12. getInfoProperty
  //Trae toda la info de una propiedad
  //localhost:4000/properties/getInfoProperty/:property_id

  getInfoProperty = (req, res) => {
    const property_id = req.params.property_id;
    let sql = `SELECT
    user.name AS user_name,
    property.name AS property_name,
    user.about,
    user.user_id,
    user.profile_photo,
    property.*,
    photo.*,
    property_info.*,
    address.*,
    city.city_name,
    available_booking.*
  FROM
    property
    LEFT JOIN photo ON property.property_id = photo.property_id
    LEFT JOIN property_info ON property.property_id = property_info.property_id
    LEFT JOIN address ON property.property_id = address.property_id
    LEFT JOIN city ON address.country_id = city.country_id
      AND address.state_id = city.state_id
      AND address.province_id = city.province_id
      AND address.city_id = city.city_id
    LEFT JOIN user ON property.user_id = user.user_id
    LEFT JOIN available_booking ON property.property_id = available_booking.property_id
  WHERE
    property.property_id = '${property_id}';`;

    // AGREGAR Y QUE IS-DELETED sea 0

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  //-------------------------------------------------

  //13- editProperty1
  //Editar propiedad
  //localhost:4000/properties/editProperty/:property_id
  editProperty1 = (req, res) => {
    let property_id = req.params.property_id;
    const { name, description, price_night } = req.body;
    console.log(req.body);

    let sql = `UPDATE property SET name = '${name}',
  description = '${description}',
  price_night = '${price_night}'
  WHERE property_id = '${property_id}';`;

    connection.query(sql, (error, resultado) => {
      error ? res.status(400).json({ error }) : res.status(200).json(resultado);
    });
  };

  //-------------------------------------------------

  //14- editProperty2
  //Editar propiedad
  //localhost:4000/properties/editProperty2/:property_id
  editProperty2 = (req, res) => {
    const property_id = req.params.property_id;
    console.log(req.body, "aca bodyyyyyyyy");
    const {
      property_type,
      num_guest,
      num_bedroom,
      num_bathroom,
      num_bed_big_size,
      num_bed_small_size,
    } = req.body.regProperty2;
    const { pool, green_zone, garage, wifi, tv, gym, wash_machine } =
      req.body.formData;
    console.log(req.body, "bodyyyyyyyy");

    const poolValue = pool ? pool : 0;
    const greenZoneValue = green_zone ? green_zone : 0;
    const garageValue = garage ? garage : 0;
    const wifiValue = wifi ? wifi : 0;
    const tvValue = tv ? tv : 0;
    const gymValue = gym ? gym : 0;
    const washMachineValue = wash_machine ? wash_machine : 0;

    let sql = `UPDATE property_info SET 
  property_type = '${property_type}',
  num_guest = '${num_guest}',
  num_bedroom = '${num_bedroom}',
  num_bathroom = '${num_bathroom}',
  num_bed_big_size = '${num_bed_big_size}',
  num_bed_small_size = '${num_bed_small_size}',
  pool = '${poolValue}',
  green_zone = '${greenZoneValue}',
  garage = '${garageValue}',
  wifi = '${wifiValue}',
  tv = '${tvValue}',
  gym = '${gymValue}',
  wash_machine = '${washMachineValue}'
  WHERE property_id = '${property_id}'`;

    connection.query(sql, (error, resultado) => {
      error ? res.status(400).json({ error }) : res.status(200).json(resultado);
    });
  };
  //

  //-------------------------------------------------

  //15- editProperty3
  //Editar fotos de la propiedad
  //localhost:4000/properties/editProperty3/:property_id
  editProperty3 = (req, res) => {};

  //-------------------------------------------------

  //16- viewAllBids
  //Ver las pujas de esa propiedad
  //localhost:4000/properties/viewAllBids/:property_id
  viewAllBids = (req, res) => {
    let property_id = req.params.property_id;

    let sql = `SELECT * FROM bid 
    WHERE property_id = '${property_id}'AND check_in_date >= CURDATE()`;

    connection.query(sql, (error, resultado) => {
      error ? res.status(400).json({ error }) : res.status(200).json(resultado);
    });
  };

  //-------------------------------------------------

  //17 -searchProperty
  //localhost:4000/properties/searchProperty/:city_name/:start_date/:num_guest

  searchProperty = (req, res) => {
    let sql = `SELECT
    p.property_id,
    a.street,
    a.floor,
    c.city_name,
    pr.name AS province_name,
    co.name AS country_name,
    ab.start_date AS available_start_date,
    p.price_night,
    ph.img AS photo,
    pi.num_guest
  FROM
    property p
    JOIN address a ON p.property_id = a.property_id
    JOIN city c ON a.country_id = c.country_id
        AND a.state_id = c.state_id
        AND a.province_id = c.province_id
        AND a.city_id = c.city_id
    JOIN province pr ON c.country_id = pr.country_id
        AND c.state_id = pr.state_id
        AND c.province_id = pr.province_id
    JOIN country co ON pr.country_id = co.country_id
    JOIN available_booking ab ON p.property_id = ab.property_id
    JOIN photo ph ON p.property_id = ph.property_id
    JOIN property_info pi ON p.property_id = pi.property_id
  WHERE
    ab.start_date >= '${start_date}' 
    AND pi.num_guest >= '${num_guest}'
  ;`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
      console.log(result);
    });
  };

  //-------------------------------------------------

  //18-viewAllProperties
  //Vista de todos los inmuebles
  //localhost:4000/properties/viewAllProperties

  viewAllProperties = (req, res) => {
    let sql = `SELECT *
    FROM (
      SELECT
        p.property_id,
        a.street,
        a.floor,
        c.city_name,
        pr.name AS province_name,
        co.name AS country_name,
        DATE_FORMAT(ab.start_date, '%Y-%m-%d') AS available_start_date,
        DATE_FORMAT(ab.end_date, '%Y-%m-%d') AS available_end_date,
        p.price_night,
        ph.file_name,
        pi.num_guest,
        ROW_NUMBER() OVER (PARTITION BY p.property_id ORDER BY ph.photo_id) AS rn
      FROM
        property p
        JOIN address a ON p.property_id = a.property_id
        JOIN city c ON a.country_id = c.country_id
          AND a.state_id = c.state_id
          AND a.province_id = c.province_id
          AND a.city_id = c.city_id
        JOIN province pr ON c.country_id = pr.country_id
          AND c.state_id = pr.state_id
          AND c.province_id = pr.province_id
        JOIN country co ON pr.country_id = co.country_id
        JOIN available_booking ab ON p.property_id = ab.property_id
        JOIN photo ph ON p.property_id = ph.property_id
        JOIN property_info pi ON p.property_id = pi.property_id
      WHERE p.is_deleted = 0
    ) AS subquery
    WHERE rn = 1;
      `;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
      console.log(result);
    });
  };

  //-------------------------------------------------

  //19- createAvailability
  //crea disponibilidad a una casa
  //localhost:4000/createAvailability/:property_id
  createAvailability = (req, res) => {
    let property_id = req.params.property_id;
    const { start_date, end_date } = req.body;
    console.log(req.body);
    console.log(req.params);

    let sql = `INSERT INTO available_booking (property_id, start_date, end_date) VALUES ('${property_id}','${start_date}','${end_date}')`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  //-------------------------------------------------

  // 20 - Borrado lógico de una imagen
  //localhost:4000/properties/delPhoto/:photo_id"
  delPhoto = (req, res) => {
    const photo_id = req.params.property_id;
    console.log(req.params);
    let sql = `delete from photo where photo_id = ${photo_id}`;
    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
      console.log(photo_id);
    });
  };

  //-------------------------------------------------

  //21- Busqueda inmueble por ciudad
  //localhost:4000/properties/search/:city_name
  search = (req, res) => {
    const city_name = req.params.city_name;

    let sql = `SELECT p.property_id, p.name, ph.img, c.city_name, pr.name AS province_name, DATE_FORMAT(ab.start_date,'%d-%m') AS available_start_date, DATE_FORMAT(ab.end_date,'%d-%m') AS available_end_date, p.price_night
    FROM property p
    INNER JOIN address a ON p.property_id = a.property_id
    INNER JOIN city c ON a.country_id = c.country_id
        AND a.state_id = c.state_id
        AND a.province_id = c.province_id
        AND a.city_id = c.city_id
    INNER JOIN province pr ON c.country_id = pr.country_id
        AND c.state_id = pr.state_id
        AND c.province_id = pr.province_id
    INNER JOIN country co ON pr.country_id = co.country_id
    INNER JOIN photo ph ON p.property_id = ph.property_id
    INNER JOIN available_booking ab ON p.property_id = ab.property_id
    WHERE c.city_name = ${city_name}`;

    connection.query(sql, params, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
      console.log(result);
    });
  };

  //22- Busqueda inmueble por guest, disponibilidad, foto y nombre propiedad
  //localhost:4000/properties/searchGuest/:num_guest

  searchGuest = (req, res) => {
    const num_guest = req.params.num_guest;

    let sql = `SELECT p.property_id, p.name, ph.img, c.city_name, pr.name AS province_name, DATE_FORMAT(ab.start_date,'%d-%m') AS available_start_date, DATE_FORMAT(ab.end_date,'%d-%m') AS available_end_date, p.price_night
  FROM property p
  INNER JOIN address a ON p.property_id = a.property_id
  INNER JOIN city c ON a.country_id = c.country_id
      AND a.state_id = c.state_id
      AND a.province_id = c.province_id
      AND a.city_id = c.city_id
  INNER JOIN province pr ON c.country_id = pr.country_id
      AND c.state_id = pr.state_id
      AND c.province_id = pr.province_id
  INNER JOIN country co ON pr.country_id = co.country_id
  INNER JOIN photo ph ON p.property_id = ph.property_id
  INNER JOIN available_booking ab ON p.property_id = ab.property_id
  INNER JOIN property_info pi ON p.property_id = pi.property_id
  WHERE pi.num_guest <= ${num_guest}`;

    const params = [num_guest];

    connection.query(sql, params, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
      console.log(result);
    });
  };

  //23- Busqueda inmueble por guest, disponibilidad, foto y nombre propiedad
  //localhost:4000/properties/search/:city/guest/:num_guest/available_start_date/:start_date
  searchCityAndGuest = (req, res) => {
    const city = req.params.city;
    const num_guest = req.params.num_guest;
    const availableStartDate = req.params.start_date; // El parámetro se llama "start_date" en lugar de "available_start_date"

    let sql = `
      SELECT p.property_id, p.name, ph.img, c.city_name, pr.name AS province_name,
      DATE_FORMAT(ab.start_date, '%d-%m') AS available_start_date
      FROM property p
      INNER JOIN address a ON p.property_id = a.property_id
      INNER JOIN city c ON a.city_id = c.city_id
      INNER JOIN province pr ON c.province_id = pr.province_id
      INNER JOIN country co ON pr.country_id = co.country_id
      INNER JOIN photo ph ON p.property_id = ph.property_id
      INNER JOIN property_info pi ON p.property_id = pi.property_id
      LEFT JOIN available_booking ab ON p.property_id = ab.property_id
        AND ab.start_date >= ?
      WHERE c.city_name = ?
        AND pi.num_guest <= ?`;

    const params = [availableStartDate, city, num_guest]; //

    connection.query(sql, params, (error, result) => {
      if (error) {
        res.status(400).json({ error });
      } else {
        res.status(200).json(result);
        console.log(result);
      }
    });
  };

  //-------------------------------------------------

  //24- Busqueda inmueble por disponibilidad
  //localhost:4000/properties/searchAvailability/:available_start_date
  searchByAvailability = (req, res) => {
    const availableStartDate = req.params.available_start_date;

    let sql = `
      SELECT
        p.property_id,
        p.name,
        ph.img,
        c.city_name,
        pr.name AS province_name,
        DATE_FORMAT(ab.start_date, '%d-%m') AS available_start_date,
        p.price_night
      FROM
        property p
        INNER JOIN address a ON p.property_id = a.property_id
        INNER JOIN city c ON a.country_id = c.country_id
          AND a.state_id = c.state_id
          AND a.province_id = c.province_id
          AND a.city_id = c.city_id
        INNER JOIN province pr ON c.country_id = pr.country_id
          AND c.state_id = pr.state_id
          AND c.province_id = pr.province_id
        INNER JOIN country co ON pr.country_id = co.country_id
        INNER JOIN photo ph ON p.property_id = ph.property_id
        INNER JOIN available_booking ab ON p.property_id = ab.property_id
        INNER JOIN property_info pi ON p.property_id = pi.property_id
      WHERE
      ab.start_date >= ?`;

    const params = [availableStartDate];

    connection.query(sql, params, (error, result) => {
      if (error) {
        res.status(400).json({ error });
      } else {
        res.status(200).json(result);
        console.log(result);
      }
    });
  };
}

module.exports = new propertiesController();
