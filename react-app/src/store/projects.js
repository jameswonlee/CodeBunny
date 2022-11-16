// store > projects.js

import { csrfFetch } from "./csrf"
// *****************************************************************************
//****************************** ACTION CREATORS *******************************
//action types

const READ = 'projects/READ'
const CREATE = 'projects/CREATE'
const DELETE = 'projects/DELETE'
const UPDATE = 'projects/UPDATE'
///*************************************************************************** */
//action creators
const read = projects => ({
    type: READ,
    payload: projects
})
///*************************************************************************** */
const create = project => ({
    type: CREATE,
    payload: project
})
///*************************************************************************** */
const update = project => ({
    type: UPDATE,
    payload: project
})
///*************************************************************************** */
const deleteAction = projectId => ({
    type: DELETE,
    payload: projectId
})


// *****************************************************************************
//************************************ THUNKS **********************************
//*************************************************************************** */

// -------------------------  DELETE PROJECT   -------------------------
export const deleteproject = (projectId) => async dispatch => {
    const response = await csrfFetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if(response.ok) {
        dispatch(deleteAction(projectId))
        return response
    }
}
//*************************************************************************** */

// -------------------------  CREATE PROJECT  -------------------------
export const createproject = (projectData, coderData = []) => async dispatch => {
    let response
    if (!coderData) {

        response = await csrfFetch('/api/projects/new-1/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectData)
        })
    }
    else {
        let coderInfoResponse
        let project

        if (response.ok) {

            coderInfoResponse = await csrfFetch('/api/projects/new-2/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(coderData)
            })

        }

        if (coderInfoResponse.ok) {
            project = await coderInfoResponse.json()
            dispatch(create(project))
            return project
        }
    }
}
//*************************************************************************** */

// -------------------------  UPDATE PROJECT   -------------------------
export const updateproject = (payload) => async dispatch => {

    const response = await csrfFetch(`/api/projects/${payload.id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })

    if(response.ok) {
        const project = await response.json();
        dispatch(update(project))
        return project
    }
}

//*************************************************************************** */

// ------------------------- GET ALL PROJECTS  -------------------------
export const getprojects = () => async dispatch => {
    const response = await csrfFetch('/api/projects/')
    if(response.ok) {
        const projects = await response.json();
        dispatch(read(projects))
    }
}



// *****************************************************************************
// ******************************* REDUCERS ************************************

const initialState = {}

const projectReducer = (state = initialState, action) => {

    let newState = {}
        // *****************************************************************************
    switch(action.type) {

        case READ:
            newState = {...state}
            console.log("THIS IS proj payload reducer", action.payload.Projects)
            action.payload.Projects.forEach((project) => {
                newState[project.id] = project
            });

            return newState
    // *****************************************************************************
        case UPDATE:
    // *****************************************************************************
        case CREATE:
            newState = {...state}
            newState[action.payload.id] = action.payload
            return newState
    // *****************************************************************************
        case DELETE:
            newState = {...state}
            delete newState[action.payload]
            return newState
    // *****************************************************************************
        default:
            return state
    // *****************************************************************************
    }
}

// *****************************************************************************
export default projectReducer