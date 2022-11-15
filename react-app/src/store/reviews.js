import thunk from "redux-thunk"
// import {
//     csrfFetch
// } from "./csrf"


// *****************************************************************************
//****************************** ACTION CREATORS *****************************

// Create a Review
// Read a Review
// Read all Reviews
// Delete a Review

///*************************************************************************** */

const GET_ALLREVIEWS = 'reviews/getAllReviews'
const GET_REVIEW = 'reviews/getReview'
const CREATE_REVIEW = 'reviews/createReview'
const REMOVE_REVIEW = 'reviews/removeReview'
//  do we get a get review details route in our backend?

///*************************************************************************** */
// -------------------------  LOAD ALL REVIEWS   ---------------------------------

// Get/Load All Reviews
const getAllReviews = (reviews) => {
    return {
        type: GET_ALLREVIEWS,
        reviews
    }
}
/*************************************************************************** */
// -------------------------  GET REVIEW'S DETAILS   -----------------------------

// Get a review and its info
const getReview = (review) => {
    return {
        type: GET_REVIEW,
        payload: review
    }
}
///*************************************************************************** */
// -------------------------  CREATE A REVIEW  ----------------------------------

//create a review
const createReview = (review) => {
    return {
        type: CREATE_REVIEW,
        payload: review

    }
}

///*************************************************************************** */
// -------------------------  DELETE A REVIEW   ----------------------------------
//delete/remove a review

const removeReview = reviewId => {
    return {
        type: REMOVE_REVIEW,
        payload: reviewId

    }
}

///*************************************************************************** */


// *****************************************************************************
//************************************ THUNKS **********************************
// -------------------------  LOAD ALL REVIEWS---------------------------------

export const loadAllReviews = () => async dispatch => {
    const response = await fetch(`/api/reviews/`);
    // console.log(response)
    if (response.ok) {
        const reviewsList = await response.json();
        dispatch(getAllReviews(reviewsList))
    }
}

///*************************************************************************** */
// -------------------------  CREATE A REVIEW   ----------------------------------
export const createNewReview = (reviewData) => async dispatch => {

    let coderId = reviewData.coderId

    const response = await fetch(`/api/coders/${coderId}/reviews/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reviewData)
    });

    let reviewInfo = await response.json();

    //get reviewId from newly created review obj
    let reviewId = reviewInfo.id
    dispatch(createReview(reviewInfo))


};


///*************************************************************************** */
// -------------------------  DELETE A REVIEW  ----------------------------------

export const deleteReview = reviewId => async dispatch => {
    const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });

    dispatch(removeReview(reviewId))
    return response;
}



// *****************************************************************************
// ******************************* REDUCERS ********************************

const initialState = {}


const reviews = (state = initialState, action) => {

    let allReviews = {}

    switch (action.type) {
 ///*************************************************************************** */

        case GET_ALLREVIEWS:


            console.log("action.reviews", action.reviews)
            //normalize our data
            action.reviews.forEach(review => {
                allReviews[review.id] = review
            })
            return {
                ...state, ...allReviews
            } //return a new updated state for reviews

///*************************************************************************** */

            case CREATE_REVIEW:

                const newState = {
                    ...state
                }

                newState[action.payload.id] = action.payload // normalize and add data

                return newState;
  ///*************************************************************************** */

            case GET_REVIEW:
                const newState2 = { ...state}

                newState2[action.payload.id] = action.payload
                return newState2
///*************************************************************************** */

            case REMOVE_REVIEW:
                const modifiedState = {
                    ...state
                }

                delete modifiedState[action.payload]

                return modifiedState
///*************************************************************************** */

            default:
                return state;
    }
}

///*************************************************************************** */
export default reviews
