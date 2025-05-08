import {Formik} from 'formik';
import React, {FC} from 'react';
import {
    addToCartCustomPart,
    getCustomPartById, getInitialMaterialData,
    getLimit,
    useAppDispatch
} from "../../helpers/helpers";
import {CustomPartType, materialsCustomPart, MaybeNull} from "../../helpers/productTypes";
import {getCustomPartSchema} from "./CustomPartSchema";
import s from "../Product/product.module.sass";
import {MaterialsFormType} from "../../common/MaterialsForm";
import {Navigate, useParams} from "react-router-dom";
import CustomPartLeft from "./CustomPartLeft";
import {addToCart} from "../../store/reducers/generalSlice";
import {DoorType} from "./StandardDoorForm";
import {addToCartInRoomAPI} from "../../api/apiFunctions";
import {updateCartInRoom} from "../../store/reducers/roomSlice";
import {colorOption} from "./GolaProfile";
import DA from '../../api/doorAccessories.json'
import {PanelsFormType} from "./StandardPanel";
import CustomPartRight from "./CustomPartRight";

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
    standard_door: DoorType,
    standard_panels: PanelsFormType,
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

type InitialSizesType = {
    initial_width: number,
    initial_height: number,
    initial_depth: number
}

const initialStandardPanels: PanelsFormType = {
    standard_panel: [],
    shape_panel: [],
    wtk: [],
    crown_molding: 0
}

const getInitialSizes = (customPart: CustomPartType, initialMaterialData: MaybeNull<materialsCustomPart>): InitialSizesType => {

    const {width, depth, limits, height_range} = customPart
    const sizeLimitInitial = initialMaterialData?.limits ?? limits ?? {};
    const w = width ?? getLimit(sizeLimitInitial.width);
    const h = height_range ? getLimit(height_range) : getLimit(sizeLimitInitial.height);
    const d = initialMaterialData?.depth ?? depth ?? getLimit(sizeLimitInitial.depth);
    return {
        // initial_width: Math.ceil(w),
        // initial_height: Math.ceil(h),
        // initial_depth: Math.ceil(d)
        initial_width: w,
        initial_height: h,
        initial_depth: d
    }
}

const CustomPart: FC<CustomPartFormType> = ({materials}) => {
    const dispatch = useAppDispatch();
    let {productId, roomId} = useParams();
    if (!productId || !materials) return <div>Custom part error</div>;
    const customPartProduct = getCustomPartById(+productId)
    if (!customPartProduct) return <Navigate to={{pathname: '/cabinets'}}/>;
    const isStandardCabinet = materials.door_type === 'Standard White Shaker';
    const initialMaterialData = getInitialMaterialData(customPartProduct, materials, isStandardCabinet);
    const initialSizes = getInitialSizes(customPartProduct, initialMaterialData);
    const {initial_width, initial_height, initial_depth} = initialSizes
    const isDoorAccessories = ["door-accessories"].includes(customPartProduct.type);
    const initialValues: CustomPartFormValuesType = {
        'Width': initial_width.toString(),
        'Height': initial_height.toString(),
        'Depth': initial_depth.toString(),
        'Width Number': initial_width,
        'Height Number': initial_height,
        'Depth Number': initial_depth,
        'Material': initialMaterialData?.name || '',
        glass_door: [],
        glass_shelf: '',
        led_accessories: {
            led_alum_profiles: [],
            led_gola_profiles: [],
            door_sensor: 0,
            dimmable_remote: 0,
            transformer: 0,
        },
        // write function
        door_accessories: isDoorAccessories ? initialDoorAccessoires : [],
        standard_door: initialStandardDoor,
        standard_panels: initialStandardPanels,
        'Note': '',
        price: 0,
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={getCustomPartSchema(customPartProduct)}
            onSubmit={(values: CustomPartFormValuesType, {resetForm}) => {
                if (!customPartProduct || !values.price) return;
                const cartData = addToCartCustomPart(values, customPartProduct, undefined)
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
                <CustomPartLeft product={customPartProduct} materials={materials}/>
                <div className={s.right}>
                    <CustomPartRight customPartProduct={customPartProduct}
                                     initialMaterialData={initialMaterialData}
                                     materials={materials}/>
                </div>
            </>
        </Formik>
    );
};

export default CustomPart;