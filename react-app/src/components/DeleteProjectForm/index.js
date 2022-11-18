import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Redirect, Route, useHistory, useParams } from 'react-router-dom';
import {
    deleteproject,getprojects
} from '../../store/projects';
import './DeleteProjectForm.css'


const DeleteProjectForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    let { projectId } = useParams();
    projectId = parseInt(projectId)


    useEffect(() => {
        dispatch(getprojects());
    }, [useDispatch]);



    const handleSubmit = async (e) => {
        e.preventDefault();

        let deletedProject = await dispatch(deleteproject(projectId)).then(() => history.push("/current/user/projects"))
        if (deletedProject){
            dispatch(getprojects())

        }

    }



    //HANDLE CANCEL BUTTON CLICK EVENT
    const handleCancelClick = (e) => {
        e.preventDefault();

        history.push("/current/user/projects")
    };



    return (
        <>
            <form onSubmit={handleSubmit} className='delete-project-flex-container'>
                <h1 className='delete-project-header'>Are you sure you want to delete this project?</h1>
               <div className='delete-project-button-container'>
                    <button className='delete-project-button' type="submit" >Yes, Remove This Project</button>
                    <button className='cancel-delete-project-button'type="button" onClick={handleCancelClick}>No, Cancel</button>
                </div>

            </form>

        </>
    )
}

export default DeleteProjectForm;
