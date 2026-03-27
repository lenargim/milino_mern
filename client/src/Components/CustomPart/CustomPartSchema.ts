import * as Yup from 'yup';
import {
    CustomPartMaterialsArraySizeLimitsType,
    CustomPartType,
    materialsCustomPart,
    MaybeEmpty,
    MaybeUndefined
} from "../../helpers/productTypes";
import {numericQuantity} from 'numeric-quantity';
import {colorsArr} from "./CustomPartGolaProfile";
import {
    DrawerInsertsBoxNames,
    DrawerInsertsBoxType,
    DrawerInsertsColor,
    DrawerInsertsColorNames, DrawerInsertsLetter, DrawerRONames, DrawerROType,
} from "./CustomPart";
import {
    getCustomPartMaterialsArraySizeLimits,
    getFraction,
    glassDoorHasProfile,
    testMinMaxCustomLimit
} from "../../helpers/helpers";
import {AnyObject, TestContext} from "yup";
import {RoomMaterialsFormType} from "../../helpers/roomTypes";


export function getCustomPartSchema(product: CustomPartType, materials: RoomMaterialsFormType): Yup.InferType<any> {
    const testMinMax = (val: MaybeUndefined<string>, context: TestContext<AnyObject>, materials_array: MaybeUndefined<materialsCustomPart[]>, dimension: 'width' | 'height' | 'depth') => {
        if (!val) return false;
        const numberVal = numericQuantity(val);
        if (isNaN(numberVal)) return context.createError({message: `Type error. Example: 12 3/8`})
        const material = context.parent.material as MaybeUndefined<CustomPartMaterialsArraySizeLimitsType>;
        const sizeLimit = getCustomPartMaterialsArraySizeLimits(id, material, materials);
        const limit = sizeLimit ? sizeLimit[dimension] : undefined
        const min = (limit && limit[0]) ? limit[0] : 1;
        const max = (limit && limit[1]) ? limit[1] : 999;
        if (numberVal < min) return context.createError({message: `Minimum ${getFraction(min)} inches`})
        if (numberVal > max) return context.createError({message: `Maximum ${getFraction(max)} inches`})
        return true;
    }
    const {materials_array, type, id} = product;
    const customInitialSchema = Yup.object({
        width_string: Yup.string()
            .required('Please write down width')
            .test('limit', (val, context) => testMinMax(val, context, materials_array, 'width')),
        note: Yup.string(),
        price: Yup.number().required().positive()
    });
    const customPartWithHeightSchema = Yup.object({
        height_string: Yup.string()
            .required('Please write down height')
            .test('limit', (val, context) => testMinMax(val, context, materials_array, 'height'))
    })
    const customPartWithDepthSchema = Yup.object({
        depth_string: Yup.string()
            .required('Please write down depth')
            .test('limit', (val, context) => testMinMax(val, context, materials_array, 'depth')),
    });
    const customPartWithMaterialSchema = Yup.object({
        material: Yup.string().required(),
    })
    const customSchema = customInitialSchema.concat(customPartWithHeightSchema).concat(customPartWithDepthSchema).concat(customPartWithMaterialSchema);
    const getHingeMaxIndentAuto = (context: TestContext<AnyObject>): number => {
        const parent = context.parent;
        const root =
            context.options?.context ??
            context.from?.[context.from.length - 1]?.value;

        const height = root?.height;

        if (!height || isNaN(height)) return Infinity;

        const path = context.path;
        const isTop = path.includes("hh_top");

        const otherValue = isTop ? parent?.hh_bottom : parent?.hh_top;

        // 🔥 защита от невалидных значений соседнего поля
        if (
            otherValue == null ||
            isNaN(otherValue) ||
            otherValue < 0 ||
            otherValue > height
        ) {
            return height; // fallback → максимум = вся высота
        }

        const max = height - otherValue;

        // 🔥 защита от отрицательного результата
        if (max < 0) return 0;

        return max;
    };

    const getPanelCutoutMaxSize = (context: TestContext<AnyObject>, axis:'width'|'height'):number => {
        // const childAxis = context.parent[axis];
        const root = context.options?.context ?? context.from?.[context.from.length - 1]?.value;
        const parentAxis = root[axis];
        return parentAxis-2;

    }

    const panelAccessoriesSchema = Yup.object({
        panel_accessories: Yup.object({
            hinges_or_holes: Yup.object({
                has_hh: Yup.boolean(),
                hh_top_string: Yup.string().when("has_hh", {
                    is: true,
                    then: s => s.required("Enter value")
                        .test('limit', (val, context) => testMinMaxCustomLimit(val, context, 2, getHingeMaxIndentAuto(context))),
                }),
                hh_bottom_string: Yup.string().when("has_hh", {
                    is: true,
                    then: s => s.required("Enter value")
                        .test('limit', (val, context) => testMinMaxCustomLimit(val, context, 2, getHingeMaxIndentAuto(context))),
                }),
                hh_top: Yup.number().nullable(),
                hh_bottom: Yup.number().nullable(),
            }),
            cutout: Yup.object({
                has_cutout: Yup.boolean(),
                width_string: Yup.string().when("has_cutout", {
                    is: true,
                    then: s => s.required("Enter value")
                        .test('limit', (val, context) => testMinMaxCustomLimit(val, context, 3, getPanelCutoutMaxSize(context, 'width'))),
                }),
                height_string: Yup.string().when("has_cutout", {
                    is: true,
                    then: s => s.required("Enter value")
                        .test('limit', (val, context) => testMinMaxCustomLimit(val, context, 3, getPanelCutoutMaxSize(context, 'height'))),
                }),
                width: Yup.number().nullable(),
                height: Yup.number().nullable(),
            })
        })
    })

    switch (type) {
        case "custom":
            return customSchema;
        case "panel":
            return customInitialSchema.concat(customPartWithHeightSchema).concat(customPartWithMaterialSchema).concat(panelAccessoriesSchema);
        case "backing":
            return customInitialSchema.concat(customPartWithHeightSchema);
        case "pvc":
            return customInitialSchema.concat(customPartWithMaterialSchema);
        case "thick_floating_shelf":
            return customInitialSchema.concat(customPartWithDepthSchema).concat(customPartWithMaterialSchema);
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
            return customInitialSchema.concat(customPartWithHeightSchema).concat(glassDoorSchema)
        case "glass-shelf":
            const shelfDoorSchema = Yup.object({
                glass_shelf: Yup.string().required('Glass Shelf required'),
            })
            return customInitialSchema.concat(customPartWithHeightSchema).concat(shelfDoorSchema)
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
                                .test('limit', (val, context) => testMinMax(val, context, materials_array, 'width')),
                        })
                    )
                    .min(1, 'Must have at least 1 additional part') // these constraints are shown if and only if inner constraints are satisfied
            });
        case "custom-doors":
            return customInitialSchema;
        case "ribbed":
            const ribbedSchema = Yup.object({
                material: Yup.string().required(),
                groove: Yup.object({
                    style: Yup.string(),
                    clear_coat: Yup.boolean()
                }).nullable()
            })
            return customInitialSchema.concat(customPartWithHeightSchema).concat(ribbedSchema);
        case "drawer-inserts":
            return Yup.object({
                width_string: Yup.string()
                    .required('Please write down width')
                    .test('limit', (val, context) => testMinMax(val, context, materials_array, 'width')),
                drawer_accessories: Yup.object()
                    .nullable()
                    .transform((value) => (value === null ? {} : value))
                    .shape({
                        inserts: Yup.object()
                            .nullable()
                            .transform(v => v ?? {})
                            .shape({
                                box_type: Yup.mixed<DrawerInsertsBoxType>().oneOf(DrawerInsertsBoxNames).required().defined('Required'),
                                color: Yup.mixed<DrawerInsertsColor>().oneOf(DrawerInsertsColorNames).required().defined('Required'),
                                insert_type: Yup.mixed<MaybeEmpty<DrawerInsertsLetter>>()
                                    .when('type', {
                                        is: 'Inserts',
                                        then: schema => schema.required('Required'),
                                    })
                            })
                    })
            })
        case "ro_drawer":
            return Yup.object({
                drawer_accessories: Yup.object()
                    .nullable()
                    .transform((value) => (value === null ? {} : value))
                    .shape({
                        drawer_ro: Yup.mixed<DrawerROType>()
                            .oneOf(DrawerRONames)
                            .required('Type required')
                    })
            })
        default:
            return undefined
    }
}