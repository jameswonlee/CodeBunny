// store > projects.js

import { csrfFetch } from "./csrf"

//action types

const READ = 'projects/READ'
const CREATE = 'projects/CREATE'
const DELETE = 'projects/DELETE'
const UPDATE = 'projects/UPDATE'

//action creators
const read = projects => ({
    type: READ,
    payload: projects
})

const create = project => ({
    type: CREATE,
    payload: project
})

const update = project => ({
    type: UPDATE,
    payload: project
})

const deleteAction = projectId => ({
    type: DELETE,
    payload: projectId
})

//thunks

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

export const createproject = (projectData, coderId, projectId) => async dispatch => {
    let newproject
    let response
    if (coderId === 0) {
        
        response = await csrfFetch('/api/projects/new-1/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectData)
        })

        newproject = await response.json()
        console.log("The new project is ", newproject)
        return newproject
    }
    else if(coderId && projectId) {
        console.log("did this reach 2nd thunk create proj")
        let coderInfoResponse
        let project

            coderInfoResponse = await csrfFetch(`/api/projects/new-2/${projectId}/${coderId}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(coderId)
            })

        

        if (coderInfoResponse.ok) {
            project = await coderInfoResponse.json()
            dispatch(create(project))
            return project
        }
    }
}

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

export const getprojects = () => async dispatch => {
    const response = await csrfFetch('/api/projects/')
    if(response.ok) {
        const projects = await response.json();
        dispatch(read(projects))
    }
}

const initialState = {}

const projectReducer = (state = initialState, action) => {

    let newState = {}
    switch(action.type) {
        case READ:
            newState = {...state}
            action.payload.Projects.forEach((project) => {
                newState[project.id] = project
            });
            return newState

        case UPDATE:
        case CREATE:
            newState = {...state}
            newState[action.payload.id] = action.payload
            return newState

        case DELETE:
            newState = {...state}
            delete newState[action.payload]
            return newState
    
        default:
            return state

    }
}

export default projectReducer