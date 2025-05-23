import {Formik} from 'formik';
import React, {FC} from 'react';
import {
    addToCartCustomPart,
    getCustomPartById, getInitialMaterialData,
    getLimit,
    useAppDispatch
} from "../../helpers/helpers";
import {CustomPartType, materialsCustomPart, MaybeNull, productCategory} from "../../helpers/productTypes";
import {getCustomPartSchema} from "./CustomPartSchema";
import s from "../Product/product.module.sass";
import {Navigate} from "react-router-dom";
import CustomPartLeft from "./CustomPartLeft";
import {DoorType} from "./CustomPartStandardDoorForm";
import {addToCartAPI} from "../../api/apiFunctions";
import {colorOption} from "./CustomPartGolaProfile";
import DA from '../../api/doorAccessories.json'
import {PanelsFormType} from "./CustomPartStandardPanel";
import CustomPartRight from "./CustomPartRight";
import {RoomMaterialsFormType} from "../../helpers/roomTypes";
import {setCart} from "../../store/reducers/cartSlice";

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
    door_accessories: DoorAccessoryType[],
    standard_door: DoorType,
    standard_panels: PanelsFormType,
}

const doorAccessories = DA as DoorAccessoryFront[]
const initialDoorAccessories: DoorAccessoryType[] = doorAccessories.map(el => ({...el, qty: 0}))
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
        initial_width: w,
        initial_height: h,
        initial_depth: d
    }
}

const CustomPart: FC<{materials: RoomMaterialsFormType, room_id: string, product_id: number}> = ({materials, room_id, product_id}) => {
    const dispatch = useAppDispatch();
    const customPartProduct = getCustomPartById(product_id)
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
            led_door_sensor: 0,
            led_dimmable_remote: 0,
            led_transformer: 0,
        },
        // write function
        door_accessories: isDoorAccessories ? initialDoorAccessories : [],
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
                const cartData = addToCartCustomPart(values, customPartProduct, room_id)
                addToCartAPI(cartData).then(cart => {
                    if (cart) dispatch(setCart(cart));
                })
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