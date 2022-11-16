import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
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
      },[dispatch])

    let allCoders = useSelector(state => Object.values(state.coders))

    console.log("ALL CODERS IS", allCoders)

    const handleCoderSubmit = (coderId) => {

        console.log("Coder id being sent in is", coderId)
        console.log("project id being sent in is ", projectId)

        dispatch(createproject(0, coderId, projectId ))
        history.push(`/projects/confirmation/${projectId}`)
    }

    return (
        <div>
        <h1>Select your coder:</h1>
            <div>
                {allCoders.map(coder => {
                    return (
                    <div>
                        <div>{coder.user.first_name}</div>
                        <button onClick = {() => handleCoderSubmit(coder.id)}>Choose this coder</button>
                    </div>
                    )
                })}

        </div>
        </div>

    )

}

export default SelectCoderForProject