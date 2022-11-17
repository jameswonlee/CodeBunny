import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useParams, useHistory } from 'react-router-dom';
import { loadAllReviews, deleteReview } from '../../store/reviews';


const Reviews = ({coderId}) => {
    const dispatch = useDispatch();
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user);
    const reviewsData = useSelector(state => state.reviews);
    const reviews = Object.values(reviewsData);
    const boyNames = ["Demo", "Marnie", "Bobbie"];
    console.log('reviews', reviews)

    useEffect(() => {
        dispatch(loadAllReviews());
    }, []);

    let sessionUserId
    if (sessionUser) {
        sessionUserId = sessionUser.id
    }
    console.log("this is sessionUserId", sessionUserId)
    const deleteReviewHandler = async (id) => {
        // e.preventDefault()
        // if (sessionUser.id === userId){
            const payload = {
                reviewId: id
            }
            let reviewToDelete;
            // reviewToDelete = dispatch(deleteReview(payload)).then(()=>dispatch(loadAllReviews())).then(() => history.push(`/coders/${coderId}`))
            reviewToDelete = await dispatch(deleteReview(payload)).then(()=>dispatch(loadAllReviews()))
        // } else {
        //     alert("You do not have permission to Delete this review")
        // }
    }
    console.log("reviews", reviews)
    return (
        <div className="reviews-container">
            <h2 className='review-header'>Reviews</h2>
            <div className="reviews">{reviews?.map((review, index) => (
                <div key={review.id} className="review-card">
                    <div className="user-photo">
                        <img
                            width={50}
                            height={50}
                            src={`https://randomuser.me/api/portraits/${boyNames.includes(review?.first_name) ? "women" : "men"}/${index + 1}.jpg`}
                            className="user-image">
                        </img>
                        <span className="review-user-name">{review.user?.first_name}</span>
                    </div>
                    <div className="review">
                        {review.review}
                    </div>

                            {sessionUser && sessionUserId === review.user_id ? <button className="Review-Delete-Button" onClick= {() => deleteReviewHandler(review.id)}>DELETE THIS Review</button>: null}

                         {/* <button className="Review-Delete-Button" onClick= {() => deleteReviewHandler(review.id)}>DELETE THIS Review</button> */}
                </div>
            ))}
            </div>
        </div>
    )
}


export default Reviews
