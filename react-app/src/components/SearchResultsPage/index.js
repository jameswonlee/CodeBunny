import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useParams, useHistory } from 'react-router-dom';
import { loadAllCoders } from '../../store/coders';

const SearchResultsPage = () => {
const dispatch = useDispatch()
const history = useHistory()

 useEffect(() => {
     dispatch(loadAllCoders())
     dispatch(getprojects())
 }, [dispatch])

 let allCoders = useSelector(state => Object.values(state.coders))

if (!allCoders) return null

// FILTER QUERY:
// let filteredCoders = allCoders.filter(coder=> coder.skills.includes(query) === True)

console.log("ALL CODERS IS", allCoders)




    return (
        <div>
        <h1>Select your coder:</h1>
            <div>
                {filteredCoders.map(coder => {
                    return (
                    <div className="coder-shortbio-container">
                        <div>{coder.user.first_name} {coder.user.last_name}</div>
                        <div>Bio: {coder.bio}</div>
                        <div>Experience: {coder.experience}</div>
                        <button><NavLink to={`/coders/${coder.id}`}>View Profile</NavLink></button>
                        <button onClick = {() => handleCoderSubmit(coder.id)}>Choose this coder</button>
                    </div>
                    )
                })}

        </div>
        </div>

    )



}



export default SearchResultsPage;
