var express = require("express");
const multer = require("../middleware/multer");
const propertiesController = require("../controllers/propertiesControllers");
var router = express.Router();

//1.- createProperty1
//Crear una propiedad en la tabla Property
//localhost:4000/properties/createProperty1/:user_id
router.post("/createProperty1/:user_id", propertiesController.createProperty1);

//-------------------------------------------------

//2.- createProperty2
// Crear la info de property_info
//localhost:4000/properties/createProperty2/:property_id
router.post(
  "/createProperty2/:property_id",
  propertiesController.createProperty2
);

//-------------------------------------------------

//3.- createProperty3
// Crear la info de address
//localhost:4000/properties/createProperty3/:property_id
router.post(
  "/createProperty3/:property_id",
  propertiesController.createProperty3
);

//-------------------------------------------------

//4.- getPropertyId
//Rescata el property_id
//localhost:4000/properties/getPropertyId/:user_id
router.get("/getPropertyId/:user_id", propertiesController.getPropertyId);

//-------------------------------------------------

//5.- createProperty4
// Crear la info de photo
//localhost:4000/properties/createProperty4/:property_id
router.post(
  "/createProperty4/:property_id",
  multer("properties"),
  propertiesController.createProperty4
);

//-------------------------------------------------

//6.- publishProperty
//localhost:4000/properties/publishProperty/:property_id
// Publica (para a is_deleted 0 la propiedad cuando decide publicarda)
router.put(
  "/publishProperty/:property_id",
  propertiesController.publishProperty
);

//-------------------------------------------------

//7.- getAllState
// buscar todos los states de España
//localhost:4000/properties/getAllState
router.get("/getAllState", propertiesController.getAllState);

//-------------------------------------------------

//8.- getAllProvince
// buscar todos las province de España
//localhost:4000/properties/getAllProvince/:state_id
router.get("/getAllProvince/:state_id", propertiesController.getAllProvince);

//-------------------------------------------------

//9.- getAllCity
// buscar todos las city de España
//localhost:4000/properties/getAllCity/:province_id
router.get("/getAllCity/:province_id", propertiesController.getAllCity);

//-------------------------------------------------

//10.- getPropertyPhotos2
//Trae todas las fotos de una propiedad
//localhost:4000/properties/getPropertyPhotos2/:property_id
router.get(
  "/getPropertyPhotos2/:property_id",
  propertiesController.getPropertyPhotos2
);

//-------------------------------------------------

//11.- deleteProperty
//Borrado lógico de una propiedad
//localhost:4000/properties/delProperty/:property_id
router.put("/deleteProperty/:property_id", propertiesController.deleteProperty);

//-------------------------------------------------

//12. getInfoProperty
//Trae toda la info de una propiedad
//localhost:4000/properties/getInfoProperty/:property_id
router.get(
  "/getInfoProperty/:property_id",
  propertiesController.getInfoProperty
);

//-------------------------------------------------

//13- editProperty1
//Editar propiedad
//localhost:4000/properties/editProperty1/:property_id
router.put("/editProperty1/:property_id", propertiesController.editProperty1);

//-------------------------------------------------

//14- editProperty2
//Editar propiedad
//localhost:4000/properties/editProperty2/:property_id
router.put("/editProperty2/:property_id", propertiesController.editProperty2);

//-------------------------------------------------

//15- editProperty3
//Editar fotos de la propiedad
//localhost:4000/properties/editProperty3/:property_id
router.put(
  "/editProperty3/:property_id",
  multer("properties"),
  propertiesController.editProperty3
);

//16- viewAllBids
//Ver las pujas de esa propiedad
//localhost:4000/properties/viewAllBids/:property_id
router.get("/allBids/:property_id", propertiesController.viewAllBids);

//-------------------------------------------------

//17 -searchProperty
//localhost:4000/properties/searchProperty/:city_name/:start_date/:num_guest
router.get(
  "/searchProperty/:city_name/:start_date/:num_guest",
  propertiesController.searchProperty
);

//-------------------------------------------------

//18-viewAllProperties
//Vista de todos los inmuebles
//localhost:4000/properties/viewAllProperties
router.get("/viewAllProperties", propertiesController.viewAllProperties);

//-------------------------------------------------

//19- createAvailability
//crea disponibilidad a una casa
//localhost:4000/properties/createAvailability/:property_id
router.post(
  "/createAvailability/:property_id",
  propertiesController.createAvailability
);

//-------------------------------------------------

//20- delPhoto
//borra una foto
//localhost:4000/properties/delPhoto/:photo_id"
router.delete("/delPhoto/:property_id", propertiesController.delPhoto);

//-------------------------------------------------

//21- Busqueda inmueble por ciudad y provincia
//localhost:4000/properties/search/:city_name
router.get("/search/:city_name", propertiesController.search);

//-------------------------------------------------

//22- Busqueda inmueble por guest, disponibilidad, foto y nombre propiedad
//localhost:4000/properties/searchGuest/:num_guest
router.get("/searchGuest/:num_guest", propertiesController.searchGuest);

//-------------------------------------------------

//23- Busqueda inmueble por guest, disponibilidad, foto y nombre propiedad
//localhost:4000/properties/search/:city/guest/:num_guest
router.get(
  "/search/:city/guest/:num_guest/available_start_date/:start_date",
  propertiesController.searchCityAndGuest
);

//24- Busqueda inmueble por disponibilidad
//localhost:4000/properties/searchAvailability/:available_start_date
router.get(
  "/searchAvailability/:available_start_date",
  propertiesController.searchByAvailability
);

module.exports = router;
