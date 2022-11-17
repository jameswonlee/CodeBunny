import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useParams, useHistory } from 'react-router-dom';
import { getprojects } from '../../store/projects';
import DeleteProjectForm from '../DeleteProjectForm';
import './UserProjects.css'


const UserProjects = () => {
let dispatch = useDispatch();


useEffect(()=>{
    dispatch(getprojects())
}, [dispatch])
let allProjects = useSelector(state => Object.values(state.projects))


 let user = useSelector(state => state.session.user)
//  console.log("SESSIONUSER", user)
// //  let userId = user.id
//  console.log("SESSIONUSER id", user.id)

if (!user) {
    return null
}
if (!allProjects) {
    return null
}


let userProjects = allProjects.filter(project => project.user_id === user.id)


let completedProjects = userProjects.filter(project=> project.completed === true)
let upcomingProjects = userProjects.filter(project => project.completed === false)



 return (
<>
         <h1 className='user-projects-header'>{user.first_name}'s Projects & Jobs</h1>
            <div className='my-projects-page-container'>
                <div className='projects-container'>
                    <div className='upcoming-container'>
                        <h1 className='projects-title'>Upcoming Projects</h1>
                        <div>
                            {upcomingProjects.length > 0 ? upcomingProjects.map(project=>{

                                return(
                                    <>
                                        <div>
                                            <div className='detail-heading'>Project Name:</div><div>{project.name}</div>
                                            <div className = 'detail-heading'>Start-Date:</div><div>{project.start_date}</div >
                                            <div className='detail-heading'>End-Date:</div><div>{project.end_date}</div>
                                            <div className='detail-heading'>Owner:</div><div>{project.owner.first_name} {project.owner.last_name}</div>

                                            {/* <div className='detail-heading'>Coder: </div><div>{project.coder.user.first_name} {project.coder.user.last_name}</div>
                                            <div className = 'detail-heading' > Coder's Contact Info</div><div>{project.coder.user.email}</div> */}
                                        </div>
                                        <NavLink to={`/coders/${project.coder_id}`}>See More Info on your Coder</NavLink>
                                        <NavLink to={`/projects/${project.id}/delete`}>Delete</NavLink>
                                        {/* <EditProjectForm /> */}
                                    </>
                                )
                            }) : (<h2>No Upcoming Projects!</h2>)}
                        </div>

                    </div>
                    <div className='completed-container'>
                        <h1 className = 'projects-title' >Completed Projects </h1>
                        {completedProjects.length? completedProjects.map(project=>{

                            return(
                                <>
                                    <div>
                                        <div>Project Name: {project.name}</div>
                                        <div>Start-Date:{project.start_date}</div>
                                        <div>End-Date: {project.end_date}</div>
                                        <div>Owner: {project.owner.first_name} {project.owner.last_name}</div>
                                        {/* <div>Coder: {project.coder.user.first_name} {project.coder.user.last_name}</div>
                                        <div>Coder's Contact Info: {project.coder.user.email}</div> */}
                                        <NavLink to={`/coders/${project.coder_id}`}>See More Info on your Coder</NavLink>
                                        <NavLink to={`/projects/${project.id}/delete`}>Delete</NavLink>
                                    </div>
                                </>
                            )
                        }) : (<h2>You Haven't Completed Any Projects Yet</h2>) }

                    </div>
                </div>

            </div>
</>
 )









}



export default UserProjects
