import React, {FC, MutableRefObject, useEffect, useState} from 'react';
import s from "./checkout.module.sass";
import {ButtonType, CheckoutFormValues} from "./CheckoutForm";
import {useFormikContext} from "formik";
import {MaybeNull} from "../../helpers/productTypes";
import {getPurchaseRoomsOrderAmount} from "../../api/apiFunctions";


type CheckoutButtonRowType = {
    clickedButtonRef: MutableRefObject<MaybeNull<ButtonType>>,
    handleSubmit: (values: CheckoutFormValues) => Promise<void>,
    purchase_order_id: string
}
const CheckoutButtonRow: FC<CheckoutButtonRowType> = ({clickedButtonRef, handleSubmit, purchase_order_id}) => {
    const {values, isSubmitting, validateForm, setTouched} = useFormikContext<CheckoutFormValues>();
    const [showPOButton, setShowPOButton] = useState<boolean>(false)

    const customSubmitHandler = async (e: React.MouseEvent<HTMLButtonElement>, buttonType: ButtonType) => {
        e.preventDefault();
        const errors = await validateForm();
        const hasErrors = Object.keys(errors).length > 0;
        clickedButtonRef.current = buttonType;

        if (hasErrors) {
            const firstErrorField = Object.keys(errors)[0] as keyof CheckoutFormValues;
            const errorElement = document.getElementsByName(firstErrorField)[0];
            if (errorElement) {
                setTouched({
                    name: true,
                    company: true,
                    email: true,
                    phone: true,
                    purchase_order: true,
                    room_name: true,
                    delivery: true
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
        <div className={s.buttonRow}>
            <button type="submit"
                    onClick={(e) => customSubmitHandler(e, 'save-room')}
                    className={['button yellow'].join(' ')}
                    disabled={isSubmitting}>Download Room
            </button>
            <button type="submit"
                    onClick={(e) => customSubmitHandler(e, 'send-room')}
                    className={['button yellow'].join(' ')}
                    disabled={isSubmitting}>Submit Room
            </button>
            {showPOButton
                ? <>
                    <button type="submit"
                            onClick={(e) => customSubmitHandler(e, 'save-po')}
                            className={['button yellow'].join(' ')}
                            disabled={isSubmitting}>Download PO
                    </button>
                    <button type="submit"
                            onClick={(e) => customSubmitHandler(e, 'send-po')}
                            className={['button yellow'].join(' ')}
                            disabled={isSubmitting}>Submit Full Order
                    </button>
                </>
                : null
            }
        </div>
    );
}
;

export default CheckoutButtonRow;