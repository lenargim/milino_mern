import React, {FC} from 'react';
import s from "../Components/OrderForm/Sidebar/sidebar.module.sass";


const Dimentions:FC<{dimentions:string, isStandard?: boolean}> = ({dimentions, isStandard = true}) => {

    return (
        <>
            {dimentions ?
                <div className={[s.itemOption, !isStandard && s.itemOptionCustom].join(' ')}>
                    <span>Dimensions:</span>
                    <span>{dimentions}</span>
                </div> : null
            }
        </>
    )
};

export default Dimentions;