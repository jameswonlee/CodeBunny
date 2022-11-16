import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useParams, useHistory } from 'react-router-dom';
import { getprojects } from '../../store/projects';



const UserProjects = () => {
let dispatch = useDispatch();


useEffect(()=>{
    dispatch(getprojects())
}, [])

 let user = useSelector(state => state.session.user)
 console.log("SESSIONUSER", user)
 let userId = user.id
 console.log("SESSIONUSER id", userId)


let allProjects = useSelector(state=>Object.values(state.projects))
let userProjects = allProjects.filter(project => project.user_id == userId)
let projects = useSelector(state=>state.projects)
// console.log(projects)



 return (
    <>
    <div>
        <h1>MY PROJECTS</h1>

    </div>

    </>
 )









}



export default UserProjects
