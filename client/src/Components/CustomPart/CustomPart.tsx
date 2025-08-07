import {Formik} from 'formik';
import React, {FC} from 'react';
import {
    addToCartCustomPart,
    useAppDispatch
} from "../../helpers/helpers";
import {CustomPartTableDataType, CustomPartType, MaybeEmpty, MaybeNull} from "../../helpers/productTypes";
import {getCustomPartSchema} from "./CustomPartSchema";
import s from "../Product/product.module.sass";
import CustomPartLeft from "./CustomPartLeft";
import {DoorType} from "./CustomPartStandardDoorForm";
import {colorOption} from "./CustomPartGolaProfile";
import {PanelsFormType} from "./CustomPartStandardPanel";
import CustomPartRight from "./CustomPartRight";
import {RoomMaterialsFormType} from "../../helpers/roomTypes";
import {addProduct} from "../../store/reducers/roomSlice";
import st from "../Profile/profile.module.sass";

export type LedAccessoriesFormType = {
    led_alum_profiles: {
        length: string,
        ['length Number']: number,
        qty: number
    }[],
    led_gola_profiles: {
        length: string,
        ['length Number']: number,
        color: colorOption,
        qty: number,
    }[],
    led_door_sensor: number,
    led_dimmable_remote: number,
    led_transformer: number,
}

type FilterAccessory = 'aventos' | 'hinge' | 'PTO' | 'servo';

export type DoorAccessoryFront = {
    id: number,
    value: string,
    label: string,
    filter: FilterAccessory,
    price: number
}

export type DoorAccessoryAPIType = {
    value: string,
    qty: number
}

export interface DoorAccessoryType extends DoorAccessoryAPIType {
    id: number,
    filter: FilterAccessory,
    label: string,
    price: number
}

export type CustomPartFormType = {
    Width: string,
    Height: string,
    Depth: string,
    ['Width Number']: number,
    ['Height Number']: number,
    ['Depth Number']: number,
    Material: string,
    Note: string,
    price: number,
    glass_door: string[],
    glass_shelf: string,
    led_accessories: MaybeNull<LedAccessoriesFormType>,
    door_accessories: MaybeNull<DoorAccessoryType[]>,
    standard_doors: MaybeNull<DoorType[]>,
    standard_panels: MaybeNull<PanelsFormType>,
    rta_closet_custom: RTAPartCustomType[]
}
export const RTAClosetCustomOptions: string[] = ['SR', 'STK', 'AS14', 'AS18', 'AS22', 'FS14', 'FS18', 'FS22', 'SS14', 'SS18', 'SS22'];
export type RTAClosetCustomTypes = typeof RTAClosetCustomOptions[number];


export type RTAClosetAPIType = {
    name: RTAClosetCustomTypes,
    width: number
    qty: number,
}
export type RTAPartCustomType = {
    name: MaybeEmpty<RTAClosetCustomTypes>,
    'Width': string,
    'Width Number': number,
    qty: number,
}

type CustomPartFCType = {
    materials: RoomMaterialsFormType,
    room_id: string,
    custom_part: CustomPartType,
    customPartData: CustomPartTableDataType,
    initialCustomPartValues: CustomPartFormType
}

const CustomPart: FC<CustomPartFCType> = ({
                                            materials,
                                            room_id,
                                            custom_part,
                                            customPartData,
                                            initialCustomPartValues
                                        }) => {
    const dispatch = useAppDispatch();
    return (
        <Formik
            initialValues={initialCustomPartValues}
            validationSchema={getCustomPartSchema(custom_part)}
            onSubmit={async (values: CustomPartFormType, {resetForm, setSubmitting}) => {
                if (!custom_part || !values.price) return;
                setSubmitting(true)
                const cartData = addToCartCustomPart(values, custom_part, room_id)
                await dispatch(addProduct({product: cartData}));
                resetForm();
                setSubmitting(false)
            }}
        >
            <div className={st.product}>
                <CustomPartLeft product={custom_part} materials={materials}/>
                <div className={s.right}>
                    <CustomPartRight customPartProduct={custom_part}
                                     customPartData={customPartData}
                                     materials={materials}/>
                </div>
            </div>
        </Formik>
    );
};

export default CustomPart;