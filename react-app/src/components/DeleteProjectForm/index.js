import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Redirect, Route, useHistory, useParams } from 'react-router-dom';
import {
    deleteproject,getprojects
} from '../../store/projects';



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

        await dispatch(deleteproject(projectId))
        await dispatch(getprojects())
        history.push("/current/user/projects")
    }

    //HANDLE CANCEL BUTTON CLICK EVENT
    const handleCancelClick = (e) => {
        e.preventDefault();

        history.push("/current/user/projects")
    };



    return (
        <>
            <form onSubmit={handleSubmit} className='delete-project-flex-container'>
                <h1>Are you sure you want to delete this project?</h1>
               <div className='delete-project-button-container'>
                    <button type="submit" >Yes, Remove This Project</button>
                    <button type="button" onClick={handleCancelClick}>No, Cancel</button>
                </div>

            </form>

        </>
    )
}

export default DeleteProjectForm;
