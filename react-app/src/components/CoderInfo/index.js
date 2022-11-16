import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useParams, useHistory } from 'react-router-dom';
import { loadOneCoder, loadAllCoders, deleteCoder } from '../../store/coders';

const CoderInfo = () => {
    const dispatch = useDispatch();
    // const [isLoaded, setIsLoaded] = useState(false)
    let { coderId } = useParams();
    coderId = parseInt(coderId)
    const sessionUser = useSelector(state => state.session.user);
    // console.log("this is UserId", sessionUser.id)
    const CodersUserId = useSelector(state => state.coders.user_id)
    console.log("this is codersUserID", CodersUserId)
    useEffect(() => {
        dispatch(loadAllCoders())
        dispatch(loadOneCoder(coderId))
    }, [dispatch, coderId])

    let girlNames = ['Marnie']

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
    

    return (
        <>
            <div className="coder-detail-page-container">
                <div className='coder-header-container'>
                    <div className='spot-header-name-container'>
                        <h1>{coder.user.first_name} {coder.user.last_name}</h1>
                    </div>
                    <div>
                    {deleteButton}
                    </div>
                    <div>
                       <img
                                width={500}
                                height={500}
                                src={`https://randomuser.me/api/portraits/${girlNames.includes(coder.user.first_name)? "women" : "men"}/${coder.id}.jpg`}
                                className="user-image">
                            </img>
                    </div>
                    <div>
                        <div>CONTACT:</div>
                        {coder.user.email}
                    </div>
                    <div>
                        <div>BIO:</div>
                        {coder.bio}
                    </div>
                    <div>
                        <div>EXPERIENCE:</div>
                        {coder.experience}
                    </div>
                    <div>
                         <div>DAILY RATE:</div>
                        {coder.daily_rate}
                    </div>
                    <div>
                        <div>SKILLS:</div>
                        {coder.skills.map(skill => {
                            return (
                                <div key={skill.id}>{skill.skill_name}</div>
                            )
                        })}
                    </div>

                </div>
            </div>

        </>

    )
}


export default CoderInfo;