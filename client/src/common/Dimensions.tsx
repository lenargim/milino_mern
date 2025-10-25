import React, {FC} from 'react';
import s from "../Components/Sidebar/sidebar.module.sass";
import {IsStandardDimentionsType} from "../helpers/cartTypes";
import {getFraction} from "../helpers/helpers";


const Dimensions: FC<{ width: number, height: number, depth: number, isStandard?: IsStandardDimentionsType }> = ({
                                                                                                                     width,
                                                                                                                     height,
                                                                                                                     depth,
                                                                                                                     isStandard = {}
                                                                                                                 }) => {
    if (!width && !height && !depth) return null;
    const anyNotStandard = Object.values(isStandard).some(value => !value);
    const widthPart = width ? `${getFraction(width)}"W x` : '';
    const heightPart = height ? ` ${getFraction(height)}"H` : '';
    const depthPart = depth && depth > 1 ? ` x ${getFraction(depth)}"D` : '';
    return (
        <div className={[s.itemOption].join(' ')}>
            <span className={[anyNotStandard && 'red'].join(' ')}>Dimensions:</span>
            <span>
                        <span className={[!isStandard.width && s.itemOptionCustom].join(' ')}>{widthPart}</span>
                        <span className={[!isStandard.height && s.itemOptionCustom].join(' ')}>{heightPart}</span>
                        <span className={[!isStandard.depth && s.itemOptionCustom].join(' ')}>{depthPart}</span>
                    </span>
        </div>
    )
};

export default Dimensions;
