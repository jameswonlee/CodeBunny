import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {useDispatch, useSelector } from "react-redux"
import {createproject} from "../../store/projects"
import { loadAllCoders } from "../../store/coders";

function SelectCoderForProject() {
    const history = useHistory()
    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(loadAllCoders())
    //   },[dispatch])

    let allCoders = useSelector(state => Object.values(state.coders))

    console.log("ALL CODERS IS", allCoders)

    const handleCoderSubmit = (coderId) => {

        console.log("Coder id being sent in is", coderId)

        dispatch(createproject(null, coderId))
    }

    return (
        <div>
        <h1>Select your coder:</h1>
            <div>
                {allCoders.map(coder => {
                    return (
                    <div>
                        <div>{coder.user.first_name}</div>
                        <button onClick = {handleCoderSubmit(coder.id)}>Choose this coder</button>
                    </div>
                    )
                })}

        </div>
        </div>

    )

}

export default SelectCoderForProject