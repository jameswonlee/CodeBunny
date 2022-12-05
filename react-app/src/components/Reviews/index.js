import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useParams} from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
import { loadAllReviews, deleteReview } from '../../store/reviews';


const Reviews = ({ coderId }) => {
    const dispatch = useDispatch();
    // const history = useHistory()
    // let {coderId} = useParams()
    // coderId = parseInt(coderId)
    const sessionUser = useSelector(state => state.session.user);
    const reviewsData = useSelector(state => state.reviews);
    const reviews = Object.values(reviewsData);
    const boyNames = ["Demo", "Marnie", "Bobbie"];
    // console.log('reviews', reviews)

    let coderReviews = reviews.filter(review=>review.coder_id === coderId)
    useEffect(() => {
        dispatch(loadAllReviews());
    }, [dispatch]);

    let sessionUserId
    if (sessionUser) {
        sessionUserId = sessionUser.id
    }

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
    // console.log("reviews", reviews)
    return (
        <div className="reviews-container">
            <h2 className='review-header'>Reviews</h2>
            <div className="reviews">{coderReviews?.map((review, index) => (
            <>
                <div key={review.id} className="review-card">
                    <div className="user-photo">
                        <img
                            width={50}
                            height={50}
                            src={`https://randomuser.me/api/portraits/${boyNames.includes(review?.first_name) ? "women" : "men"}/${index + 50}.jpg`}
                            alt="random portrait"
                            className="user-image">
                        </img>
                        <div className="review-user-name">{review.user?.first_name}</div>
                    </div>
                    <div className="review">
                        {review.review}
                    </div>

                     {sessionUser && sessionUserId === review.user_id ? <button className="Review-Delete-Button" onClick= {() => deleteReviewHandler(review.id)}>Delete My Review</button>: null}

                </div>
            </>
            ))}
            </div>
        </div>

    )
}


export default Reviews
