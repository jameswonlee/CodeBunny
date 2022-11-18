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
    // const [isLoaded, setIsLoaded] = useState(false)
    let { coderId } = useParams();
    coderId = parseInt(coderId)
    useEffect(() => {
        dispatch(loadAllCoders())
        dispatch(loadAllReviews())
        // dispatch(loadOneCoder(coderId))
    }, [dispatch, coderId])

    console.log('coderId', coderId)
    const sessionUser = useSelector(state => state.session.user);
    const reviewInfo = useSelector(state => state.reviews)
    const CodersUserId = useSelector(state => state.coders.user_id)
    let allCoders = useSelector(state => Object.values(state.coders))
    if (!allCoders) {
        return null
    }

    let currCoder = allCoders.filter(coder => coder.id === coderId)[0]
    console.log('currCoder', currCoder)





    if (!currCoder){
        return null
    }

    // if (!sessionUser){
    //     return null
    // }

    let sessionUserId;

    if (sessionUser) {
        sessionUserId = sessionUser.id
    }

    // console.log("this is UserId", sessionUser.id)

    // const reviewsData = useSelector(state => state.reviews);

    const reviewInfoArray = Object.values(reviewInfo)
    const reviewsByUserId = reviewInfoArray.filter(item => item.user_id === sessionUserId)
    const reviewsByCoderId = reviewsByUserId.filter(element => element.coder_id === +coderId)
    // const reviewOfUser = reviewsByUserId.find(element => element.userId === sessionUserId)
    // console.log("this is codersUserID", CodersUserId)
    // console.log("this si reviewsByCoderId", reviewsByCoderId)
    // console.log("this is reviewInfo", reviewInfo)
    // console.log("this is the Object values of review Info", reviewInfoArray)
    // console.log("this is reviewsByUserId", reviewsByUserId)


    let girlNames = ['Marnie']




    // let coder = allCoders.filter(coder => coder.id === coderId)
    // coder = coder[0]

    // console.log("CODER IS", coder)


    // if (!coder) {
    //     return null
    // }

    // if (!coder.user) {
    //     return null
    // }


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

    // let seeCreateUpdateButton;
    // seeCreateUpdateButton = (
    //     <div className='create-button-container'>
    //         <button className="Create-Review-Button" type="submit">Edit Your Profile!</button>
    //     </div>
    // )

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
if(currCoder){
    currCoderfirst_name = currCoder.user.first_name
    currCoderId = currCoder.id
    currCoderDailyRate = currCoder.daily_rate
}


    return (
        <>
            <div className="coder-detail-page-container">
                <div className='coder-container'>
                    <div className='coder-header-name-container'>
                        <h1 className="coder-info-title">{currCoder && currCoder.user.first_name} {currCoder && currCoder.user.last_name}</h1>
                    </div>

                    <div>
                        <img
                            width={300}
                            height={300}
                            src={`https://randomuser.me/api/portraits/${girlNames.includes(currCoderfirst_name) ? "women" : "men"}/${currCoderId}.jpg`}
                            alt="random portrait"
                            className="user-image">
                        </img>
                    </div>
                    <div className='coder-details'>
                        <div className='coder-details-headings'>CONTACT:</div>
                        {currCoder && currCoder.user.email}
                    </div>
                    <div className='coder-details'>
                        <div className='coder-details-headings'>BIO:</div>
                        {currCoder && currCoder.bio}
                    </div>
                    <div className='coder-details'>
                        <div className='coder-details-headings'>EXPERIENCE:</div>
                        {currCoder && currCoder.experience}
                    </div>
                    <div className='coder-details'>
                        <div className='coder-details-headings'>DAILY RATE:</div>
                        {`$${currCoderDailyRate}`}
                    </div>
                    <div className='coder-details'>
                        <div className='coder-details-headings'>SKILLS:</div>
                        {currCoder && currCoder.skills.map(skill => {
                            return (
                                <div key={skill.id}>{skill.skill_name}</div>
                            )
                        })}
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
                    <Reviews coderId={coderId} />
                </div>


            </div>

        </>

    )
}


export default CoderInfo;
