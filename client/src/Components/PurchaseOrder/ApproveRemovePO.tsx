import React, {FC} from "react";
import {PurchaseOrderType, setPOs} from "../../store/reducers/purchaseOrderSlice";
import {MaybeNull} from "../../helpers/productTypes";
import {useAppDispatch} from "../../helpers/helpers";
import {useNavigate} from "react-router-dom";
import checkoutStyle from "../Checkout/checkout.module.sass";
import s from "../Profile/profile.module.sass";
import {deletePO} from "../../api/apiFunctions";

const ApproveRemovePO: FC<{ po: PurchaseOrderType, setWarningModal: (val: MaybeNull<PurchaseOrderType>) => void }> = ({
                                                                                                                          po,
                                                                                                                          setWarningModal
                                                                                                                      }) => {
    const {_id, user_id, name} = po
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    return (
        <div className={checkoutStyle.notificationWrap}>
            <div className={checkoutStyle.notification}>
                <div className={s.approvalRemove}>
                    <h3>Delete "{name}" purchase order?</h3>
                    <div className={s.approvalRemoveButonset}>
                        <button className="button red small" onClick={() => {
                            deletePO(user_id, _id).then(po_res => {
                                setWarningModal(null)
                                if (po_res) {
                                    dispatch(setPOs(po_res));
                                    navigate(`/profile/purchase/`);
                                }
                            })
                        }}>Yes
                        </button>
                        <button className="button green small" onClick={() => setWarningModal(null)}>No</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ApproveRemovePO