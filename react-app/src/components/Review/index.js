import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useParams } from 'react-router-dom';
import { loadAllReviews } from '../../store/reviews';
// import { loadAllSpots, loadOneSpot } from '../../store/spots'
// import './ReviewsBrowser.css'

// REVIEWS FOR EACH SPOT
const ReviewsBrowser = () => {
    const dispatch = useDispatch(); // invoke dispatch
    let { coderId } = useParams(); // use params
    coderId = parseInt(coderId)
    console.log("hi")
 useEffect(() => {
        dispatch(loadAllReviews());
        // dispatch(loadOneSpot(spotId))
    }, [dispatch])

    // let currentCoder = useSelector(state => state.oder)
    // // currentCoder = currentCoder[coderId]

    // console.log(coderId)


    // const sessionUser = useSelector(state => state.session.user)
    // let userId;

    //   if (sessionUser) {
    //       let userId = sessionUser.id
    //   }


    const allReviews = useSelector(state => Object.values(state.reviews));
    console.log("allreviews", allReviews)

    // let filteredReviews = allReviews.filter(review => review.coder_Id === coderId)


    return ( <h1> KEER SAYS HI!!!</h1>)

            {/* (filteredReviews.map(review => {
                        return (
                                <>
                                    <div>{review.id}</div>
                                    <div>{review.user_id}</div>
                                    <div>{review.bio}</div>
                                    <div>{review.experience}</div>
                                    <div>{review.daily_rate}</div>
                                </>
                            )
             })) */}

    //  )
}


export default ReviewsBrowser
