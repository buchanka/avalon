import React from 'react';
import { FaHeart } from "react-icons/fa";
import { IconContext } from "react-icons";

function FavoriteIconFullSmall(){
    return(
        <IconContext.Provider
        value={{color: 'red', size:'28px'}}
        >
            <div>
                <FaRegHeart/>
            </div>
        </IconContext.Provider>
    );
}

export default FavoriteIconFullSmall