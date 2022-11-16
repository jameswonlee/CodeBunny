import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {useDispatch, useSelector } from "react-redux"
import {createproject, getprojects} from "../../store/projects"
import { loadAllCoders } from "../../store/coders";
import { useParams } from 'react-router-dom';

function NewProjectConfirmation() {

    const history = useHistory()
    const dispatch = useDispatch();
    const {projectId} = useParams();

    useEffect(() => {
        dispatch(getprojects())
    }, [dispatch])

    let allProjects = useSelector(state => Object.values(state.projects))

    console.log("All projects are", allProjects)

    return (
        <div>
            <h1>Booked!</h1>
            
            
        </div>
    )


}

export default NewProjectConfirmation