var express = require("express");
const multer = require("../middleware/multer");
const bidsController = require("../controllers/bidsControllers");
var router = express.Router();

// 1- Realizar puja
//localhost:4000/bids/createBid/:property_id/:user_id

//este es el coment para git
router.post("/createBid/:property_id/:user_id", bidsController.createBid);

// 2- Editar puja
//localhost:4000/bids/editBid/:bid_id
router.put("/editBid/:bid_id", bidsController.editBid);
console.log("editBid");

// 3- Ver una puja
//localhost:4000/bids/seeBid/:bid_id
router.get("/seeBid/:bid_id", bidsController.seeBid);
console.log("seeBid");

//4- cancelar puja
//localhost:4000/bids/cancelBid/:bid_id
router.put("/cancelBid/:bid_id", bidsController.cancelBid);

//5- vista de todas las pujas de una propiedad
//localhost:4000/bids/allBids/:property_id
router.get("/allBids/:property_id", bidsController.viewAllBids);

//6- aprobar puja de una propiedad
//localhost:4000/bids/approveBid/:property_id/:bid_id
router.put("/approveBid/:property_id/:bid_id", bidsController.approveBid);

//7- Crear reserva
//localhost:4000/bids/book
router.post("/book", bidsController.book);

//8- Vista puja de una propiedad
//localhost:4000/bids/viewBidsProperty/:property_id
router.get("/viewBidsProperty/:property_id", bidsController.viewBidsProperty);

// 9- Cancelar puja de una propiedad
//localhost:4000/bids/cancelPropertyBid/:property_id/:bid_id
router.put(
  "/cancelPropertyBid/:property_id/:bid_id",
  bidsController.cancelPropertyBid
);

module.exports = router;
