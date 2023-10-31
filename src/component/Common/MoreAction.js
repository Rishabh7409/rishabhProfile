import React, { useState } from 'react';
import { IoOptionsOutline } from 'react-icons/io5'

const MoreAction = ({
    children
}) => {
    const [searchShow, setsearchShow] = useState(false);

    return (
        <>
            {/* <div className="d-block d-md-none text-right">
                <IoOptionsOutline onClick={() => { setsearchShow(!searchShow) }} />
                {searchShow && children
                }
            </div> */}
            <div className="d-none d-md-block">
                {children}
            </div>
        </>
    )
}

export default MoreAction;