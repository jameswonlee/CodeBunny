import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {useDispatch, useSelector } from "react-redux"
import {createproject, getprojects} from "../../store/projects"
import { loadAllCoders } from "../../store/coders";
import { useParams } from 'react-router-dom';

function NewProjectConfirmation() {

    function to_integer(date){
        const dateArray = date.split("/")
        return 365*parseInt(dateArray[2]) + 100*parseInt(dateArray[1]) + parseInt(dateArray[0])
        }



    const history = useHistory()
    const dispatch = useDispatch();
    let {projectId} = useParams();
    projectId = parseInt(projectId)
    console.log("project id is ", projectId)
    console.log("project id is ", typeof(projectId))

    useEffect(() => {
        dispatch(getprojects())
    }, [dispatch])

    let allProjects = useSelector(state => Object.values(state.projects))
    console.log("All projects are", allProjects)
    let confirmProject = allProjects.filter(project => project.id === projectId)[0];
    console.log("current project is", confirmProject)

    //Date Conversion
    // let startDate = new Date(confirmProject.start_date).toLocaleDateString()
    // let endDate = new Date(confirmProject.end_date).toLocaleDateString()
    // let projectDays = to_integer(endDate)- to_integer(startDate) 
    // console.log("date converted to string is", startDate)

    let startDate = new Date(confirmProject.start_date).getTime()
    let endDate = new Date(confirmProject.end_date).getTime()
    let projectDays = ((endDate)-(startDate))/(1000 * 60 * 60 * 24)
    console.log("date converted to string is", projectDays)
    
    if(!allProjects) return null


  

    return (
        <div>
            <h1>Booked!</h1>
            <h3>Project Details:</h3>
            <div>Project Name: {confirmProject.name}</div>
            <div>Description: {confirmProject.description}</div>
            <div>Start Date: {confirmProject.start_date}</div>
            <div>End Date: {confirmProject.end_date}</div>
            <div>Coder Name: {confirmProject.coder.user.first_name} {confirmProject.coder.user.last_name}</div>
            <div>Coder Contact: {confirmProject.coder.user.email}</div>
            <div>Coder Rate: ${confirmProject.coder.daily_rate}</div>
            <div>Total days: {projectDays}</div>
            <div>Cost: ${confirmProject.coder.daily_rate * projectDays}</div> 
        </div>
    )


}

export default NewProjectConfirmation