import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useParams } from 'react-router-dom';
import { loadAllReviews } from '../../store/reviews';


const Reviews = () => {
    const dispatch = useDispatch();
    let { coderId } = useParams();
    const sessionUser = useSelector(state => state.session.user);
    const reviewsData = useSelector(state => state.reviews);
    const reviews = Object.values(reviewsData);
    const boyNames = ["Demo", "Marnie", "Bobbie"];
    console.log('reviews', reviews)

    useEffect(() => {
        dispatch(loadAllReviews());
    }, []);


    return (
        <div className="reviews-container">
            <h3>Reviews for </h3>
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
                    {/* {sessionUser?.id === review.User.id &&
                                <div className="delete-review-modal">
                                    <DeleteReviewModal review={review} />
                                </div>
                            } */}
                </div>
            ))}
            </div>
        </div>
    )
}


export default Reviews
