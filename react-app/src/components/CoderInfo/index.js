import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import { loadOneCoder, loadAllCoders, deleteCoder } from '../../store/coders';
import { loadAllReviews } from '../../store/reviews';
import Reviews from '../Reviews';
import './CoderInfo.css'




const CoderInfo = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    let { coderId } = useParams();
    coderId = parseInt(coderId)
    useEffect(() => {
        dispatch(loadAllCoders())
        dispatch(loadAllReviews())
    }, [dispatch, coderId])

    const sessionUser = useSelector(state => state.session.user);
    const reviewInfo = useSelector(state => state.reviews)
    const CodersUserId = useSelector(state => state.coders.user_id)
    let allCoders = useSelector(state => Object.values(state.coders))
    if (!allCoders) {
        return null
    }

    let currCoder = allCoders.filter(coder => coder.id === coderId)[0]

    if (!currCoder) {
        return null
    }

    let sessionUserId;

    if (sessionUser) {
        sessionUserId = sessionUser.id
    }

    const reviewInfoArray = Object.values(reviewInfo)
    const reviewsByUserId = reviewInfoArray.filter(item => item.user_id === sessionUserId)
    const reviewsByCoderId = reviewsByUserId.filter(element => element.coder_id === +coderId)

    let girlNames = ['Marnie']


    const deleteHandler = async (e) => {

        const payload = {
            id: coderId
        }
        let deletedCoder;
        deletedCoder = dispatch(deleteCoder(payload)).then(() => dispatch(loadAllCoders())).then(() => history.push("/")
        )
    }

    let deleteButton;
    if (sessionUser && sessionUser.id === currCoder.user_id) {
        deleteButton = (
            < div className="Edit-Delete-Button-container" >
                <button className="Edit-Delete-Button" onClick={() => deleteHandler()}>Remove My Profile</button>
            </div>
        )
    } else {
        deleteButton = (
            <>
            </>
        )
    }
    let seeCreateReviewButton;
    if (sessionUser && currCoder.user_id !== sessionUserId) {
        seeCreateReviewButton = (
            <div className='create-button-container'>
                <button className="Create-Review-Button" type="submit">Leave A Review!</button>
            </div>
        )
    } else {
        <>
        </>
    }

    let editButton;
    if (sessionUser && sessionUser.id === currCoder.user_id) {
        editButton = (
            < div className="Edit-Delete-Button-container" >
                <button className="Edit-Delete-Button" onClick={() => history.push(`/coder/${coderId}/edit`)}>Edit My Profile</button>
            </div>
        )
    } else {
        editButton = (
            <>
            </>
        )
    }
    let currCoderfirst_name
    let currCoderId
    let currCoderDailyRate
    if (currCoder) {
        currCoderfirst_name = currCoder.user.first_name
        currCoderId = currCoder.id
        currCoderDailyRate = currCoder.daily_rate
    }


    return (
        <>
            <div className="coder-detail-page-container">
                <div className='coder-container'>
                    <div className='coder-profile-image-name-container'>
                        <div>
                            <img
                                width={300}
                                height={300}
                                src={`https://randomuser.me/api/portraits/${girlNames.includes(currCoderfirst_name) ? "women" : "men"}/${currCoderId}.jpg`}
                                alt="random portrait"
                                className="coder-user-image">
                            </img>
                        </div>

                        <div className='coder-header-name-container'>
                            <h1 className="coder-info-title">{currCoder && currCoder.user.first_name} {currCoder && currCoder.user.last_name}</h1>
                        </div>

                    </div>
                    <div className='coder-details'>
                        <div className='coder-details-headings'>Contact</div>
                        <div className='coder-details-content'> {currCoder && currCoder.user.email}</div>
                    </div>
                    <div className='coder-details'>
                        <div className='coder-details-headings'>Bio:</div>
                        <div className='coder-details-content'>{currCoder && currCoder.bio}</div>
                    </div>
                    <div className='coder-details'>
                        <div className='coder-details-headings'>Experience</div>
                        <div className='coder-details-content'>{currCoder && currCoder.experience}</div>
                    </div>
                    <div className='coder-details'>
                        <div className='coder-details-headings'>Daily Rate</div>
                        <div className='coder-details-content'>{`$${currCoderDailyRate}`}</div>
                    </div>
                    <div className='coder-details'>
                        <div className='coder-details-headings'>Skills</div>
                        <div className='coder-details-content'>{currCoder && currCoder.skills.map(skill => {
                            return (
                                <div key={skill.id}>{skill.skill_name} </div>
                            )
                        })}
                        </div>
                    </div>
                    <NavLink to={`/review/${coderId}/new`}>
                        {/* {sessionUserId && reviewsByCoderId.length === 0 ? seeCreateReviewButton : null} */}
                        {seeCreateReviewButton}
                    </NavLink>

                    <div>

                        {/* <NavLink to={`/review/${coderId}/new`}>
                                    {sessionUserId  && !reviewsByUserId && sessionUserId  !== spotInfoOwnerId ? seeCreateReviewButton : null}
                                    </NavLink> */}
                        {editButton}
                        {deleteButton}

                    </div>

                </div>

                <div>
                    <Reviews coderName={currCoder.user.first_name} coderId={coderId} />
                </div>


            </div>

        </>

    )
}


export default CoderInfo;
