import React, {FC} from 'react';
import {RoomFront} from "../../helpers/roomTypes";
import {MaybeNull} from "../../helpers/productTypes";
import {textToLink, useAppDispatch} from "../../helpers/helpers";
import {useNavigate} from "react-router-dom";
import {removeRoom} from "../../store/reducers/roomSlice";
import checkoutStyle from "../Checkout/checkout.module.sass";
import s from "../Profile/profile.module.sass";

const PurchaseOrderApproveRemoveRoom: FC<{
    room: RoomFront,
    purchase_name: string,
    setWarningModal: (val: MaybeNull<RoomFront>) => void
}> = ({
          room,
          purchase_name,
          setWarningModal
      }) => {
    const {_id, purchase_order_id, name} = room
    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    const handleDelete = async () => {
        try {
            setWarningModal(null);
            await dispatch(removeRoom({purchase_order_id, _id})).unwrap();
            navigate(`/profile/purchase/${textToLink(purchase_name)}/rooms`);
        } catch (error) {
            console.error('Failed to delete room:', error);
        }
    };
    return (
        <div className={checkoutStyle.notificationWrap}>
            <div className={checkoutStyle.notification}>
                <div className={s.approvalRemove}>
                    <h3>Delete "{name}" room?</h3>
                    <div className={s.approvalRemoveButonset}>
                        <button className="button red small" onClick={handleDelete}>Yes
                        </button>
                        <button className="button green small" onClick={() => setWarningModal(null)}>No</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PurchaseOrderApproveRemoveRoom;