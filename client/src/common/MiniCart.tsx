import React, {FC} from "react";
import s from "./Header/header.module.sass";
import CartSVG from "../assets/img/cart";

export const MiniCart: FC<{ length: number}> = ({length}) => {
    return (
        <div className={s.cart}>
            <CartSVG classes={s.cart}/>
            <span>{length}</span>
        </div>
    )
}