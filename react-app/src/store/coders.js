// store > coders.js

import { csrfFetch } from "./csrf"

const READ = 'coders/READ'
const READ_ONE = 'coders/READ_ONE'
const CREATE = 'coders/CREATE'
const DELETE = 'coders/DELETE'

const read = coders => ({
    type: READ,
    coders
})

const create = coder => ({
    type: CREATE,
    coder
})

const deleteAction = coderId => ({
    type: DELETE,
    coderId
})

export const deleteCoder = (coderId) => async dispatch => {
    const response = await csrfFetch(`/api/coders/${coderId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if(response.ok) {
        dispatch(deleteAction(coderId))
        return response
    }
}

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

export const updateCoder = (payload) => async dispatch => {

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

export const getCoders = () => async dispatch => {
    const response = await fetch('/api/coders')
    if(response.ok) {
        const coders = await response.json();
        dispatch(read(coders))
    }
}

const initialState = {}

const coderReducer = (state = initialState, action) => {

    let newState = {}
    switch(action.type) {
        case READ:
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
