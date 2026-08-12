import React, {FC} from "react";
import {editPO, PurchaseOrderType} from "../../store/reducers/purchaseOrderSlice";
import {MaybeNull} from "../../helpers/productTypes";
import {textToLink, useAppDispatch, useAppSelector} from "../../helpers/helpers";
import {editPOAPI} from "../../api/apiFunctions";
import s from "../Profile/profile.module.sass";
import {NavLink} from "react-router-dom";
import {ReactComponent as ArchiveIcon} from '../../assets/img/svg/archive.svg'
import {setUser} from "../../store/reducers/userSlice";

const PurchaseOrderNavLink: FC<{
    item: PurchaseOrderType,
    setWarningModal: (val: MaybeNull<PurchaseOrderType>) => void,
    is_admin: boolean
}> = ({
          item,
          setWarningModal,
          is_admin
      }) => {
    const {name} = item;
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user.user);
    const archivePO = async () => {
        const res = await editPOAPI({...item, is_archived: true});
        if (!res) return;
        dispatch(editPO(res))
        const has_archives = !!res.filter(po => po.is_archived).length
        user && dispatch(setUser({...user, has_archives}))
    }

    return (
        <div className={s.linkWrap}>
            {!is_admin &&
                <>
                    <button type="button" onClick={() => setWarningModal(item)} className={s.linkDelete}>
                        <div className={s.linkIcon}>&#10005;</div>
                    </button>
                    <NavLink to={`${textToLink(name)}/edit`} className={s.linkEdit}>
                        <div className={s.linkIcon}>✎</div>
                    </NavLink>
                    <button type="button" onClick={archivePO} className={s.linkArchive}>
                        <div className={s.linkIcon}><ArchiveIcon /></div>
                    </button>
                </>
            }
            <NavLink className={({isActive}) => [isActive ? s.linkActive : '', s.navItem].join(' ')}
                     to={`${textToLink(name)}/rooms`}>{name}</NavLink>
        </div>
    )
}

export default PurchaseOrderNavLink;