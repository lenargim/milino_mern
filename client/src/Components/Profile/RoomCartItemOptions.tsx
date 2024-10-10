import React, {FC} from 'react';
import {CartFront} from "../../api/apiFunctions";
import {Dimentions} from "../Product/CartItem";
import s from "../OrderForm/Sidebar/sidebar.module.sass";
import {getFraction} from "../../helpers/helpers";

const RoomCartItemOptions: FC<{ item: CartFront }> = ({item}) => {
    const {
        options,
        blind_width,
        width,
        room,
        image_active_number,
        door_option,
        shelf_option,
        _id,
        price,
        note,
        hinge,
        leather,
        corner,
        height,
        depth,
        led_border,
        led_alignment,
        led_indent,
        middle_section,
        amount,
        product_id,
        product_type,
        isStandardSize
    } = item
    return (
        <>
            <Dimentions width={width} depth={depth} height={height}/>
            {blind_width ?
                <div className={s.itemOption}>
                    <span>Blind Width:</span>
                    <span>{getFraction(blind_width)}</span>
                </div>
                : null}

            {middle_section ?
                <div className={s.itemOption}>
                    <span>Middle Section Height:</span>
                    <span>{getFraction(middle_section)}</span>
                </div> : null
            }
            {hinge ?
                <div className={s.itemOption}>
                    <span>Hinge opening:</span>
                    <span>{hinge}</span>
                </div> : null}
            {led_border.length ?
                <div className={s.itemOption}>
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
            {leather ?
                <div className={s.itemOption}>
                    <span>Leather:</span>
                    <span>{leather}</span>
                </div> : null
            }

            {options.length ?
                <>
                    <div>Options:</div>
                    {options.includes('Glass Door') ?
                        <div className={s.itemOption}>
                            <span>Glass Door:</span>
                            <span>{door_option.join('|')}</span>
                        </div> : null
                    }

                    {options.includes('Glass Shelf') ?
                        <div className={s.itemOption}>
                            <span>Glass Shelf:</span>
                            <span>{shelf_option.join('|')}</span>
                        </div> : null
                    }


                    {options.filter(option => option !== 'Glass Door' && option !== 'Glass Shelf').map((el, index) =>
                        <div className={s.itemOption} key={index}>
                            <span>{el}:</span>
                            <span>True</span>
                        </div>)}
                </> : null
            }
        </>
    );
};

export default RoomCartItemOptions;