import {Formik} from 'formik';
import React, {FC} from 'react';
import {
    addToCartCustomPart,
    useAppDispatch
} from "../../helpers/helpers";
import {
    CustomPartTableDataType,
    CustomPartType, GlassAndMirrorTypes, LedAccessoriesFormType, MaybeEmpty,
    MaybeNull,
    MaybeUndefined
} from "../../helpers/productTypes";
import {getCustomPartSchema} from "./CustomPartSchema";
import s from "../Product/product.module.sass";
import CustomPartLeft from "./CustomPartLeft";
import {DoorType} from "./CustomPartStandardDoorForm";
import {PanelsFormType} from "./CustomPartStandardPanel";
import CustomPartRight from "./CustomPartRight";
import {RoomMaterialsFormType} from "../../helpers/roomTypes";
import {addProduct, updateProduct} from "../../store/reducers/roomSlice";
import st from "../Profile/profile.module.sass";
import {useNavigate} from "react-router-dom";

type FilterAccessory = 'aventos' | 'hinge' | 'PTO' | 'servo';

export type DoorAccessoryFront = {
    id: number,
    label: string,
    filter: FilterAccessory,
    price: number,
    value: string,
}

export type DoorAccessoryAPIType = {
    value: string,
    qty: number
}

export interface DoorAccessoryType extends DoorAccessoryAPIType {
    id: number,
    label: string,
    filter: FilterAccessory,
    price: number
}

export type GrooveAPIType = {
    style: string,
    clear_coat: boolean
}

export const DrawerInsertsBoxNames = ['Inserts' , 'Pegs' , 'Spice'] as const;
export const DrawerInsertsColorNames = ['Maple' , 'Walnut'] as const;
export const DrawerInsertsLetterNames = ['A' , 'B' , 'C' , 'D' , 'E' , 'F' , 'G' , 'H' , 'I' , 'J'] as const;
export type DrawerInsertsBoxType = typeof DrawerInsertsBoxNames[number];
export type DrawerInsertsColor = typeof DrawerInsertsColorNames[number];
export type DrawerInsertsLetter = typeof DrawerInsertsLetterNames[number];
export type DrawerInsertsType = {
    box_type: DrawerInsertsBoxType,
    color: DrawerInsertsColor,
    insert_type: MaybeNull<DrawerInsertsLetter>
}

export type CustomPartFormType = {
    width: number,
    height: number,
    depth: number,
    width_string: string,
    height_string: string,
    depth_string: string,
    material: string,
    note: string,
    price: number,
    glass_door: string[],
    glass_shelf: MaybeEmpty<GlassAndMirrorTypes>,
    led_accessories: MaybeNull<LedAccessoriesFormType>,
    door_accessories: MaybeNull<DoorAccessoryType[]>,
    standard_doors: MaybeNull<DoorType[]>,
    standard_panels: MaybeNull<PanelsFormType>,
    rta_closet_custom: MaybeNull<RTAPartCustomType[]>,
    groove: MaybeNull<GrooveAPIType>,
    drawer_inserts: MaybeNull<DrawerInsertsType>
}
export const RTAClosetCustomOptions: string[] = ['SR', 'STK', 'AS14', 'AS18', 'AS22', 'FS14', 'FS18', 'FS22', 'SS14', 'SS18', 'SS22'];
export type RTAClosetCustomTypes = typeof RTAClosetCustomOptions[number];


export type RTAClosetAPIType = {
    name: RTAClosetCustomTypes,
    width: number
    qty: number,
}

export interface RTAPartCustomType extends RTAClosetAPIType {
    width_string: string
}

type CustomPartFCType = {
    materials: RoomMaterialsFormType,
    room_id: string,
    custom_part: CustomPartType,
    customPartData: CustomPartTableDataType,
    initialCustomPartValues: CustomPartFormType,
    productEditId: MaybeUndefined<string>
}

const CustomPart: FC<CustomPartFCType> = ({
                                              materials,
                                              room_id,
                                              custom_part,
                                              customPartData,
                                              initialCustomPartValues,
                                              productEditId
                                          }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    return (
        <Formik
            initialValues={initialCustomPartValues}
            validationSchema={getCustomPartSchema(custom_part)}
            onSubmit={async (values: CustomPartFormType, {resetForm, setSubmitting}) => {
                if (!custom_part || !values.price) return;
                setSubmitting(true)
                const cartData = addToCartCustomPart(values, custom_part, room_id,productEditId)

                if (productEditId) {
                    await dispatch(updateProduct({product: cartData}));
                    resetForm();
                    navigate(-1);
                } else {
                    await dispatch(addProduct({product: cartData}));
                    resetForm();
                    setSubmitting(false)
                }


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