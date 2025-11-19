import * as Yup from 'yup';
import settings from './../../api/settings.json'
import {hingeArr, MaybeUndefined, ProductType, sizeLimitsType} from "../../helpers/productTypes";
import {AnyObject, ObjectSchema, TestContext} from "yup";
import {numericQuantity} from 'numeric-quantity';

export const borderOptions = ['Sides', 'Top', 'Bottom'] as const;
export const alignmentOptions = ['Center', 'From Face', 'From Back'] as const;

export function getProductSchema(product: ProductType, sizeLimit: sizeLimitsType): ObjectSchema<any> {
    const {isAngle, product_type, middleSectionDefault, isBlind} = product
    const blindDoorMinMax = settings.blindDoor;

    const testMinMax = (val: MaybeUndefined<string>, context: TestContext<AnyObject>, dimension: 'width' | 'height' | 'depth') => {
        if (!val) return false;
        const numberVal = numericQuantity(val);
        if (isNaN(numberVal)) return context.createError({message: `Type error. Example: 12 3/8`});
        const limit = sizeLimit[dimension]
        const min = (limit && limit[0]) ? limit[0] : 1;
        const max = (limit && limit[1]) ? limit[1] : 999;
        if (numberVal < min) return context.createError({message: `Minimum ${min} inches`})
        if (numberVal > max) return context.createError({message: `Maximum ${max} inches`})
        return true;
    }

    const schemaBasic = Yup.object({
        width: Yup.number().required(),
        blind_width: Yup.number()
            .test("isRequired", "Blind width is a required field", (val, {parent}) => {
                if (isBlind) return !!val || parent.custom_blind_width
                return true;
            }),
        height: Yup.number().required(),
        depth: Yup.number().required(),
        custom_depth_string: Yup.string()
            .when('depth', {
                is: 0,
                then: (schema) => schema
                    .required('Please write down depth')
                    .test('limit', (val, context) => testMinMax(val, context,'depth')),

            }),
        led_borders: Yup.array()
            .of(Yup.string().oneOf(borderOptions, 'Error')),
        led_alignment: Yup.string()
            .when('led_borders', {
                is: (val: string[]) => val.length,
                then: (schema) => schema
                    .required('Please choose alignment')
                    .oneOf(alignmentOptions, 'Error')
                    .default('Center')
            })
        ,
        led_indent_string: Yup.string()
            .when('led_alignment', {
                is: (val: string) => val && val !== 'Center',
                then: (schema) => schema
                    .required('Required')
                    .matches(/^\d{1,2}\s\d{1,2}\/\d{1,2}|\d{1,2}\/\d{1,2}|\d{1,2}/, "Type error. Example: 12 3/8")
                    .test(
                        "is-max",
                        `Indent should be lower than Depth`,
                        (val: any, {parent}) => {
                            const numberVal = numericQuantity(val);
                            const fullDepth = parent['depth'] || parent['custom_depth'];
                            return numberVal < fullDepth
                        }
                    )

            }),
        hinge_opening: Yup.string().oneOf(hingeArr),
        options: Yup.array().of(Yup.string()),
        glass_door: Yup.lazy((value, context) => {
            const options = context?.parent?.options ?? [];

            const requiredIf = (index: number) => {
                if (!options.includes('Glass Door')) return Yup.string().notRequired();
                if (product_type === "standard") {
                    if (index !== 2) return Yup.string().notRequired()
                }
                let msg;
                switch (index) {
                    case 0: {
                        msg = 'Profile is required'
                        break
                    }
                    case 1: {
                        msg = 'Glass Type is required'
                        break
                    }
                    case 2: {
                        msg = 'Glass Color is required'
                        break
                    }
                    default: {
                        msg = `Glass Door ${index + 1} is required`
                    }
                }
                return Yup.string().required(msg);

            }
            const defaultValue = Array.isArray(value) ? value : [];
            const padded = [...defaultValue, '', '', ''].slice(0, 3);

            return Yup.tuple([
                requiredIf(0),
                requiredIf(1),
                requiredIf(2),
            ]).transform(() => padded);
        }),
        glass_shelf: Yup.string()
            .when('options', (options, field) =>
                options[0].includes('Glass Shelf') ? field.required('Glass Shelf is required') : field
            ),
        note: Yup.string(),
        price: Yup.number().required().positive()
    });

    const schemaExtended = Yup.object({
        custom_width_string: Yup.string()
            .when('width', {
                is: 0,
                then: (schema) => schema
                    .required('Please write down width')
                    .test('limit', (val, context) => testMinMax(val, context,'width')),
            }),
        custom_blind_width_string: Yup.string()
            .when(['isBlind', 'blind_width'], {
                is: (isBlind: boolean, blindWidth: number) => isBlind && blindWidth === 0,
                then: (schema) => schema
                    .required('Please write down blind width')
                    .matches(/^\d{1,2}\s\d{1,2}\/\d{1,2}|\d{1,2}\/\d{1,2}|\d{1,2}/, "Type error. Example: 12 3/8")
                    .test(
                        "is-min",
                        `Width is too small`,
                        (val: any, {parent}) => {
                            const numberVal = numericQuantity(val);
                            const fullWidth = parent['width'] || parent['custom_width'];
                            if (isAngle) {
                                const maxCorner = blindDoorMinMax[1] * Math.cos(45);
                                return numberVal >= Math.floor(fullWidth - maxCorner)
                            } else {
                                return numberVal >= fullWidth - blindDoorMinMax[1]
                            }
                        }
                    )
                    .test(
                        "is-max",
                        `Width is too big`,
                        (val: any, {parent}) => {
                            const numberVal = numericQuantity(val);
                            const fullWidth = parent['width'] || parent['custom_width'];
                            if (isAngle) {
                                const minCorner = blindDoorMinMax[0] * Math.cos(45);
                                return numberVal <= Math.floor(fullWidth - minCorner)
                            } else {
                                return numberVal <= (fullWidth - blindDoorMinMax[0])
                            }
                        }
                    )

            }),
        custom_height_string: Yup.string()
            .when('height', {
                is: 0,
                then: (schema) => schema
                    .required('Please write down height')
                    .test('limit', (val, context) => testMinMax(val, context,'height')),
            }),
        middle_section_string: Yup.string()
            .when([], {
                is: () => middleSectionDefault && middleSectionDefault > 0,
                then: (schema) => schema
                    .required()
                    .matches(/^\d{1,2}\s\d{1,2}\/\d{1,2}|\d{1,2}\/\d{1,2}|\d{1,2}/, "Type error. Example: 12 3/8")
                    .test(
                        "is-max",
                        `Cutout height should be lower than cabinet height`,
                        (val: any, {parent}) => {
                            const numberVal = numericQuantity(val);
                            const fullHeight = parent['height'] || parent['custom_height'];
                            return numberVal < fullHeight
                        }
                    )
            }),
    })
    if (product_type === "standard") return schemaBasic;
    return schemaBasic.concat(schemaExtended);
}
