import React, {FC, useState} from 'react';
import {editPO, PurchaseOrderType} from "../../store/reducers/purchaseOrderSlice";
import s from "../Profile/profile.module.sass";
import {NavLink} from "react-router-dom";
import {textToLink, useAppDispatch, useAppSelector} from "../../helpers/helpers";
import {MaybeNull} from "../../helpers/productTypes";
import ApproveRemovePO from "../PurchaseOrder/ApproveRemovePO";
import {ReactComponent as ArchiveIcon} from '../../assets/img/svg/archive.svg'
import {editPOAPI} from "../../api/apiFunctions";
import {setUser} from "../../store/reducers/userSlice";

const ArchiveNavLink: FC<{ item: PurchaseOrderType}> = ({item}) => {
    const {name} = item;
    const user = useAppSelector(state => state.user.user);
    const dispatch = useAppDispatch();
    const [warningModal, setWarningModal] = useState<MaybeNull<PurchaseOrderType>>(null);



    const unarchivePO = async () => {
        const res = await editPOAPI({...item, is_archived: false});
        if (!res) return;
        dispatch(editPO(res))
        const has_archives = !!res.filter(po => po.is_archived).length
        user && dispatch(setUser({...user, has_archives}))
    }
    return (
        <>
            {warningModal ? <ApproveRemovePO po={warningModal} setWarningModal={setWarningModal}/> : null}
            <div className={s.linkWrap}>
                <button type="button" onClick={() => setWarningModal(item)} className={s.linkDelete}>
                    <div className={s.linkIcon}>&#10005;</div>
                </button>

                <button type="button" onClick={unarchivePO} className={s.linkUnarchive}>
                    <div className={s.linkIcon}><ArchiveIcon/></div>
                </button>
                <NavLink className={({isActive}) => [isActive ? s.linkActive : '', s.navItem].join(' ')}
                         to={`${textToLink(name)}/rooms`}>{name}</NavLink>
            </div>
        </>
    )
};

export default ArchiveNavLink;