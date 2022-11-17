import { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import {useDispatch, useSelector } from "react-redux"
import {createproject, getprojects} from "../../store/projects"
import { loadAllCoders } from "../../store/coders";
import { useParams } from 'react-router-dom';

function SelectCoderForProject() {
    const history = useHistory()
    const dispatch = useDispatch();
    const {projectId} = useParams();

    useEffect(() => {
        dispatch(loadAllCoders())
        dispatch(getprojects())
      },[dispatch])

    let allCoders = useSelector(state => Object.values(state.coders))


    if(!allCoders) return null


    console.log("ALL CODERS IS", allCoders)

    const handleCoderSubmit = (coderId) => {

        // console.log("Coder id being sent in is", coderId)
        // console.log("project id being sent in is ", projectId)

        dispatch(createproject(0, coderId, projectId ))
        history.push(`/projects/confirmation/${projectId}`)
    }

    return (
        <div className="select-coder-page-container">
        <h1>Select your coder:</h1>
            <div className="coder-cards-container">
                {allCoders.map(coder => {
                    return (
                    <div className="coder-shortbio-container">
                        <div>{coder.user.first_name} {coder.user.last_name}</div>
                        <div>Bio: {coder.bio}</div>
                        <div>Experience: {coder.experience}</div>
                        <button className="view-coder-profile-button"><NavLink className="view-coder-profile-button" to={`/coders/${coder.id}`}>View Profile</NavLink></button>
                        <button className = 'choose-coder-profile-button' onClick = {() => handleCoderSubmit(coder.id)}>Choose this coder</button>
                    </div>
                    )
                })}

        </div>
        </div>

    )

}

export default SelectCoderForProject
