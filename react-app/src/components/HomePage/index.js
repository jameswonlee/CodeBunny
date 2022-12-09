import { useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import "./HomePage.css"
// import groupcoding from './Images/groupcoding.png'
import whitebackground from './Images/whitebackground.png'
// import binary from './Images/binary.png'
import SearchBar from '../SearchBar/SearchBar'
import {loadAllCoders} from '../../store/coders'

const GetAllSpots = () => {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(loadAllCoders())
            .then(() => setIsLoaded(true))
    }, [dispatch])

    // const allSpots = useSelector(state => state.spots)
    // // console.log("this is state of spots", allSpots)
    // const allSpotsArray = Object.values(allSpots)
    // // console.log("this is allspots array", allSpotsArray)
    // if (!isLoaded){
    // return (<div>Loading...</div>)
    // }

    return (
        <div className="home-container">
            <div><SearchBar/></div>
        </div>

    )
}

export default GetAllSpots
