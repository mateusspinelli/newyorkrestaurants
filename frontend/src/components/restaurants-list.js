import React, { useState, useEffect } from "react";
import RestaurantDataService from "../services/restaurant";
import { Link } from "react-router-dom";

import "../css/restaurants-list.css"


import searchIcon from "../img/search.png"
import restaurantIcon from "../img/restaurant.png"
import cuisineIcon from "../img/cuisine.png"
import addressIcon from "../img/address.png"

const RestaurantsList = props => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchName, setSearchName ] = useState("");
  const [searchZip, setSearchZip ] = useState("");
  const [searchCuisine, setSearchCuisine ] = useState("");
  const [cuisines, setCuisines] = useState(["All Cuisines"]);

  useEffect(() => {
    retrieveRestaurants();
    retrieveCuisines();
  }, []);

  const onChangeSearchName = e => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const onChangeSearchZip = e => {
    const searchZip = e.target.value;
    setSearchZip(searchZip);
  };

  const onChangeSearchCuisine = e => {
    const searchCuisine = e.target.value;
    setSearchCuisine(searchCuisine);
    
  };

  const retrieveRestaurants = () => {
    RestaurantDataService.getAll()
      .then(response => {
        console.log(response.data);
        setRestaurants(response.data.restaurants);
        
      })
      .catch(e => {
        console.log(e);
      });
  };

  const retrieveCuisines = () => {
    RestaurantDataService.getCuisines()
      .then(response => {
        console.log(response.data);
        setCuisines(["All Cuisines"].concat(response.data));
        
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveRestaurants();
  };

  const find = (query, by) => {
    RestaurantDataService.find(query, by)
      .then(response => {
        console.log(response.data);
        setRestaurants(response.data.restaurants);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByName = () => {
    find(searchName, "name")
  };

  const findByZip = () => {
    find(searchZip, "zipcode")
  };

  const findByCuisine = () => {
    if (searchCuisine == "All Cuisines") {
      refreshList();
    } else {
      find(searchCuisine, "cuisine")
    }
  };

  return (
    <main>
      <div className="searchContainer">

        <h2 className="searchTitle">Find the perfect restaurant</h2>

        <div className="searchContent">


          <div className="nameForm">
            <input
              type="text"
              className="formNameInput"
              placeholder="Restaurant name"
              value={searchName}
              onChange={onChangeSearchName}
            />
              <button
                className="formNameBtn"
                type="button"
                onClick={findByName}
              >
                <img className="searchIcon" src={searchIcon}></img>
              </button>
          </div>


          <div className="zipForm">
            <input
              type="text"
              className="formZipInput"
              placeholder="Zipcode"
              value={searchZip}
              onChange={onChangeSearchZip}
            />
            <button
              className="formZipBtn"
              type="button"
              onClick={findByZip}
            >
              <img className="searchIcon" src={searchIcon}></img>
            </button>
          </div>


          <div className="cuisineForm">
            <select onChange={onChangeSearchCuisine} className="formCuisineInput">
              {cuisines.map(cuisine => {
                return (
                  <option value={cuisine}> {cuisine.substr(0, 20)} </option>
                )
              })}
            </select>
              <button
                className="formCuisineBtn"
                type="button"
                onClick={findByCuisine}
              >
                <img className="searchIcon" src={searchIcon}></img>
              </button>
          </div>


        </div>
      </div>


      <div className="cardContainer">
        {restaurants.map((restaurant) => {
          const address = `${restaurant.address.building} ${restaurant.address.street}, ${restaurant.address.zipcode}`;
          return (
              <div className="card">

                  <div className="cardTitle">
                    <img src={restaurantIcon} className="cardIcon"></img>
                    <h5 className="cardRestaurant">{restaurant.name}</h5>
                  </div>
                  <hr></hr>

                  <div className="cardSubtitle">
                    <img src={cuisineIcon} className="cardIcon"></img>
                    <p className="cardTextB">
                      Cuisine: 
                    </p>
                    <p className="cardText">
                      {restaurant.cuisine}
                    </p>
                  </div>

                  <div className="cardSubtitle">
                    <img src={addressIcon} className="cardIcon"></img>
                    <p className="cardTextB">
                      Address:
                    </p>
                    <p className="cardText">
                      {address}
                    </p>
                  </div>


                  <div className="cardButtons">
                    <Link to={"/restaurants/"+restaurant._id} className="cardBtn">
                      <p className="cardBtnText">
                        View Reviews
                      </p>
                    </Link>
                    <a target="_blank" href={"https://www.google.com/maps/place/" + address} className="cardBtn" >
                      <p className="cardBtnText" >
                        View Map
                      </p>
                    </a>
                  </div>


              </div>
          );
        })}


      </div>
    </main>
  );
};

export default RestaurantsList;