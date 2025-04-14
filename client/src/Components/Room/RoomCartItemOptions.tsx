import React, {FC} from 'react';
import {CartItemType} from "../../api/apiFunctions";
import s from "../OrderForm/Sidebar/sidebar.module.sass";
import {getDimentionsRow, getFraction} from "../../helpers/helpers";
import Dimentions from "../../common/Dimentions";

const RoomCartItemOptions: FC<{ item: CartItemType }> = ({item}) => {
    const {
        options,
        blind_width,
        width,
        door_option,
        shelf_option,
        hinge,
        corner,
        height,
        depth,
        led_border,
        led_alignment,
        led_indent,
        middle_section,
    } = item;
    const dimentions = getDimentionsRow(width, height, depth)
    return (
        <>
            <Dimentions dimentions={dimentions}/>
            {blind_width ?
                <div className={s.itemOption}>
                    <span>Blind Width:</span>
                    <span>{getFraction(blind_width)}</span>
                </div>
                : null}

            {middle_section ?
                <div className={s.itemOption}>
                    <span>Cutout Height:</span>
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
            {options.length ?
                <>
                    <div>Options:</div>
                    {options.includes('Glass Door') ?
                        <div className={s.itemOption}>
                            <span>Glass Door:</span>
                            <span>{door_option.filter(el => !!el).join(', ')}</span>
                        </div> : null
                    }

                    {options.includes('Glass Shelf') ?
                        <div className={s.itemOption}>
                            <span>Glass Shelf:</span>
                            <span>{shelf_option}</span>
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