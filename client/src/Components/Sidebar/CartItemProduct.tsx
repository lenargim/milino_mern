import React, {FC} from 'react';
import s from "./sidebar.module.sass";
import {getFraction} from "../../helpers/helpers";
import Dimentions from "../../common/Dimentions";
import {CartItemFrontType} from "../../helpers/cartTypes";
import CartItemChosenOptions from "./CartItemChosenOptions";
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
        isStandard,
        custom
    } = product;
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
            <CartItemChosenOptions options={options} glass={glass} isStandard={isStandard}/>
            {
                custom?.accessories?.closet ? <div className={s.itemOption}>
                  <span>Closet Accessories:</span>
                  <span>{custom.accessories.closet}</span>
                </div> : null
            }
        </>
    )
}

export default CartItemProduct;