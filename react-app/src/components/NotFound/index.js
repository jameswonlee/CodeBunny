// import { useEffect, useState} from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import "./NotFound.css"
// import groupcoding from './Images/groupcoding.png'
import notfoundimage from './Images/notfoundimage.png'


const NotFound = () => {
    // const dispatch = useDispatch()
    // const [isLoaded, setIsLoaded] = useState(false)



    return (
        <div className="home-container">
            <div className= "image-one-container">
                <img className= "group-coding" src= {notfoundimage} alt="404 no result" ></img>
            </div>
        </div>

    )
}

export default NotFound
