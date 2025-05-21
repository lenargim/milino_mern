import React, {FC} from 'react';
import s from "../Components/OrderForm/Sidebar/sidebar.module.sass";


const dimensions:FC<{dimensions:string, isStandard?: boolean}> = ({dimensions, isStandard = true}) => {
    return (
        <>
            {dimensions ?
                <div className={[s.itemOption, !isStandard && s.itemOptionCustom].join(' ')}>
                    <span>Dimensions:</span>
                    <span>{dimensions}</span>
                </div> : null
            }
        </>
    )
};

export default dimensions;