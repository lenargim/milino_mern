import {Formik} from 'formik';
import React, {FC} from 'react';
import {
    addToCartCustomPart,
    getCustomPartById, getInitialMaterialData,
    getLimit,
    useAppDispatch
} from "../../helpers/helpers";
import {MaybeNull} from "../../helpers/productTypes";
import {getCustomPartSchema} from "./CustomPartSchema";
import s from "../Product/product.module.sass";
import {MaterialsFormType} from "../../common/MaterialsForm";
import {Navigate, useParams} from "react-router-dom";
import CustomPartCabinet from "./CustomPartCabinet";
import CustomPartLeft from "./CustomPartLeft";
import {addToCart} from "../../store/reducers/generalSlice";
import LEDForm from "./LEDForm";
import DoorAccessoiresForm from "./DoorAccessoiresForm";
import StandardDoorForm, {DoorType} from "./StandardDoorForm";
import {addToCartInRoomAPI} from "../../api/apiFunctions";
import {updateCartInRoom} from "../../store/reducers/roomSlice";
import {colorOption} from "./GolaProfile";
import DA from '../../api/doorAccessories.json'


type CustomPartFormType = {
    materials: MaybeNull<MaterialsFormType>
}

export type LedAccessoriesFormType = {
    led_alum_profiles: {
        _id: string,
        length: string,
        ['length Number']: number,
        qty: number
    }[],
    led_gola_profiles: {
        _id: string,
        length: string,
        ['length Number']: number,
        color: colorOption,
        qty: number,
    }[],
    door_sensor: number,
    dimmable_remote: number,
    transformer: number,
}

type FilterAccessoire = 'aventos' | 'hinge' | 'PTO' | 'servo';

export type DoorAccessoireFront = {
    id: number,
    value: string,
    label: string,
    filter: FilterAccessoire,
    price: number
}

export type DoorAccessoireAPIType = {
    value: string,
    qty: number
}

export interface DoorAccessoireType extends DoorAccessoireAPIType {
    id: number,
    filter: FilterAccessoire,
    label: string,
    price: number
}

export type CustomPartFormValuesType = {
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
    led_accessories: LedAccessoriesFormType,
    door_accessories: DoorAccessoireType[],
    standard_door: DoorType
}

const doorAccessoires = DA as DoorAccessoireFront[]
const initialDoorAccessoires: DoorAccessoireType[] = doorAccessoires.map(el => ({...el, qty: 0}))
const initialStandardDoor: DoorType = {
    color: '',
    doors: [{
        name: '',
        qty: 1,
        width: 0,
        height: 0
    }],
}

const CustomPart: FC<CustomPartFormType> = ({materials}) => {
    const dispatch = useAppDispatch();

    let {productId, roomId} = useParams();
    if (!productId || !materials) return <div>Custom part error</div>;
    const customPart = getCustomPartById(+productId)
    if (!customPart) return <Navigate to={{pathname: '/cabinets'}}/>;
    const {limits, width, depth, type} = customPart;
    const initialMaterialData = getInitialMaterialData(customPart, materials)
    const sizeLimitInitial = initialMaterialData?.limits ?? limits ?? {};
    const isDepthIsConst = !!(initialMaterialData?.depth ?? depth)
    const initialDepth = initialMaterialData?.depth ?? depth ?? getLimit(sizeLimitInitial.depth);

    const isCabinetLayout = ["custom", "pvc", "backing", "glass-door", "glass-shelf"].includes(type)
    const initialValues: CustomPartFormValuesType = {
        'Width': Math.ceil(width ?? getLimit(sizeLimitInitial.width)).toString(),
        'Height': Math.ceil(getLimit(sizeLimitInitial.height)).toString(),
        'Depth': Math.ceil(initialDepth).toString(),
        'Width Number': Math.ceil(width ?? getLimit(sizeLimitInitial.width)),
        'Height Number': Math.ceil(getLimit(sizeLimitInitial.height)),
        'Depth Number': Math.ceil(initialDepth),
        'Material': initialMaterialData ? initialMaterialData.name : '',
        glass_door: [],
        glass_shelf: '',
        led_accessories: {
            led_alum_profiles: [],
            led_gola_profiles: [],
            door_sensor: 0,
            dimmable_remote: 0,
            transformer: 0,
        },
        door_accessories: initialDoorAccessoires,
        standard_door: initialStandardDoor,
        'Note': '',
        price: 0,
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={getCustomPartSchema(customPart)}
            onSubmit={(values: CustomPartFormValuesType, {resetForm}) => {
                if (!customPart) return;
                const cartData = addToCartCustomPart(values, customPart, undefined)
                if (roomId) {
                    addToCartInRoomAPI(cartData, roomId).then(cart => {
                        if (cart && roomId) dispatch(updateCartInRoom({cart: cart, _id: roomId}));
                    })
                } else {
                    dispatch(addToCart(cartData))
                }
                resetForm();
            }}
        >
            <>
                <CustomPartLeft product={customPart}/>
                <div className={s.right}>
                    {isCabinetLayout && <CustomPartCabinet product={customPart} isDepthIsConst={isDepthIsConst}/>}
                    {type === 'led-accessories' && <LEDForm/>}
                    {type === 'door-accessories' && <DoorAccessoiresForm/>}
                    {(type === 'standard-door' || type === 'standard-glass-door') &&
                      <StandardDoorForm customPart={customPart}/>}
                </div>
            </>
        </Formik>
    );
};

export default CustomPart;