import thunk from "redux-thunk"
// import { csrfFetch } from "./csrf"

/* ***************************** ACTION TYPES ******************************** */

const GET_ALL_REVIEWS = 'reviews/getAllReviews'
const GET_REVIEW = 'reviews/getReview'
const CREATE_REVIEW = 'reviews/createReview'
const REMOVE_REVIEW = 'reviews/removeReview'
//  do we get a get review details route in our backend?



/* **************************** ACTION CREATORS ****************************** */

// -------------------------  LOAD ALL REVIEWS   ------------------------------

const getAllReviews = (reviews) => {
    return {
        type: GET_ALL_REVIEWS,
        reviews
    }
}
// -------------------------  GET REVIEW'S DETAILS   -------------------------

const getReview = (review) => {
    return {
        type: GET_REVIEW,
        payload: review
    }
}
// -------------------------  CREATE A REVIEW  ----------------------------------

const createReview = (review, sessionUser) => {
    return {
        type: CREATE_REVIEW,
        payload: review,
        user: sessionUser

    }
}

// -------------------------  DELETE A REVIEW   -------------------------------

const removeReview = (reviewId) => {
    return {
        type: REMOVE_REVIEW,
        payload: reviewId

    }
}



/* ******************************** THUNKS ************************************ */

// -------------------------  LOAD ALL REVIEWS---------------------------------

export const loadAllReviews = () => async dispatch => {
    const response = await fetch(`/api/reviews/`);
    // console.log(response)
    if (response.ok) {
        const reviewsList = await response.json();
        dispatch(getAllReviews(reviewsList))
    }
}

// ---------------------------- LOAD REVIEW -------------------------------------

export const loadOneReview = (reviewId) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${reviewId}`);

    if (response.ok) {
        const review = await response.json();
        dispatch(getReview(review))
    }
}

// -------------------------  CREATE A REVIEW   ----------------------------------
export const createNewReview = (review, rating, coderId, sessionUser) => async (dispatch) => {
    const response = await fetch(`/api/coders/${coderId}/reviews/new`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ review, rating })
    });

    if (response.ok) {
        const newReview = await response.json();
        dispatch(createReview(newReview, sessionUser))
    }
};

// -------------------------  DELETE A REVIEW  ---------------------------------

export const deleteReview = reviewId => async dispatch => {
    const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });

    dispatch(removeReview(reviewId))
    return response;
}




/* ******************************** REDUCER *********************************** */

const initialState = { reviews: {} }

const reviews = (state = initialState, action) => {
    let newState = {}
    switch (action.type) {
        case GET_ALL_REVIEWS: {
            let newReviews = {};
            action.reviews.forEach(review => newReviews[review.id] = review)
            newState = { ...state, reviews: newReviews }
            return newState;
        }

        case GET_REVIEW: {
            newState = { ...state }
            newState[action.payload.id] = action.payload
            return newState
        }

        case CREATE_REVIEW: {
            newState = { ...state }
            newState = {
                ...state,
                reviews: {
                    ...state.reviews, [action.review.id]: {
                        ...action.review,
                        User: action.user
                    }
                }
            }
            return newState;
        }

        case REMOVE_REVIEW: {
            newState = { ...state }
            delete newState[action.payload]
            return newState
        }

        default:
            return state;
    }
}



///*************************************************************************** */
export default reviews
