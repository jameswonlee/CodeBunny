import { useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import {getAllSpots} from '../../store/spotsReducer'
import "./HomePage.css"
import groupcoding from './Images/groupcoding.png'
import SearchBar from '../SearchBar/SearchBar'

const GetAllSpots = () => {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)

    // useEffect(() => {
    //     dispatch(getAllSpots())
    //         .then(() => setIsLoaded(true))
    // }, [dispatch])

    // const allSpots = useSelector(state => state.spots)
    // // console.log("this is state of spots", allSpots)
    // const allSpotsArray = Object.values(allSpots)
    // // console.log("this is allspots array", allSpotsArray)
    // if (!isLoaded){
    // return (<div>Loading...</div>)
    // }

    return (
        <div className="home-container">
            <div className= "image-one-container">
                <img src= {groupcoding} ></img>
            </div>
            <div><SearchBar/></div>
        </div>

    )
}

export default GetAllSpots
