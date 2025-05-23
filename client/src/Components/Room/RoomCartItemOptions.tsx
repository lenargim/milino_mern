import React, {FC} from 'react';
import s from "../Sidebar/sidebar.module.sass";
import {getdimensionsRow, getFraction} from "../../helpers/helpers";
import Dimentions from "../../common/Dimentions";
import {CartItemFrontType} from "../../helpers/cartTypes";

const RoomCartItemOptions: FC<{ item: CartItemFrontType }> = ({item}) => {
    const {
        options,
        blind_width,
        width,
        hinge,
        corner,
        height,
        depth,
        middle_section,
        glass,
        led
    } = item;
    const {indent, alignment, border} = led;
    const {door:glass_door, shelf:glass_shelf} = glass;
    const dimensions = getdimensionsRow(width, height, depth)
    return (
        <>
            <Dimentions dimensions={dimensions}/>
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
            {border.length ?
                <div className={s.itemOption}>
                    <span>LED:</span>
                    <span>{`${border.map(el => el)}. ${alignment} ${indent ? indent + '"' : ''}`}</span>
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
                            <span>{glass_door.filter(el => !!el).join(', ')}</span>
                        </div> : null
                    }

                    {options.includes('Glass Shelf') ?
                        <div className={s.itemOption}>
                            <span>Glass Shelf:</span>
                            <span>{glass_shelf}</span>
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