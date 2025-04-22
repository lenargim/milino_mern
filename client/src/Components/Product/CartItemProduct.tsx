import React, {FC} from 'react';
import s from "../OrderForm/Sidebar/sidebar.module.sass";
import {getFraction} from "../../helpers/helpers";
import {CartItemType} from "../../api/apiFunctions";
import Dimentions from "../../common/Dimentions";

const CartItemProduct: FC<{ product: CartItemType, dimentions: string }> = ({product, dimentions}) => {
    const {
        middle_section,
        blind_width,
        hinge,
        options,
        corner,
        glass_door,
        shelf_option,
        led_border,
        led_alignment,
        led_indent,
        isStandard
    } = product
    return (
        <>
            <Dimentions dimentions={dimentions} isStandard={isStandard.dimensions}/>
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
                            <span>{shelf_option}</span>
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