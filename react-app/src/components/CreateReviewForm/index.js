import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux"
import {createNewReview } from "../../store/reviews"
import {loadAllReviews} from "../../store/reviews"
import { useParams } from "react-router-dom"
import "./CreateReviewForm.css";

function ReviewForm() {
  const history = useHistory()
  const dispatch = useDispatch();
  const [review, setReview] = useState('')
  const [rating, setRating] = useState('')
  const { coderId } = useParams()
// console.log("this is coderId", coderId)
  const [validationErrors, setValidationErrors] = useState([])

  useEffect(() => {
    dispatch(loadAllReviews(coderId))
}, [dispatch])

const submitHandler = async (e) => {
  e.preventDefault()

    const errors = []

    if(!review) errors.push("Please provide a review")
    if(rating < 1 || rating >10 || rating=== "") errors.push("Rating must be an integer between 1 and 10")

    setValidationErrors(errors)

  const payload = {
    review,
    rating
}

 if(errors.length){
  return null
 }

//  if (stars === ""){
//   alert("You must pick a rating between 1-5")
//   return null
//  }

let createdReview;

  createdReview = await dispatch(createNewReview (coderId, payload))

  history.push(`/coders/${coderId}`)

}

  return (
    <div className="Outer-Container">
      <div className="Inner-Container">
    <form
      className="review-form" onSubmit={submitHandler}
    >
      <div className="title-box">
      <h2 className="title-words">Create a Review</h2>
      </div>
      <div className="errors">
        {validationErrors.length > 0 &&
          validationErrors.map((error) =>
          <div key={error}>{error}</div>
        )}
      </div>
      {/* <label>
        Review
        <input
          type="text"
          name="review"
          onChange={(e)=> setReview(e.target.value)}
          value={review}
        />
      </label> */}
      <div className="write-review-container">
      <h3>Write your Review Below</h3>
      </div>
      <div className="review-container">
      <textarea className="input-box"
      id="first-name"
        label="Name"
          value={review}
          onChange={(e)=> setReview(e.target.value)}
          margin="normal"
      />
      </div>
      <div className= "stars-container">
        <div className= "star-and-column">
      <label>
              <i className="fa-solid fa-star fa-xs"></i>
        {/* <input
          type="text"
          name="stars"
          onChange={(e)=> setStars(e.target.value)}
          value={stars}
        /> */}
        <select className="one-to-five" onChange={(e)=> setRating(e.target.value)} value={rating}>
            <option value= "" disabled>Rate 1 to 10</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>

          </select>
      </label>
      </div>
      </div>
      <div className="create-review-container">
      <button className="create-review-button"
        type="submit"
        // disable={setValidationErrors.length > 0 ? true : false}
          // disabled={!!validationErrors.length}
      >
        Create Review
      </button>
      </div>
    </form>
      </div>
    </div>
  );
}

export default ReviewForm;
