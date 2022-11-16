import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useParams, useHistory } from 'react-router-dom';
import { loadOneCoder, loadAllCoders, deleteCoder } from '../../store/coders';
import { loadAllReviews } from '../../store/reviews';
import Reviews from '../Reviews';
import './CoderInfo.css'



const CoderInfo = () => {
    const dispatch = useDispatch();
    // const [isLoaded, setIsLoaded] = useState(false)
    let { coderId } = useParams();
    coderId = parseInt(coderId)
    const sessionUser = useSelector(state => state.session.user);
    // console.log("this is UserId", sessionUser.id)
    const CodersUserId = useSelector(state => state.coders.user_id)
    // const reviewInfo = useSelector(state => state.reviews)
    // const reviewInfoArray = Object.values(reviewInfo)
    // const reviewsByUserId = reviewInfoArray.filter(item => item.coder_id === +coderId)
    // const reviewOfUser = reviewsByUserId.find(element => element.userId === sessionUserId)
    // console.log("this is codersUserID", CodersUserId)
    // console.log("this is reviewInfo", reviewInfo)
    // console.log("this is the Object values of review Info", reviewInfoArray)
    useEffect(() => {
        dispatch(loadAllCoders())
        dispatch(loadAllReviews())
        dispatch(loadOneCoder(coderId))
    }, [dispatch, coderId])

    let girlNames = ['Marnie']
    let sessionUserId
    if (sessionUser) {
        sessionUserId = sessionUser.id
    }

    const history = useHistory()
    let coder = useSelector(state=> state.coders)


    console.log("CODER IS", coder)

    if (!coder) {
        return null
    }

    if (!coder.user){
        return null
    }

    // let sessionUserId
    // if (sessionUser) {
    //     sessionUserId = sessionUser.id
    // }
    const deleteHandler = async (e) => {

        const payload = {
            id: coderId
        }
        let deletedCoder;
        deletedCoder = dispatch(deleteCoder(payload)).then(() => history.push("/")
        )
    }

    let deleteButton;
    if(sessionUser && sessionUser.id === CodersUserId) {
        deleteButton = (
            <div className= "Delete-spot-button">
                <button className= "Edit-Delete-Button" onClick= {() => deleteHandler()}>DELETE Coder Profile</button>
            </div>
        )
    } else {
        deleteButton = (
            <>
            </>
        )
    }
    let seeCreateReviewButton;
    seeCreateReviewButton = (
        <div>
            <button className="Create-Review-Button" type="submit">Create a New Review</button>
        </div>
    )

    return (
        <>
            <div className="coder-detail-page-container">
                <div className='coder-container'>
                    <div className='coder-header-name-container'>
                        <h1 className="coder-info-title">{coder.user.first_name} {coder.user.last_name}</h1>
                    </div>
                    <div>
                    {/* <NavLink to={`/review/${coderId}/new`}>
                                    {sessionUserId  && sessionUserId  !== spotInfoOwnerId && !reviewOfUser ? seeCreateReviewButton : null}
                                    </NavLink> */}
                    </div>

                    <NavLink to={`/review/${coderId}/new`}>
                         {seeCreateReviewButton}
                                    </NavLink>
                    
                    <div>
                    {deleteButton}
                    </div>
                    <div>
                       <img
                                width={300}
                                height={300}
                                src={`https://randomuser.me/api/portraits/${girlNames.includes(coder.user.first_name)? "women" : "men"}/${coder.id}.jpg`}
                                className="user-image">
                            </img>
                    </div>
                    <div className='coder-details'>
                        <div className='coder-details-headings'>CONTACT:</div>
                        {coder.user.email}
                    </div>
                    <div className='coder-details'>
                        <div className='coder-details-headings'>BIO:</div>
                        {coder.bio}
                    </div>
                    <div className='coder-details'>
                        <div className='coder-details-headings'>EXPERIENCE:</div>
                        {coder.experience}
                    </div>
                    <div className='coder-details'>
                         <div className='coder-details-headings'>DAILY RATE:</div>
                        {`$${coder.daily_rate}`}
                    </div>
                    <div className='coder-details'>
                        <div className='coder-details-headings'>SKILLS:</div>
                        {coder.skills.map(skill => {
                            return (
                                <div key={skill.id}>{skill.skill_name}</div>
                            )
                        })}
                    </div>

                </div>

                <div>
                    <Reviews />
                </div>
            </div>

        </>

    )
}


export default CoderInfo;
