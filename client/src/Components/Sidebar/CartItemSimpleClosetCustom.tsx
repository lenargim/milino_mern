import React, {FC} from 'react';
import s from "./sidebar.module.sass";
import {SimpleClosetAPIType} from "../CustomPart/CustomPart";

const CartItemSimpleClosetCustom: FC<{ simple_closet: SimpleClosetAPIType[] }> = ({
                                                                                      simple_closet
                                                                                  }) => {
    return (
        <div className={s.blocks}>
            {simple_closet.length ?
                <div>
                    <div>Simple Closet additional parts:</div>
                    {simple_closet.map((el, index) => {
                        if (!el.name) return null;
                        return (
                            <div key={index}>
                                <span className={s.itemOption}>
                                    <span>{el.name}</span>
                                    <span>Width: {el.width}. Amount: {el.qty}</span>
                                </span>
                            </div>)
                    })
                    }
                </div> : null
            }
        </div>
    );
};

export default CartItemSimpleClosetCustom