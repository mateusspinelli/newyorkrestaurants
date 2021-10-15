import React, { useState, useEffect } from "react";
import RestaurantDataService from "../services/restaurant";
import { Link } from "react-router-dom";

import "../css/restaurants.css"

import restaurantIcon from "../img/restaurant.png"
import cuisineIcon from "../img/cuisine.png"
import addressIcon from "../img/address.png"
import userIcon from "../img/user.png"
import deadlineIcon from "../img/deadline.png"

const Restaurant = props => {
  const initialRestaurantState = {
    id: null,
    name: "",
    address: {},
    cuisine: "",
    reviews: []
  };
  const [restaurant, setRestaurant] = useState(initialRestaurantState);

  const getRestaurant = id => {
    RestaurantDataService.get(id)
      .then(response => {
        setRestaurant(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getRestaurant(props.match.params.id);
  }, [props.match.params.id]);

  const deleteReview = (reviewId, index) => {
    RestaurantDataService.deleteReview(reviewId, props.user.id)
      .then(response => {
        setRestaurant((prevState) => {
          prevState.reviews.splice(index, 1)
          return({
            ...prevState
          })
        })
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {restaurant ? (
        <div>
          <h5 className="restaurantsName">{restaurant.name}</h5>


          <div className="restaurantsContent">
            <img src={cuisineIcon} className="restaurantsIcon"></img>
            <p>
              <span>Cuisine: </span>{restaurant.cuisine}
            </p>
          </div>


          <div className="restaurantsContent">
            <img src={addressIcon} className="restaurantsIcon"></img>
            <p>
              <span>Address: </span>{restaurant.address.building} {restaurant.address.street}, {restaurant.address.zipcode}
            </p>
          </div>


          <div className="restaurantsReviewsTitle">
            <h4> Reviews </h4>
            <Link to={"/restaurants/" + props.match.params.id + "/review"} className="restaurantsReviewsBtn">
              Add Review
            </Link>
          </div>

          <div className="restaurantsCardContainer">
            {restaurant.reviews.length > 0 ? (
             restaurant.reviews.map((review, index) => {
               return (
                 <div className="restaurantsCard" key={index}>


                      <div className="restaurantsCardUser">
                        <img src={userIcon} className="restaurantsCardIcon"></img>
                        <h3>{review.name}</h3>
                      </div>


                      <hr></hr>


                      <div className="restaurantsCardContent">
                       <p className="restaurantsCardText">
                         {review.text}
                       </p>
                       
                       {props.user && props.user.id === review.user_id &&
                          <div className="restaurantsCardContentBtns">
                            <a onClick={() => deleteReview(review._id, index)} className="restaurantsCardContentBtn">Delete</a>
                            <Link to={{
                              pathname: "/restaurants/" + props.match.params.id + "/review",
                              state: {
                                currentReview: review
                              }
                            }} className="restaurantsCardContentBtn">Edit</Link>
                          </div>                   
                       }
                      </div>

                      
                       <hr></hr>
                       <div className="restaurantsCardContentDate">
                        <img src={deadlineIcon} className="restaurantsCardIcon"></img>
                        <p>{review.date}</p>
                       </div>
                 </div>
               );
             })
            ) : (
              <p className="restaurantReviewsText">No reviews yet.</p>
            )}

          </div>

        </div>
      ) : (
          <p className="restaurantReviewsText">No restaurant selected.</p>
      )}
    </div>
  );
};

export default Restaurant;