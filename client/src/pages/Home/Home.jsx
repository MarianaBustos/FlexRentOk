import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import axios from "axios";
import "./home.css";
import {  Col, Row } from "react-bootstrap";
import flatpickr from "flatpickr";
import { FlexRentContext } from "../../context/FlexRentProvider";
import { NavbarGeneral } from "../../components/navBarGeneral/NavbarGeneral";
import { Footer } from "../../components/footer/Footer";
import "flatpickr/dist/themes/dark.css";

export const Home = () => {
  const [allProperties, setAllProperties] = useState([]);
  const [findProperties, setFindProperties] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const navigate = useNavigate();
  const { user, setUser, setIsLogged } = useContext(FlexRentContext);
  const [searchCity, setSearchCity] = useState("");
  const [searchGuest, setSearchGuest] = useState(null);
  const startDateRef = useRef(null);

  const sortByPriceAsc = () => {
    const sortedProperties = [...findProperties].sort(
      (a, b) => a.price_night - b.price_night
    );
    setFindProperties(sortedProperties);
  };
  useEffect(() => {
    axios
      .get("http://localhost:4000/properties/viewAllProperties")
      .then((res) => {
        setAllProperties(res.data);
        setFindProperties(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    if (sortBy !== "") {
      sortByPriceAsc();
    }
  }, [sortBy]);

  const onLogOut = () => {
    window.localStorage.removeItem("token");
    setIsLogged(false);
    setUser();
    navigate("/");
  };

  useEffect(() => {
    flatpickr(startDateRef.current, {
      dateFormat: "Y-m-d",
      minDate: "today", // Establecer la fecha mínima como "hoy"
    });
  }, []);


  const handleSearch = () => {
    let startDate = startDateRef.current.value;

    if (searchCity === "" && startDate === "" && searchGuest === "") {
      setFindProperties(allProperties);
    } else if (searchCity !== "" && startDate === "" && searchGuest === "") {
      let arrayFinal = allProperties.filter((property) => {
        return property.city_name
          .toLocaleUpperCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(
            searchCity
              .toLocaleUpperCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
          );
      });
      setFindProperties(arrayFinal);
    } else if (searchCity === "" && startDate !== "" && searchGuest === "") {
      let arrayFinal = allProperties.filter((property) => {
        return (
          property.available_start_date <= startDate &&
          property.available_end_date >= startDate
        );
      });
      setFindProperties(arrayFinal);
    } else if (searchCity === "" && startDate === "" && searchGuest !== "") {
      let arrayFinal = allProperties.filter((property) => {
        return property.num_guest >= searchGuest;
      });
      setFindProperties(arrayFinal);
    } else if (searchCity !== "" && startDate !== "" && searchGuest === "") {
      let arrayFinal = allProperties
        .filter((property) => {
          return property.city_name
            .toLocaleUpperCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(
              searchCity
                .toLocaleUpperCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
            );
        })
        .filter((property) => {
          return (
            property.available_start_date <= startDate &&
            property.available_end_date >= startDate
          );
        });
      setFindProperties(arrayFinal);
    } else if (searchCity !== "" && startDate === "" && searchGuest !== "") {
      let arrayFinal = allProperties
        .filter((property) => {
          return property.city_name
            .toLocaleUpperCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(
              searchCity
                .toLocaleUpperCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
            );
        })
        .filter((property) => {
          return property.num_guest >= searchGuest;
        });
      setFindProperties(arrayFinal);
    } else if (searchCity === "" && startDate !== "" && searchGuest !== "") {
      let arrayFinal = allProperties
        .filter((property) => {
          return (
            property.available_start_date <= startDate &&
            property.available_end_date >= startDate
          );
        })
        .filter((property) => {
          return property.num_guest >= searchGuest;
        });
      setFindProperties(arrayFinal);
    } else if (searchCity !== "" && startDate !== "" && searchGuest !== "") {
      let arrayFinal = allProperties
        .filter((property) => {
          return property.city_name
            .toLocaleUpperCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(
              searchCity
                .toLocaleUpperCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
            );
        })
        .filter((property) => {
          return (
            property.available_start_date <= startDate &&
            property.available_end_date >= startDate
          );
        })
        .filter((property) => {
          return property.num_guest >= searchGuest;
        });
      setFindProperties(arrayFinal);
    }
  };

  return (
    <>
      <Row>
        <NavbarGeneral />
      </Row>
      <Row className="BuscadorWhere">
        <div className="buscador">
          <Col className="pequeño mini">
            <label htmlFor="">
              <b>Where</b>
            </label>
            <input
              type="text"
              placeholder="Search destination"
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
            />
          </Col>
          <Col className="pequeño mini">
            <label htmlFor="">
              <b>Date</b>
            </label>
            <input
              type="text"
              placeholder="Add date"
              id="centro"
              ref={startDateRef}
            />
          </Col>
          <Col className="pequeño">
            <label htmlFor="">
              <b>Guests</b>
            </label>
            <input
              type="number"
              placeholder="Add guests"
              value={searchGuest}
              onChange={(e) => setSearchGuest(e.target.value)}
              max="15"
              min="0"
            />
          </Col>
          <a>
            <img
              onClick={handleSearch}
              className="searchButton"
              src="/assets/images/FichaDeProducto/SearchButton.png"
              alt=""
            />
          </a>
        </div>
      </Row>
      <Row className="Home">
  <Col className="d-flex justify-content-end btnSortPrice">
    <button className="botonPrice" onClick={sortByPriceAsc}>
      Sort by price
    </button>
  </Col>

  <div className="cardContainer ">
    {findProperties.map((property) => (
      <Col key={property.property_id} xs={12} sm={6} md={4} lg={3} xl={3}>
        <div className="propertyCard">
          <div onClick={() => navigate(`/oneProperty/${property.property_id}`)}>
            <img
              className="cardImg"
              src={`/images/properties/${property.file_name}`}
              alt=""
            />
          </div>

          <div className="cardBody">
            <br />
            <div className="title">
              <h5>
                {property.city_name}, {property.province_name}
              </h5>
            </div>
            <div className="cardTextContainer">
              <div className="cardText">
                <p>
                  Availability {property.available_start_date} /{" "}
                  {property.available_end_date}
                </p>
                <div className="priceContainer">
                  <p>
                    <strong>€ {property.price_night}</strong> night
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Col>
    ))}
  </div>
</Row>
      <Row>
        <Footer />
      </Row>
    </>
  );
};
