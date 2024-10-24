import React, {FC} from 'react';
import s from "../Components/OrderForm/Sidebar/sidebar.module.sass";

const Dimentions:FC<{dimentions:string}> = ({dimentions}) => {
    return (
        <>
            {dimentions ?
                <div className={s.itemOption}>
                    <span>Dimentions:</span>
                    <span>{dimentions}</span>
                </div> : null
            }
        </>
    )
};

export default Dimentions;