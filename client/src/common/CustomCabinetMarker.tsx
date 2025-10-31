import {FC} from "react";
import {IsStandardOptionsType} from "../helpers/cartTypes";
import s from './../Components/Checkout/checkout.module.sass'

export const CustomCabinetMarker: FC<{ isStandard: IsStandardOptionsType }> = ({isStandard}) => {
    const anyNotStandard = Object.values(isStandard).some(value => !value) || Object.values(isStandard.dimensions).some(value => !value);
    if (!anyNotStandard) return null;
    return <span className={s.non}>Custom</span>
}