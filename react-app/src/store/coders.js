// store > coders.js

import { csrfFetch } from "./csrf"
// *****************************************************************************
//****************************** ACTION CREATORS *******************************

// CRUD:
// Create a Coder
// GET a Coder
// Update/Edit a Coder
// Delete a Coder

///*************************************************************************** */
const GET_ALLCODERS = 'coders/getAllCoders'
const GET_ONECODER = 'coders/getOneCoder'
const UPDATE_CODER = 'coders/updateCoder'
const DELETE_CODER = 'coders/removeCoder'

///*************************************************************************** */
// **** GET ALL CODERS ****
const getAllCoders = coders => ({
    type: GET_ALLCODERS,
    coders
})
///*************************************************************************** */
// **** GET ONE CODER DETAILS ****
const getOneCoder = coder => ({
    type: GET_ONECODER,
    coder
})

///*************************************************************************** */
// **** CREATE A CODER ****

const createOneCoder = coder => ({
    type: CREATE_CODER,
    coder
})
///*************************************************************************** */
// **** EDIT/UPDATE A CODER ****

const updateCoder = coder => ({
    type: UPDATE_CODER,
    coder
})
///*************************************************************************** */
// **** DELETE A CODER ****

const removeCoder = coderId => ({
    type: DELETE_CODER,
    coderId
})

// *****************************************************************************
//************************************ THUNKS **********************************
// -------------------------  LOAD ALL CODERS   ----------------------------------
export const loadAllCoders = () => async dispatch => {
    const response = await fetch('/api/coders')
    if (response.ok) {
        const coders = await response.json();
        dispatch(GET(coders))
    }
}

//*************************************************************************** */

// -------------------------  LOAD ONE CODER's DETAILS   ----------------------------------







//*************************************************************************** */

// -------------------------  CREATE A CODER   ----------------------------------

export const createCoder = (payload) => async dispatch => {

    const response = await csrfFetch('/api/coders/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })

    if(response.ok){
        dispatch(create(coder))
        return coder
    }
}



export const editCoder = (payload) => async dispatch => {

    const response = await csrfFetch(`/api/spots/${payload.id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    if(response.ok) {
        const spot = await response.json();
        dispatch(create(spot))
        return spot
    }
}

export const deleteCoder = (coderId) => async dispatch => {
    const response = await csrfFetch(`/api/coders/${coderId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (response.ok) {
        dispatch(deleteAction(coderId))
        return response
    }
}




// *****************************************************************************
// ******************************* REDUCERS ************************************

const initialState = {}

const coderReducer = (state = initialState, action) => {

    let newState = {}
    switch(action.type) {
        case GET:
            newState = {...state}
            action.coders.forEach((coder) => {
                newState[coders.id] = coder
            });
            return newState

        case CREATE:
            newState = {...state}
            newState[action.coder.id] = action.coder
            return newState

        case DELETE:
            newState = {...state}
            delete newState[action.coderId]
            return newState

        default:
            return state

    }
}

export default coderReducer
