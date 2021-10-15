import React, { useState } from "react";
import RestaurantDataService from "../services/restaurant";
import { Link } from "react-router-dom";

import "../css/add-review.css"

import penIcon from "../img/pen.png"

const AddReview = props => {
  let initialReviewState = ""

  let editing = false;

  if (props.location.state && props.location.state.currentReview) {
    editing = true;
    initialReviewState = props.location.state.currentReview.text
  }

  const [review, setReview] = useState(initialReviewState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    setReview(event.target.value);
  };

  const saveReview = () => {
    var data = {
      text: review,
      name: props.user.name,
      user_id: props.user.id,
      restaurant_id: props.match.params.id
    };

    if (editing) {
      data.review_id = props.location.state.currentReview._id
      RestaurantDataService.updateReview(data)
        .then(response => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      RestaurantDataService.createReview(data)
        .then(response => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }

  };

  return (
    <div className="addreviewContent">
      {props.user ? (
      <div>
        {submitted ? (
          <div className="addreviewContentSuccess">
            <h4>You submitted successfully!</h4>
            <Link to={"/restaurants/" + props.match.params.id} >
              <button className="addreviewContentSuccessBtn">
              Back to Restaurant
              </button>
            </Link>
          </div>
        ) : (
          <div>
            <div className="addreviewContentTitle">
              <img src={penIcon}></img>
              <label htmlFor="description">{ editing ? "Edit" : "Create" } Review</label>
            </div>
            <div className="addreviewContentInput">
              <textarea
                  type="text"
                  id="text"
                  required
                  value={review}
                  onChange={handleInputChange}
                  name="text"
                />
              <button onClick={saveReview}>
                Submit
              </button>
            </div>
          </div>
        )}
      </div>

      ) : (
      <div>
        Please log in.
      </div>
      )}

    </div>
  );
};

export default AddReview;