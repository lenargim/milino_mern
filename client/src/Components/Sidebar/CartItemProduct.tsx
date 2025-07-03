import React, {FC} from 'react';
import s from "./sidebar.module.sass";
import {getFraction} from "../../helpers/helpers";
import Dimentions from "../../common/Dimentions";
import {CartItemFrontType} from "../../helpers/cartTypes";
import CartItemLED from "./CartItemLED";

const CartItemProduct: FC<{ product: CartItemFrontType, dimensions: string }> = ({product, dimensions}) => {
    const {
        middle_section,
        blind_width,
        hinge,
        options,
        corner,
        led,
        glass,
        isStandard
    } = product;
    const {door:glass_door, shelf:glass_shelf} = glass

    return (
        <>
            <Dimentions dimensions={dimensions} isStandard={isStandard.dimensions}/>
            {blind_width ?
                <div className={[s.itemOption, !isStandard.blind ? s.itemOptionCustom:''].join(' ')}>
                    <span>Blind Width:</span>
                    <span>{getFraction(blind_width)}"</span>
                </div>
                : null}

            {middle_section ?
                <div className={[s.itemOption, !isStandard.middle ? s.itemOptionCustom:''].join(' ')}>
                    <span>Cutout Height:</span>
                    <span>{getFraction(middle_section)}"</span>
                </div> : null
            }
            {hinge ?
                <div className={s.itemOption}>
                    <span>Hinge opening:</span>
                    <span>{hinge}</span>
                </div> : null}
            {led && <CartItemLED led={led} />}
            {corner ?
                <div className={s.itemOption}>
                    <span>Corner:</span>
                    <span>{corner}</span>
                </div> : null
            }
            {options.length ?
                <>
                    <div>Options:</div>
                    {options.includes('Glass Door') ?
                        <div className={[s.itemOption, !isStandard.options ? s.itemOptionCustom:''].join(' ')}>
                            <span>Glass Door:</span>
                            <span>{glass_door.filter(el => !!el).join(', ')}</span>
                        </div> : null
                    }

                    {options.includes('Glass Shelf') ?
                        <div className={[s.itemOption, !isStandard.options ? s.itemOptionCustom:''].join(' ')}>
                            <span>Glass Shelf:</span>
                            <span>{glass_shelf}</span>
                        </div> : null
                    }

                    {options.filter(option => option !== 'Glass Door' && option !== 'Glass Shelf').map((el, index) =>
                        <div className={[s.itemOption, !isStandard.options ? s.itemOptionCustom:''].join(' ')} key={index}>
                            <span>{el}:</span>
                            <span>True</span>
                        </div>)}
                </> : null
            }
        </>
    )
}

export default CartItemProduct;