import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useParams, useHistory } from 'react-router-dom';
import { getprojects } from '../../store/projects';
import '../UserProjects/UserProjects.css'



const CoderJobs = () => {
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

let userProjects = allProjects.filter(project => project.coder_id === user.id)
let completedProjects = userProjects.filter(project => project.completed === true)
let upcomingProjects = userProjects.filter(project => project.completed === false)


 return (
<>
         <h1 className='user-projects-header'>{user.first_name}'s Jobs</h1>
            <div className='my-projects-page-container'>
                <div className='projects-container'>
                    <div className='upcoming-container'>
                        <h1 className='projects-title'>Upcoming Jobs</h1>
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
                                        {/* <NavLink to={`/coders/${project.coder_id}`}>See More Info on your Coder</NavLink>
                                        <NavLink to={`/projects/${project.id}/delete`}>Delete</NavLink> */}
                                        {/* <EditProjectForm /> */}
                                    </>
                                )
                            }) : (<h2>No Upcoming Jobs!</h2>)}
                        </div>

                    </div>
                    <div className='completed-container'>
                        <h1 className = 'projects-title' >Completed Jobs</h1>
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
                                        {/* <NavLink to={`/coders/${project.coder_id}`}>See More Info on your Coder</NavLink>
                                        <NavLink to={`/projects/${project.id}/delete`}>Delete</NavLink> */}
                                    </div>
                                </>
                            )
                        }) : (<h2>You Haven't Completed Any Jobs Yet</h2>) }

                    </div>
                </div>

            </div>
</>
 )









}



// }
// let userJobs = allProjects.filter(project => project.coder.user_id === user.id)
// // let coderUser = coder.user_id

// let completedJobs = userJobs.filter(project => project.completed === true)
// let upcomingJobs = userJobs.filter(project => project.completed === false)

// console.log("userJObs", userJobs)


// <div className='projects-container'>
//                     < div className = 'upcoming-container' >
//                         <h1 className = 'projects-title' >Upcoming Jobs </h1>
//                         {upcomingJobs.length? upcomingJobs.map(project=>{

//                             return(
//                                 <>
//                                     <div>
//                                         <div>Project Name: {project.name}</div>
//                                         <div>Start-Date:{project.start_date}</div>
//                                         <div>End-Date: {project.end_date}</div>
//                                         <div>Owner: {project.owner.first_name} {project.owner.last_name}</div>
//                                         <div>Owner's Contact Info: {project.owner.email}</div>
//                                         {<div>Coder: {project.coder.user.first_name} {project.coder.user.last_name}</div>
//                                         <NavLink to={`/coders/${project.coder_id}`}>See More Info on your Coder</NavLink>
//                                         <NavLink to={`/projects/${project.id}/delete`}>Delete</NavLink>
//                                     </div>
//                                 </>
//                             )
//                         }) : (<h2>No Upcoming Jobs!</h2>) }


//                     </div>
//                     < div className = 'completed-container' >
//                         <h1 className = 'projects-title' >Completed Jobs </h1>
//                         {completedJobs.length? completedJobs.map(project=>{

//                             return(
//                                 <>
//                                     <div>
//                                         <div>Project Name: {project.name}</div>
//                                         <div>Start-Date:{project.start_date}</div>
//                                         <div>End-Date: {project.end_date}</div>
//                                         <div>Owner: {project.owner.first_name} {project.owner.last_name}</div>
//                                         <div>Owner's Contact Info: {project.owner.email}</div>
//                                         {/* <div>Coder: {project.coder.user.first_name} {project.coder.user.last_name}</div> */}
//                                         <NavLink to={`/coders/${project.coder_id}`}>See More Info on your Coder</NavLink>
//                                         <NavLink to={`/projects/${project.id}/delete`}>Delete</NavLink>

//                                     </div>
//                                 </>
//                             )
//                         }) : (<h2>You haven't completed any jobs yet!</h2>) }


//                     </div>
//                 </div>



// )
//                     }

export default CoderJobs;
