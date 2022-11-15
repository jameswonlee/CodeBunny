// store > coders.js

import {
    csrfFetch
} from "./csrf"
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
const CREATE_CODER = 'coders/createCoder'
const UPDATE_CODER = 'coders/updateCoder'
const DELETE_CODER = 'coders/removeCoder'

///*************************************************************************** */
// **** GET ALL CODERS ****
const getAllCoders = coders => ({
    type: GET_ALLCODERS,
    payload: coders
})
///*************************************************************************** */
// **** GET ONE CODER DETAILS ****
const getOneCoder = coder => ({
    type: GET_ONECODER,
    payload: coder
})

///*************************************************************************** */
// **** CREATE A CODER ****

const createCoder = coder => ({
    type: CREATE_CODER,
    payload: coder
})
///*************************************************************************** */
// **** EDIT/UPDATE A CODER ****

const updateCoder = coder => ({
    type: UPDATE_CODER,
    payload: coder
})
///*************************************************************************** */
// **** DELETE A CODER ****

const removeCoder = coderId => ({
    type: DELETE_CODER,
    payload: coderId
})

// *****************************************************************************
//************************************ THUNKS **********************************

// -------------------------  LOAD ALL CODERS   ----------------------------------
export const loadAllCoders = () => async dispatch => {
    const response = await fetch('/api/coders/')
    if (response.ok) {
        const codersList = await response.json();
        dispatch(getAllCoders(codersList))
    }
}

//*************************************************************************** */

// -------------------------  LOAD ONE CODER's DETAILS   -------------------------


export const loadOneCoder = (coderId) => async dispatch => {
    const response = await fetch(`/api/coders/${coderId}/`);

    if (response.ok){
        const coderInfo = await response.json();
        dispatch(getOneCoder(coderInfo))
    }
}


//*************************************************************************** */

// -------------------------  CREATE A CODER   ----------------------------------

export const createNewCoder = (payload) => async dispatch => {
    console.log("did this reach?")
    console.log("this is the payload", payload)
    const response = await csrfFetch('/api/coders/new/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    console.log("did it reach here? after response?")
    if (response.ok) {
        const coder = await response.json()
        dispatch(createCoder(coder))
        return response
    }
}

//*************************************************************************** */

// -------------------------  EDIT A CODER    ----------------------------------

export const editCoder = (editCoderInfo) => async dispatch => {

    const response = await csrfFetch(`/api/coders/${editCoderInfo.id}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editCoderInfo)
    })

    if (response.ok) {
        const editedCoder = await response.json();
        dispatch(updateCoder(editedCoder))
        return editedCoder
    }
}

//*************************************************************************** */

// -------------------------  DELETE A CODER    --------------------------------
export const deleteCoder = (coderId) => async dispatch => {
    const response = await csrfFetch(`/api/coders/${coderId}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (response.ok) {
        dispatch(removeCoder(coderId))
        return response
    }
}




// *****************************************************************************
// ******************************* REDUCERS ************************************

const initialState = {}

const coderReducer = (state = initialState, action) => {

    let newState;
    // *****************************************************************************
    switch (action.type) {
        case GET_ALLCODERS:
            newState = {
                ...state
            }
            action.payload.Coders.forEach((coder) => {
                newState[coder.id] = coder
            });
            return newState
            // *****************************************************************************
            case GET_ONECODER:
                newState = {}

                newState[action.payload.id] = action.payload

                return { ...newState }

            // *****************************************************************************
        case CREATE_CODER:
            newState = {
                ...state
            }
            newState[action.payload.id] = action.payload
            return newState
            // *****************************************************************************
        case UPDATE_CODER:
            newState = {
                ...state
            }
            newState[action.payload.id] = action.payload

            return newState;


            // *****************************************************************************
        case DELETE_CODER:
            newState = {
                ...state
            }
            delete newState[action.payload]
            return newState
            // *****************************************************************************
        default:
            return state

    }
}
// *****************************************************************************
export default coderReducer
