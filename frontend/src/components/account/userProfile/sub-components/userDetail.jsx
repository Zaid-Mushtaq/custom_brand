import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import "../../../../sass/components/account/userProfile/userDetail.scss"
import { useNavigate } from "react-router-dom";

const UserDetail = ({ backToAccountLink, backToOrderHistoryLink }) => {
    const navigate = useNavigate();

    const handleLinkClick = () => {
        navigate(`/account`);
    }

    const handleorderHistoryLinkClick = () => {
        navigate(`/orders`);
    }

    return (
        <div className='common-detail-container'>
            {backToAccountLink && (
                <Link to='/account' className='common-new-add-link' onClick={handleLinkClick}>Back to My Account</Link>
            )}

            {backToOrderHistoryLink && (
                <Link to='/orders' className='common-new-add-link' onClick={handleorderHistoryLinkClick}>Back to Order History</Link>
            )}
        </div>
    )
}

export default UserDetail