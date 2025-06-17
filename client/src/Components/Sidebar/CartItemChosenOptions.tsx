import React, {FC} from 'react';
import s from "./sidebar.module.sass";
import {MaybeUndefined} from "../../helpers/productTypes";
import {GlassAPIType, IsStandardOptionsType} from "../../helpers/cartTypes";

const CartItemChosenOptions: FC<{ options: string[], glass: MaybeUndefined<GlassAPIType>,isStandard:IsStandardOptionsType }> = ({options, glass, isStandard}) => {
    if (!options.length) return null;
    const showGlassDoorBlock = options.includes('Glass Door') && glass && glass.door;
    const showGlassShelfBlock = options.includes('Glass Shelf') && glass && glass.shelf;
    return (
        <>
            <div>Options:</div>
            {showGlassDoorBlock ?
                <div className={[s.itemOption, !isStandard.options ? s.itemOptionCustom : ''].join(' ')}>
                    <span>Glass Door:</span>
                    <span>{glass?.door?.filter(el => !!el).join(', ')}</span>
                </div> : null
            }

            {showGlassShelfBlock ?
                <div className={[s.itemOption, !isStandard.options ? s.itemOptionCustom : ''].join(' ')}>
                    <span>Glass Shelf:</span>
                    <span>{glass?.shelf}</span>
                </div> : null
            }

            {options.filter(option => option !== 'Glass Door' && option !== 'Glass Shelf').map((el, index) =>
                <div className={[s.itemOption, !isStandard.options ? s.itemOptionCustom : ''].join(' ')} key={index}>
                    <span>{el}:</span>
                    <span>True</span>
                </div>)}
        </>
    );
};

export default CartItemChosenOptions;