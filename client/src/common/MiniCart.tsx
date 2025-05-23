import React, {FC} from "react";
import {NavLink} from "react-router-dom";
import s from "./Header/header.module.sass";
import CartSVG from "../assets/img/cart";

export const MiniCart: FC<{ length: number, link: string }> = ({length, link}) => {
    return (
        <NavLink to={link} className={s.cart}>
            <CartSVG classes={s.cart}/>
            <span>{length}</span>
        </NavLink>
    )
}