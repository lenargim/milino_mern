import {Formik} from 'formik';
import React, {FC} from 'react';
import {
    addToCartCustomPart, findIsProductStandard,
    getInitialMaterialData,
    getLimit,
    useAppDispatch
} from "../../helpers/helpers";
import {CustomPartType, materialsCustomPart, MaybeEmpty, MaybeNull} from "../../helpers/productTypes";
import {getCustomPartSchema} from "./CustomPartSchema";
import s from "../Product/product.module.sass";
import CustomPartLeft from "./CustomPartLeft";
import {DoorType} from "./CustomPartStandardDoorForm";
import {colorOption} from "./CustomPartGolaProfile";
import DA from '../../api/doorAccessories.json'
import {PanelsFormType} from "./CustomPartStandardPanel";
import CustomPartRight from "./CustomPartRight";
import {RoomMaterialsFormType} from "../../helpers/roomTypes";
import {addProduct} from "../../store/reducers/roomSlice";

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
    led_accessories: LedAccessoriesFormType,
    door_accessories: DoorAccessoryType[],
    standard_door: MaybeNull<DoorType>,
    standard_panels: PanelsFormType,
    simple_closet_custom: SimplePartCustomType[]
}
export const SimpleClosetCustomOptions: string[] = ['SR', 'STK', 'AS14', 'AS18', 'AS22', 'FS14', 'FS18', 'FS22', 'SS14', 'SS18', 'SS22'];
export type SimpleClosetCustomTypes = typeof SimpleClosetCustomOptions[number];


export type SimpleClosetAPIType = {
    name: SimpleClosetCustomTypes,
    width: number
    qty: number,
}
export type SimplePartCustomType = {
    name: MaybeEmpty<SimpleClosetCustomTypes>,
    'Width': string,
    'Width Number': number,
    qty: number,
}

const doorAccessories = DA as DoorAccessoryFront[]
const initialDoorAccessories: DoorAccessoryType[] = doorAccessories.map(el => ({...el, qty: 0}))


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

const CustomPart: FC<{ materials: RoomMaterialsFormType, room_id: string, custom_part: CustomPartType }> = ({
                                                                                                                materials,
                                                                                                                room_id,
                                                                                                                custom_part
                                                                                                            }) => {
    const dispatch = useAppDispatch();
    const isStandardCabinet = findIsProductStandard(materials);
    const initialMaterialData = getInitialMaterialData(custom_part, materials, isStandardCabinet);
    const initialSizes = getInitialSizes(custom_part, initialMaterialData);
    const {initial_width, initial_height, initial_depth} = initialSizes
    const isDoorAccessories = ["door-accessories"].includes(custom_part.type);
    const initialValues: CustomPartFormType = {
        'Width': initial_width.toString(),
        'Height': initial_height.toString(),
        'Depth': initial_depth.toString(),
        'Width Number': initial_width,
        'Height Number': initial_height,
        'Depth Number': initial_depth,
        'Material': initialMaterialData?.name || '',
        glass_door: ['', '', ''],
        glass_shelf: '',
        led_accessories: {
            led_alum_profiles: [],
            led_gola_profiles: [],
            led_door_sensor: 0,
            led_dimmable_remote: 0,
            led_transformer: 0,
        },
        door_accessories: isDoorAccessories ? initialDoorAccessories : [],
        standard_door: null,
        standard_panels: initialStandardPanels,
        simple_closet_custom: [],
        'Note': '',
        price: 0,
    }

    return (
        <Formik
            initialValues={initialValues}
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
            <>
                <CustomPartLeft product={custom_part} materials={materials}/>
                <div className={s.right}>
                    <CustomPartRight customPartProduct={custom_part}
                                     initialMaterialData={initialMaterialData}
                                     materials={materials}/>
                </div>
            </>
        </Formik>
    );
};

export default CustomPart;