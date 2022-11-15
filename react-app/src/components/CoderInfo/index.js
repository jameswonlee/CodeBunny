import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useParams } from 'react-router-dom';
import { loadOneCoder, loadAllCoders } from '../../store/coders';

const CoderInfo = () => {
    const dispatch = useDispatch();
    // const [isLoaded, setIsLoaded] = useState(false)
    let { coderId } = useParams();
    coderId = parseInt(coderId)

    useEffect(() => {
        dispatch(loadAllCoders())
        dispatch(loadOneCoder(coderId))
    }, [dispatch, coderId])

    let girlNames = ['Marnie']


    let coder = useSelector(state=> state.coders)


    console.log("CODER IS", coder)

    if (!coder) {
        return null
    }

    if (!coder.user){
        return null
    }

    return (
        <>
            <div className="coder-detail-page-container">
                <div className='coder-header-container'>
                    <div className='spot-header-name-container'>
                        <h1>{coder.user.first_name} {coder.user.last_name}</h1>
                    </div>
                    <div>
                       <img
                                width={100}
                                height={100}
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
