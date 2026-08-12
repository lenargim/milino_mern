import React, {FC} from 'react';
import s from "../Profile/profile.module.sass";
import {RoomFront} from "../../helpers/roomTypes";
import {NavLink} from "react-router-dom";
import {textToLink} from "../../helpers/helpers";

const ArchiveRoomNavLink: FC<{ room: RoomFront }> = ({room}) => {
    const {name} = room;
    return (
        <div className={s.linkWrap}>
            <NavLink className={({isActive}) => [isActive ? s.linkActive : '', s.navItem].join(' ')}
                     to={textToLink(name)}>{name}</NavLink>
        </div>
    )
};

export default ArchiveRoomNavLink;