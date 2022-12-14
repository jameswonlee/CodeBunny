import { csrfFetch } from "./csrf"

/* ***************************** ACTION TYPES ******************************** */

const GET_ALL_REVIEWS = 'reviews/getAllReviews'
const GET_REVIEW = 'reviews/getReview'
const CREATE_REVIEW = 'reviews/createReview'
const REMOVE_REVIEW = 'reviews/removeReview'


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

const createReview = (reviewData) => {
    return {
        type: CREATE_REVIEW,
        payload: reviewData
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

    const response = await csrfFetch(`/api/reviews/`);

    if (response.ok) {
        const reviews = await response.json();
        dispatch(getAllReviews(reviews))
    }
}

// ---------------------------- LOAD REVIEW -------------------------------------

export const loadOneReview = (reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`);

    if (response.ok) {
        const review = await response.json();
        dispatch(getReview(review))
    }
}

// -------------------------  CREATE A REVIEW   ----------------------------------

export const createNewReview = (coderId, payload) => async (dispatch) => {

    const response = await csrfFetch(`/api/coders/${coderId}/reviews/new`, {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        const newReview = await response.json();
        // console.log("this is newReview in teh thunk", newReview)
        dispatch(createReview(newReview))
    }
};

// -------------------------  DELETE A REVIEW  ---------------------------------

export const deleteReview = (payload) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${payload.reviewId}`, {
        method: 'DELETE'
    });

    dispatch(removeReview(payload.reviewId))
    return response;
}




/* ******************************** REDUCER *********************************** */

const initialState = {}

const reviews = (state = initialState, action) => {
    let newState = {}
    switch (action.type) {
        case GET_ALL_REVIEWS:
            let newReviews = {};
            action.reviews.Reviews.forEach(review => newReviews[review.id] = review)
            newState = { ...state, ...newReviews }
            return newState;


        case GET_REVIEW:
            newState = { ...state }
            newState[action.payload.id] = action.payload
            return newState

        case CREATE_REVIEW:
                newState = { ...state }
                newState[action.payload.id]= action.payload
                return newState;

        case REMOVE_REVIEW:
            newState = { ...state }
            delete newState[action.payload]
            return {...newState}


        default:
            return state;
    }
}



///*************************************************************************** */
export default reviews
