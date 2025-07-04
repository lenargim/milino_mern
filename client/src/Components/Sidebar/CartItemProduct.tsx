import React, {FC} from 'react';
import s from "./sidebar.module.sass";
import {getFraction} from "../../helpers/helpers";
import Dimentions from "../../common/Dimentions";
import {CartItemFrontType} from "../../helpers/cartTypes";
import CartItemChosenOptions from "./CartItemChosenOptions";

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
    const {indent:led_indent, alignment:led_alignment, border:led_border} = led;

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
            {led_border.length ?
                <div className={[s.itemOption, !isStandard.led ? s.itemOptionCustom:''].join(' ')}>
                    <span>LED:</span>
                    <span>{`${led_border.map(el => el)}. ${led_alignment} ${led_indent ? led_indent + '"' : ''}`}</span>
                </div> : null
            }
            {corner ?
                <div className={s.itemOption}>
                    <span>Corner:</span>
                    <span>{corner}</span>
                </div> : null
            }
            <CartItemChosenOptions options={options} glass={glass} isStandard={isStandard}/>
        </>
    )
}

export default CartItemProduct;