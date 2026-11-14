import React, {FC, MutableRefObject, useEffect, useState} from 'react';
import s from "./checkout.module.sass";
import {ButtonType, CheckoutFormType} from "./CheckoutForm";
import {useFormikContext} from "formik";
import {MaybeNull} from "../../helpers/productTypes";
import {getPurchaseRoomsOrderAmount} from "../../api/apiFunctions";


type CheckoutButtonRowType = {
    clickedButtonRef: MutableRefObject<MaybeNull<ButtonType>>,
    handleSubmit: (values: CheckoutFormType) => Promise<void>,
    purchase_order_id: string
}
const CheckoutButtonRow: FC<CheckoutButtonRowType> = ({clickedButtonRef, handleSubmit, purchase_order_id}) => {
        const {values, isSubmitting, validateForm, setTouched} = useFormikContext<CheckoutFormType>();
        const [showPOButton, setShowPOButton] = useState<boolean>(false)

        const customSubmitHandler = async (e: React.MouseEvent<HTMLButtonElement>, buttonType: ButtonType) => {
            e.preventDefault();
            const errors = await validateForm();
            const hasErrors = Object.keys(errors).length > 0;
            clickedButtonRef.current = buttonType;

            if (hasErrors) {
                const firstErrorField = Object.keys(errors)[0] as keyof CheckoutFormType;
                const errorElement = document.getElementsByName(firstErrorField)[0];
                if (errorElement) {
                    setTouched({
                        name: true,
                        company: true,
                        email: true,
                        phone: true,
                        purchase_order: true,
                        room_name: true,
                        delivery: true,
                        files: true
                    }, true)
                    errorElement.scrollIntoView({behavior: "smooth", block: "center"});
                    (errorElement as HTMLElement).focus();
                }
            } else {
                await handleSubmit(values)
            }
        };
        useEffect(() => {
            getPurchaseRoomsOrderAmount(purchase_order_id).then(amount => {
                if (amount && amount >= 2) setShowPOButton(true)
            })
        }, [])
        return (
            <>
                <div className={s.buttonRow}>
                    <span>Download Report</span>
                    <button type="submit"
                            onClick={(e) => customSubmitHandler(e, 'save-room')}
                            className={['button yellow'].join(' ')}
                            disabled={isSubmitting}>Room
                    </button>
                    <button type="submit"
                            onClick={(e) => customSubmitHandler(e, 'save-room-no-prices')}
                            className={['button yellow'].join(' ')}
                            disabled={isSubmitting}>Room(No Prices)
                    </button>
                    {showPOButton
                        && <>
                            <button type="submit"
                                    onClick={(e) => customSubmitHandler(e, 'save-po')}
                                    className={['button yellow'].join(' ')}
                                    disabled={isSubmitting}>PO
                            </button>
                            <button type="submit"
                                    onClick={(e) => customSubmitHandler(e, 'save-po-no-prices')}
                                    className={['button yellow'].join(' ')}
                                    disabled={isSubmitting}>PO(No Prices)
                            </button>
                        </>
                    }
                </div>
                <div className={s.buttonRow}>
                    <span>Submit Order</span>
                    <button type="submit"
                            onClick={(e) => customSubmitHandler(e, 'send-room')}
                            className={['button yellow'].join(' ')}
                            disabled={isSubmitting}>Room
                    </button>
                    {showPOButton &&
                        <button type="submit"
                                onClick={(e) => customSubmitHandler(e, 'send-po')}
                                className={['button yellow'].join(' ')}
                                disabled={isSubmitting}>Full Order
                        </button>}
                </div>
            </>
        );
    }
;

export default CheckoutButtonRow;