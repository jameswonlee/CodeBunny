import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useParams } from 'react-router-dom';
import { loadOneCoder } from '../../store/coders';

const CoderInfo = () => {
    const dispatch = useDispatch();
    let { coderId } = useParams();
    coderId = parseInt(coderId)

    // useEffect(() => {

    //     dispatch(loadOneCoder(coderId))
    //     // dispatch(loadAllReviews(coderId))
    // }, [dispatch, coderId])

    return (<h1>KEER SAYS WASSUP</h1>)
}



export default CoderInfo;
