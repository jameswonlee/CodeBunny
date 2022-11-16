import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useParams, useHistory } from 'react-router-dom';
import { getprojects } from '../../store/projects';



const UserProjects = () => {
let dispatch = useDispatch();


useEffect(()=>{
    dispatch(getprojects())
}, [])
let allProjects = useSelector(state => Object.values(state.projects))


 let user = useSelector(state => state.session.user)
 console.log("SESSIONUSER", user)
//  let userId = user.id
 console.log("SESSIONUSER id", user.id)

if (!user) {
    return null
}


let userProjects = allProjects.filter(project => project.user_id === user.id)
let userJobs = allProjects.filter(project => project.coder.user.id === user.id)
console.log("userJObs", userJobs)

let completedProjects = userProjects.filter(project=> project.completed === true)
let upcomingProjects = userProjects.filter(project => project.completed === false)

 return (
    <>
        <div>
            <h1>{user.first_name}'s Upcoming Projects</h1>
            <div>
                {upcomingProjects.length? upcomingProjects.map(project=>{
                    console.log("THIS IS my owner PROJECT id!!!!!!!!!", project.owner_id)
                    return(
                        <>
                            <div>
                                <div>Project Name: {project.name}</div>
                                <div>Start-Date:{project.start_date}</div>
                                <div>End-Date: {project.end_date}</div>
                                <div>Owner: {project.owner.first_name} {project.owner.last_name}</div>
                                <div>Coder: {project.coder.user.first_name} {project.coder.user.last_name}</div>
                                <div>Coder's Contact Info: {project.coder.user.email}</div>
                            </div>
                        </>
                    )
                }) : (<h2>No Upcoming Projects!</h2>)}
            </div>



        </div>
         <div>
            <h1>{user.first_name}'s Completed Projects</h1>
            {completedProjects.map(project=>{

                return(
                    <>
                        <div>
                            <div>Project Name: {project.name}</div>
                            <div>Start-Date:{project.start_date}</div>
                            <div>End-Date: {project.end_date}</div>
                            <div>Owner: {project.owner.first_name} {project.owner.last_name}</div>
                            <div>Coder: {project.coder.user.first_name} {project.coder.user.last_name}</div>
                            <div>Coder's Contact Info: {project.coder.user.email}</div>
                        </div>
                    </>
                )
            })}


        </div>
        <div>
            <h1>{user.first_name}'s Jobs</h1>
            {userJobs.map(project=>{
                console.log("THIS IS my jobs", project)
                return(
                    <>
                        <div>
                            <div>Project Name: {project.name}</div>
                            <div>Start-Date:{project.start_date}</div>
                            <div>End-Date: {project.end_date}</div>
                            <div>Owner: {project.owner.first_name} {project.owner.last_name}</div>
                            <div>Owner's Contact Info: {project.owner.email}</div>
                            <div>Coder: {project.coder.user.first_name} {project.coder.user.last_name}</div>

                        </div>
                    </>
                )
            })}


        </div>

</>
 )









}



export default UserProjects
