// store > projects.js

import { csrfFetch } from "./csrf"

const READ = 'projects/READ'
const READ_ONE = 'projects/READ_ONE'
const CREATE = 'projects/CREATE'
const DELETE = 'projects/DELETE'

const read = projects => ({
    type: READ,
    projects
})

const create = project => ({
    type: CREATE,
    project
})

const deleteAction = projectId => ({
    type: DELETE,
    projectId
})

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

export const createproject = (payload) => async dispatch => {

    const response = await csrfFetch('/api/projects/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })

    if(response.ok){
        dispatch(create(project))
        return project
    }
}

export const updateproject = (payload) => async dispatch => {

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

export const getprojects = () => async dispatch => {
    const response = await fetch('/api/projects')
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
            action.projects.forEach((project) => {
                newState[projects.id] = project
            });
            return newState

        case CREATE:
            newState = {...state}
            newState[action.project.id] = action.project
            return newState

        case DELETE:
            newState = {...state}
            delete newState[action.projectId]
            return newState

        default:
            return state

    }
}

export default projectReducer
