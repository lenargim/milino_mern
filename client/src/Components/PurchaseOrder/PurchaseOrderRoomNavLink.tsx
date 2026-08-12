import React, {FC} from 'react';
import {RoomFront} from "../../helpers/roomTypes";
import {MaybeNull} from "../../helpers/productTypes";
import {NavLink} from "react-router-dom";
import {textToLink} from "../../helpers/helpers";
import s from './../Profile/profile.module.sass'

const PurchaseOrderRoomNavLink: FC<{
    room: RoomFront,
    setWarningModal: (val: MaybeNull<RoomFront>) => void,
    is_admin: boolean
}> = ({
          room,
          setWarningModal,
          is_admin
      }) => {
    const {name} = room
    return (
        <div className={s.linkWrap}>
            {!is_admin && <button type="button" onClick={() => setWarningModal(room)} className={s.linkDelete}>
                <span>&#10005;</span></button>}
            <NavLink to={`${textToLink(name)}/edit`} className={s.linkEdit}><span>✎</span></NavLink>
            <NavLink className={({isActive}) => [isActive ? s.linkActive : '', s.navItem].join(' ')}
                     to={textToLink(name)}>{name}</NavLink>
        </div>
    )
}

export default PurchaseOrderRoomNavLink;