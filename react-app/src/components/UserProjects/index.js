import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useParams, useHistory } from 'react-router-dom';
import { getprojects } from '../../store/projects';
import DeleteProjectForm from '../DeleteProjectForm';
import './UserProjects.css'


const UserProjects = () => {
    let dispatch = useDispatch();


    useEffect(() => {
        dispatch(getprojects())
    }, [dispatch])

    let allProjects = useSelector(state => Object.values(state.projects))

    let user = useSelector(state => state.session.user)

    if (!user) {
        return null
    }

    if (!allProjects) {
        return null
    }

    let userProjects = allProjects.filter(project => project.user_id === user.id)
    let completedProjects = userProjects.filter(project => project.completed === true)
    let upcomingProjects = userProjects.filter(project => project.completed === false)



    return (
        <>
            <div className='my-projects-page-container'>
                <div className='projects-container'>
                    <div className='upcoming-container'>
                        <h1 className='projects-title'>Upcoming Projects</h1>
                        <div>
                            {upcomingProjects.length > 0 ? upcomingProjects.map(project => {

                                return (
                                    <>
                                        <div className='project-card'>
                                            <div className='project-details-container'>
                                                <div className='detail-heading-user-proj'><strong>Project Name:</strong> {project.name}</div>
                                                <div className='detail-heading-user-proj'><strong>Start-Date:</strong> {project.start_date}</div >
                                                <div className='detail-heading-user-proj'><strong>End-Date:</strong> {project.end_date}</div>
                                                <div className='detail-heading-user-proj'><strong>Owner:</strong> {project.owner.first_name} {project.owner.last_name}</div>

                                                {/* <div className='detail-heading'>Coder: </div><div>{project.coder.user.first_name} {project.coder.user.last_name}</div>
                                            <div className = 'detail-heading' > Coder's Contact Info</div><div>{project.coder.user.email}</div> */}
                                            </div>
                                            <div className='projects-buttons-container'>
                                                <button className='delete-project-button'><NavLink to={`/projects/${project.id}/delete`}>Delete</NavLink></button>
                                                <button className='edit-delete-button'><NavLink to={`/projects/${project.id}/edit`}>Edit</NavLink></button>
                                                <button className='coder-profile-button'><NavLink to={`/coders/${project.coder_id}`}>See More Info About Your Coder</NavLink></button>
                                            </div>
                                        </div>
                                    </>
                                )
                            }) : (<h2>No Upcoming Projects!</h2>)}
                        </div>

                    </div>
                    <div className='completed-container'>
                        <h1 className='projects-title' >Completed Projects </h1>
                        {completedProjects.length ? completedProjects.map(project => {

                            return (
                                <>
                                    <div className='project-card'>
                                        <div className='project-details-container'>
                                            <div className='detail-heading-user-proj'><strong>Project Name:</strong> {project.name} </div>

                                            <div className='detail-heading-user-proj'><strong>Start-Date:</strong> {project.start_date} </div>

                                            <div className='detail-heading-user-proj'><strong>End-Date:</strong> {project.end_date} </div>

                                            <div className='detail-heading-user-proj'><strong>Owner:</strong> {project.owner.first_name} {project.owner.last_name}</div>

                                        </div>
                                        <div className='projects-buttons-container'>
                                            <button className='coder-profile-button'> <NavLink to={`/coders/${project.coder_id}`}>See More Info on your Coder</NavLink></button>
                                            <button className='edit-delete-button'><NavLink to={`/projects/${project.id}/delete`}>Delete</NavLink></button>
                                        </div>

                                    </div>

                                </>
                            )
                        }) : (<h2>You Haven't Completed Any Projects Yet</h2>)}

                    </div>
                </div>

            </div>
        </>
    )









}



export default UserProjects
