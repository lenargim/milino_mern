import React, {FC} from 'react';
import s from "./sidebar.module.sass";
import {CartLEDAPI} from "../../helpers/cartTypes";

const CartItemLED: FC<{led: CartLEDAPI }> = ({led}) => {
    const {indent: led_indent, alignment: led_alignment, border: led_border} = led;
    return (
        <>
            {led_border.length ?
                <div className={[s.itemOption, s.itemOptionCustom].join(' ')}>
                    <span>LED:</span>
                    <span>{`${led_border.map(el => el)}. ${led_alignment} ${led_indent ? led_indent + '"' : ''}`}</span>
                </div> : null
            }
        </>
    )
}

export default CartItemLED;