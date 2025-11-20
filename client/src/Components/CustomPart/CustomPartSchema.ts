import * as Yup from 'yup';
import {
    CustomPartMaterialsArraySizeLimitsType, CustomPartMaterialsNames,
    CustomPartType,
    materialsCustomPart,
    materialsLimitsType,
    MaybeEmpty,
    MaybeUndefined
} from "../../helpers/productTypes";
import {numericQuantity} from 'numeric-quantity';
import {colorsArr} from "./CustomPartGolaProfile";
import {
    DrawerInsertsBoxNames,
    DrawerInsertsBoxType,
    DrawerInsertsColor,
    DrawerInsertsColorNames, DrawerInsertsLetter,
} from "./CustomPart";
import {getCustomPartMaterialsArraySizeLimits, glassDoorHasProfile} from "../../helpers/helpers";
import {AnyObject, TestContext} from "yup";
import {RoomMaterialsFormType} from "../../helpers/roomTypes";


export function getCustomPartSchema(product: CustomPartType, materials:RoomMaterialsFormType): Yup.InferType<any> {
    const {materials_array, limits, type, id} = product;
    const milino_special_colors_max_height = ["Brown Oak", "Grey Woodline", "Ivory Woodline", "Ultra Matte White", "Ultra Matte Grey"].includes(materials.door_color)

    const testMinMax = (val: MaybeUndefined<string>, context: TestContext<AnyObject>, materials_array: MaybeUndefined<materialsCustomPart[]>, limits: MaybeUndefined<materialsLimitsType>, dimension: 'width' | 'height' | 'depth') => {
        if (!val) return false;
        const numberVal = numericQuantity(val);
        if (isNaN(numberVal)) return context.createError({message: `Type error. Example: 12 3/8`})
        const material = context.parent.material as MaybeUndefined<CustomPartMaterialsArraySizeLimitsType>;
        // const sizeLimit = materials_array?.find(el => el.name === material)?.limits ?? limits;

        const sizeLimit = getCustomPartMaterialsArraySizeLimits(id, material, milino_special_colors_max_height);
        const limit = sizeLimit ? sizeLimit[dimension] : undefined
        const min = (limit && limit[0]) ? limit[0] : 1;
        const max = (limit && limit[1]) ? limit[1] : 999;
        if (numberVal < min) return context.createError({message: `Minimum ${min} inches`})
        if (numberVal > max) return context.createError({message: `Maximum ${max} inches`})
        return true;
    }


    const customDoorsSchema = Yup.object({
        width_string: Yup.string()
            .required('Please write down width')
            .test('limit', (val, context) => testMinMax(val, context, materials_array, limits, 'width')),
        height_string: Yup.string()
            .required('Please write down height')
            .test('limit', (val, context) => testMinMax(val, context, materials_array, limits, 'height')),
        note: Yup.string(),
        price: Yup.number().required().positive()
    });
    const customPartWithMaterialSchema = Yup.object({
        depth_string: Yup.string()
            .required('Please write down depth')
            .test('limit', (val, context) => testMinMax(val, context, materials_array, limits, 'depth')),
        material: Yup.mixed<CustomPartMaterialsArraySizeLimitsType>(),
    })
    const customSchema = customDoorsSchema.concat(customPartWithMaterialSchema);
    switch (type) {
        case "custom":
        case "backing":
        case "pvc":
            return customSchema
        case "glass-door":
            const glassDoorSchema = Yup.object({
                glass_door: Yup.lazy((value, context) => {
                    const defaultValue = Array.isArray(value) ? value : [];
                    const padded = [...defaultValue, '', '', ''].slice(0, 3);
                    return Yup.tuple([
                        glassDoorHasProfile(id)
                            ? Yup.string().required("Profile is required")
                            : Yup.string(),
                        Yup.string().required("Glass Type is required"),
                        Yup.string().required("Glass Color is required"),
                    ]).transform(() => padded);
                }),
            })
            return customSchema.concat(glassDoorSchema)
        case "glass-shelf":
            const shelfDoorSchema = Yup.object({
                glass_shelf: Yup.string().required('Glass Shelf required'),
            })
            return customSchema.concat(shelfDoorSchema)
        case "led-accessories":
            return Yup.object({
                led_accessories: Yup.object().shape({
                    alum_profiles: Yup.array().of(
                        Yup.object().shape({
                            length_string: Yup.string().required('Set length'),
                            length: Yup.number().positive('Must be positive number').default(0),
                            qty: Yup.number().positive()
                        })
                    ),
                    gola_profiles: Yup.array().of(
                        Yup.object().shape({
                            length_string: Yup.string().required('Set length'),
                            length: Yup.number().positive('Must be positive number').default(0),
                            color: Yup.string().oneOf(colorsArr),
                            qty: Yup.number().positive()
                        })
                    ),
                }),
                price: Yup.number().required().positive()
            })
        case "door-accessories":
            return Yup.object({
                price: Yup.number().required().positive(),
            })
        case "standard-doors":
        case "standard-glass-doors":
            return Yup.object({
                standard_doors: Yup.array().of(
                    Yup.object().shape({
                        name: Yup.string(),
                        qty: Yup.number().integer().positive()
                    }))
                    .default([])
                    .test({
                        message: 'Choose at least one door',
                        test: doors => {
                            return !!(doors.length && doors[0].name);

                        },
                    }),
                price: Yup.number().required().positive(),
            })
        case "rta-closets":
            return Yup.object().shape({
                rta_closet_custom: Yup.array()
                    .of(
                        Yup.object().shape({
                            name: Yup.string().required('Required'),
                            qty: Yup.number().min(1, 'Min 1'),
                            width_string: Yup.string()
                                .required('Please write down width')
                                .test('limit', (val, context) => testMinMax(val, context, materials_array, limits, 'width')),
                        })
                    )
                    .min(1, 'Must have at least 1 additional part') // these constraints are shown if and only if inner constraints are satisfied
            });
        case "custom-doors":
            return customDoorsSchema;
        case "ribbed":
            const ribbedSchema = Yup.object({
                material: Yup.string().required(),
                groove: Yup.object({
                    style: Yup.string(),
                    clear_coat: Yup.boolean()
                })
            })
            return ribbedSchema.concat(customDoorsSchema);
        case "drawer-inserts":
            return Yup.object({
                width_string: Yup.string()
                    .required('Please write down width')
                    .test('limit', (val, context) => testMinMax(val, context, materials_array, limits, 'width')),
                drawer_inserts: Yup.object().shape({
                    box_type: Yup.mixed<DrawerInsertsBoxType>().oneOf(DrawerInsertsBoxNames).required().defined(),
                    color: Yup.mixed<DrawerInsertsColor>().oneOf(DrawerInsertsColorNames).required().defined(),
                    insert_type: Yup.mixed<MaybeEmpty<DrawerInsertsLetter>>()
                        .when('type', {
                            is: 'Inserts',
                            then: schema => schema.required('Required'),
                        })
                })
            })
        default:
            return undefined
    }
}