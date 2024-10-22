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

export type DoorAccessoireAPIType = {
    value: string,
    qty: number
}

export interface DoorAccessoireType extends DoorAccessoireAPIType {
    id: number,
    filter: 'aventos' | 'hinge'| 'PTO'|'servo',
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

const initialDoorAccessoires: DoorAccessoireType[] = [
    {
        id: 0,
        value: 'HF',
        label: 'Aventos HF',
        filter: 'aventos',
        qty: 0,
        price: 280
    },
    {
        id: 1,
        value: 'HK',
        label: 'Aventos HK',
        filter: 'aventos',
        qty: 0,
        price: 210
    },
    {
        id: 2,
        value: 'HL',
        label: 'Aventos HL',
        filter: 'aventos',
        qty: 0,
        price: 350
    },
    {
        id: 3,
        value: 'door_hinge',
        filter: 'hinge',
        qty: 0,
        price: 10,
        label: 'Door Hinge'
    },
    {
        id: 4,
        value: 'hinge_holes',
        filter: 'hinge',
        qty: 0,
        price: 6,
        label: 'Hinge Holes'
    },
    {
        id: 5,
        value: 'PTO_door',
        filter: 'PTO',
        label: 'For Doors',
        qty: 0,
        price: 30
    },
    {
        id: 6,
        value: 'PTO_drawer',
        filter: 'PTO',
        label: 'For Drawers',
        qty: 0,
        price: 80
    },
    {
        id: 7,
        value: 'PTO_trashbin',
        filter: 'PTO',
        label: 'For Trash Bins',
        qty: 0,
        price: 350
    },
    {
        id: 8,
        value: 'WBA',
        filter: 'servo',
        label: 'For WBA Cab',
        qty: 0,
        price: 1000
    },
    {
        id: 9,
        value: 'WBL',
        filter: 'servo',
        label: 'For WBL Cab',
        qty: 0,
        price: 1000
    },
    {
        id: 10,
        value: 'WDA',
        filter: 'servo',
        label: 'For WDA Cab',
        qty: 0,
        price: 1000
    },
    {
        id: 11,
        value: 'BG',
        filter: 'servo',
        label: 'For BG Cab',
        qty: 0,
        price: 600
    }
]

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
                    {type === 'led-accessories' && <LEDForm />}
                    {type === 'door-accessories' && <DoorAccessoiresForm/>}
                    {(type === 'standard-door' || type === 'standard-glass-door') &&
                      <StandardDoorForm customPart={customPart}/>}
                </div>
            </>
        </Formik>
    );
};

export default CustomPart;