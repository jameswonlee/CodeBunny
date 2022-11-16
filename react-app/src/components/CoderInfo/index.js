import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useParams } from 'react-router-dom';
import { loadOneCoder, loadAllCoders } from '../../store/coders';
import './CoderInfo.css'

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
                <div className='coder-container'>
                    <div className='coder-header-name-container'>
                        <h1 className="coder-info-title">{coder.user.first_name} {coder.user.last_name}</h1>
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
            </div>

        </>

    )
}


export default CoderInfo;
