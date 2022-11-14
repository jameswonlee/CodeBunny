import thunk from "redux-thunk"
import {
    csrfFetch
} from "./csrf"


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
// -------------------------  EDIT A REVIEW  ----------------------------------
//edit/update a review
// const updateReview = (review) => {
//     return {
//         type: UPDATE_REVIEW,
//         payload: review
//     }
// }

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
// -------------------------  LOAD ALL REVIEWS OF A SPOT   ---------------------------------

export const loadAllReviews = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/coder/${coderId}/reviews`);
    // console.log(response)
    if (response.ok) {
        const reviewsList = await response.json();

        // const filteredReviews = reviewsList.find(review=>reviewsList.review.coderId ===coderId)

        dispatch(getAllReviews(reviewsList)) // dispatch using out action creator from above to get all reviews
    }
}
///*************************************************************************** */
// // -------------------------  GET USER REVIEWS   ----------------------------------
// export const loadUserReviews = () => async dispatch => {
//     const response = await csrfFetch(`/api/reviews/current`);
//     // console.log(response)
//     if (response.ok) {
//         const reviews = await response.json();

//         // const filteredReviews = reviewsList.find(review=>reviewsList.review.spotId ===spotId)
//         dispatch(getAllReviews(reviews)) // dispatch using out action creator from above to get all reviews
//     }
// }


///*************************************************************************** */
// -------------------------  CREATE A REVIEW   ----------------------------------
export const createNewReview = (reviewData) => async dispatch => {

    let spotId = reviewData.spotId

    const response = await csrfFetch(`/api/coders/${coderId}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reviewData)
    });

    let reviewInfo = await response.json();
    //get reviewId from newly created review obj
    let reviewId = reviewInfo.id



};


///*************************************************************************** */
// -------------------------  DELETE A REVIEW  ----------------------------------

export const deleteReview = reviewId => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });

    dispatch(removeReview(reviewId)) // dispatch the action create to remove a user
    return response;
}



// *****************************************************************************
// ******************************* REDUCERS ********************************

const initialState = {}


const reviewsReducer = (state = initialState, action) => {
    let allReviews = {}
    switch (action.type) {
        ///*************************************************************************** */
        case GET_ALLREVIEWS:

            //normalize our data
            action.reviews.Reviews.forEach(review => {
                allReviews[review.id] = review
            })
            return {
                ...state, ...allReviews
            } //return a new updated state for reviews
            ///*************************************************************************** */
            // case GET_USER_REVIEWS:

            // //normalize our data
            // action.reviews.Reviews.forEach(review => {
            //     allReviews[review.id] = review
            // })
            // return {
            //     ...state, ...allReviews
            // }

            ///*************************************************************************** */

            case CREATE_REVIEW:

                const newState = {
                    ...state
                }

                newState[action.payload.id] = action.payload // normalize and add data

                return newState;
                ///*************************************************************************** */
            // case UPDATE_REVIEW:
            //     const anotherState = {
            //         ...state
            //     }

            //     anotherState[action.payload.id] = action.payload

            //     return anotherState
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
export default reviewsReducer
