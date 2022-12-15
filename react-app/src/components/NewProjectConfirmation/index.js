import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {useDispatch, useSelector } from "react-redux"
import {createproject, getprojects} from "../../store/projects"
import { loadAllCoders } from "../../store/coders";
import { useParams } from 'react-router-dom';
import './NewProjectConfirmation.css'
import dayjs from "dayjs"
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
    let allCoders = useSelector(state => Object.values(state.coders))

    //Date Conversion
    // let startDate = new Date(confirmProject.start_date).toLocaleDateString()
    // let endDate = new Date(confirmProject.end_date).toLocaleDateString()
    // let projectDays = to_integer(endDate)- to_integer(startDate)
    // console.log("date converted to string is", startDate)
    if(!allProjects) return null
    if(!confirmProject) return null
    let startDate = new Date(confirmProject.start_date).getTime()
    let endDate = new Date(confirmProject.end_date).getTime()
    let projectDays = ((endDate)-(startDate))/(1000 * 60 * 60 * 24)
    console.log("date converted to string is", projectDays)

    let coderId = confirmProject.coder_id
    console.log("coder id is", coderId)
    let coderDetails = allCoders.filter(coder => coder.id === coderId)[0]
    console.log("coder details is", coderDetails)





    const handleSubmit = () => {
        history.push("/current/user/projects")
    }


    return (
        <div className="confirmation-page-container">
            <h1>Booked!</h1>
        <div className="project-details-confirmation-container">
            <h3 className = "deets">Project Details:</h3>
            <div className = "project-stats"><strong>Project Name:</strong> {confirmProject.name}</div>
            <div className = "project-stats"><strong>Description:</strong> {confirmProject.description}</div>
            <div className = "project-stats"><strong>Start Date:</strong> {dayjs(confirmProject.start_date).format("MM-DD-YYYY")}</div>
            <div className = "project-stats"><strong>End Date:</strong> {dayjs(confirmProject.end_date).format("MM-DD-YYYY")}</div>
        {/* </div>
        <div className="project-details-confirmation-container"> */}
            <h3 className = "deets">Coder Details:</h3>
            <div className = "project-stats"><strong>Coder Name:</strong> {coderDetails && coderDetails.user.first_name} {coderDetails && coderDetails.user.last_name}</div>
            <div className = "project-stats"><strong>Coder Contact:</strong> {coderDetails && coderDetails.user.email}</div>
            <div className = "project-stats"><strong>Coder Rate:</strong> ${coderDetails && coderDetails.daily_rate}</div>
            <div className = "project-stats"><strong>Total days:</strong> {projectDays}</div>
            <div className = "project-stats"><strong>Cost:</strong> ${coderDetails && coderDetails.daily_rate * projectDays}</div>
        </div>
            <button className="looks-great-button" onClick = {() => handleSubmit() }>Looks Great!</button>
        </div>
    )


}

export default NewProjectConfirmation
