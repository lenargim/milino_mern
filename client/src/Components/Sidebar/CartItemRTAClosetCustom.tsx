import React, {FC} from 'react';
import s from "./sidebar.module.sass";
import {RTAClosetAPIType} from "../CustomPart/CustomPart";

const CartItemRTAClosetCustom: FC<{ rta_closet: RTAClosetAPIType[] }> = ({
                                                                                      rta_closet
                                                                                  }) => {
    return (
        <div className={s.blocks}>
            {rta_closet.length ?
                <div>
                    <div>RTA Closet additional parts:</div>
                    {rta_closet.map((el, index) => {
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

export default CartItemRTAClosetCustom