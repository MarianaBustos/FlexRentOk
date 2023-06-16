const connection = require("../config/db.js");

class bidsController {
  // 1.- Realizar puja
  //localhost:4000/bids/createBid/:property_id/:user_id
  createBid = (req, res) => {
    console.log("parammmmssss", req.params);
    const { property_id, user_id } = req.params;

    const {
      check_in_date,
      check_out_date,
      price,
      // home_insurance,
      cleaning_fee,
      number_of_guest,
    } = req.body;

    console.log("bodyyyyyyyyyy", req.body);

    let sql = `INSERT INTO bid (user_id, property_id, check_in_date, check_out_date, price, number_of_guest, cleaning_fee, home_insurance) VALUES ('${user_id}', '${property_id}', '${check_in_date}', '${check_out_date}', '${price}', '${number_of_guest}', '${cleaning_fee}', 00.00 )`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
      console.log(result);
    });
  };

  // 2- Editar puja
  //localhost:4000/bids/editBid/:bid_id

  editBid = (req, res) => {
    let bid_id = req.params.bid_id;
    console.log("XXXXXXXXXXX", req.body);

    const { check_in_date, check_out_date, number_of_guest, price } = req.body;

    let sql = `UPDATE bid SET check_in_date = "${check_in_date}", check_out_date = "${check_out_date}", number_of_guest = "${number_of_guest}", price = "${price}" where bid_id = ${bid_id};`;

    connection.query(sql, (error, result) => {
      if (error) console.log(error);
      error
        ? res.status(400).json({ error })
        : res.status(200).json({ result });
    });
  };

  // 3- Ver la info de una puja
  //localhost:4000/bids/seeBid/:bid_id
  seeBid = (req, res) => {
    const { bid_id } = req.params;

    let sql = `
    SELECT bid.*, property.name, property.description, property.price_night
    FROM bid
    INNER JOIN property ON bid.property_id = property.property_id
    WHERE bid.bid_id = '${bid_id}';
  `;
    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
      console.log(result);
    });
  };

  // 4- Cancelar puja
  //localhost:4000/bids/cancelBid/:bid_id

  cancelBid = (req, res) => {
    let bid_id = req.params.bid_id;
    console.log("sssssssssssssssss", req.params);
    let sql = `UPDATE bid SET is_deleted = 1 where bid_id = ${bid_id};`;

    connection.query(sql, (error, result) => {
      error
        ? res.status(400).json({ error })
        : res.status(200).json({ result });
    });
  };

  //5- vista de todas las pujas de una propiedad
  //localhost:4000/bids/allBids/:property_id

  viewAllBids = (req, res) => {
    const { property_id } = req.params;

    let sql = `
      select * from bid where property_id = '${property_id}' AND check_in_date > CURDATE();
    `;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
      console.log(result);
    });
  };
  //6- aprobar puja de una propiedad
  //localhost:4000/bids/approveBid/:property_id/:bid_id

  approveBid = (req, res) => {
    let { bid_id, property_id } = req.params;
    console.log(req.params);
    let sql = `UPDATE bid SET status = 1 where bid_id = ${bid_id}`;
    let sql2 = `SELECT bid.*, user.*, property.name as property_name
    FROM bid, user, property
    WHERE bid.user_id = user.user_id AND bid.property_id= property.property_id AND property.property_id =${property_id} and property.is_deleted = 0`;

    connection.query(sql, (error, resultBid) => {
      if (error) {
        res.status(400).json({ error });
      }
      connection.query(sql2, (error2, resultProperty) => {
        if (error2) {
          res.status(400).json({ error2 });
        }
        res.status(200).json({ resultBid, resultProperty });
      });
    });
  };

  //7- Crear reserva
  //localhost:4000/bids/book
  book = (req, res) => {};

  //8- Vista pujas de una propiedad
  //localhost:4000/bids/viewBidsProperty/:property_id

  viewBidsProperty = (req, res) => {
    let property_id = req.params.property_id;
    let sql = `SELECT bid.*, user.*, property.name as property_name
    FROM bid, user, property
    WHERE bid.user_id = user.user_id AND bid.property_id= property.property_id AND property.property_id =${property_id} and property.is_deleted = 0`;

    connection.query(sql, (error, result) => {
      if (error) console.log(error);
      error
        ? res.status(400).json({ error })
        : res.status(200).json({ result });
    });
  };
  // 9- Cancelar puja de una propiedad
  //localhost:4000/bids/cancelBid/:property_id/:bid_id

  cancelPropertyBid = (req, res) => {
    let { bid_id, property_id } = req.params;
    console.log(req.params);
    let sql = `UPDATE bid SET status = 2 where bid_id = ${bid_id}`;
    let sql2 = `SELECT bid.*, user.*, property.name as property_name
    FROM bid, user, property
    WHERE bid.user_id = user.user_id AND bid.property_id= property.property_id AND property.property_id =${property_id} and property.is_deleted = 0`;

    connection.query(sql, (error, resultBid) => {
      if (error) {
        res.status(400).json({ error });
      }
      connection.query(sql2, (error2, resultProperty) => {
        if (error2) {
          res.status(400).json({ error2 });
        }
        res.status(200).json({ resultBid, resultProperty });
      });
    });
  };
}

module.exports = new bidsController();
