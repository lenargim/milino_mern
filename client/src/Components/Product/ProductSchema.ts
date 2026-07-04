import * as Yup from 'yup';
import settings from './../../api/settings.json'
import {
    finishSidesArr,
    hingeArr,
    MaybeUndefined,
    ProductOptionsType,
    ProductType,
    sizeLimitsType
} from "../../helpers/productTypes";
import {AnyObject, ObjectSchema, TestContext} from "yup";
import {numericQuantity} from 'numeric-quantity';
import {
    getBorderOptions,
    getSchemaRootValues,
    NumericQuantityRounded,
    testMinMaxCustomLimit
} from "../../helpers/helpers";
import {BorderType} from "./ProductLED";

// export const borderOptions = ['Sides', 'Top', 'Bottom', 'LED Panel'] as const;
export const alignmentOptions = ['Center', 'From Face', 'From Back'] as const;

export function getProductSchema(product: ProductType, sizeLimit: sizeLimitsType): ObjectSchema<any> {
    const {isAngle, product_type, middleSectionDefault, isBlind, hasCornerSideWidth} = product
    const blindDoorMinMax = settings.blindDoor;

    const testMinMax = (val: MaybeUndefined<string>, context: TestContext<AnyObject>, dimension: 'width' | 'height' | 'depth') => {
        if (!val) return false;
        const numberVal = NumericQuantityRounded(val);
        if (isNaN(numberVal)) return context.createError({message: `Type error. Example: 12 3/8`});
        const limit = sizeLimit[dimension]
        const min = (limit && limit[0]) ? limit[0] : 1;
        const max = (limit && limit[1]) ? limit[1] : 999;
        if (numberVal < min) return context.createError({message: `Minimum ${min} inches`})
        if (numberVal > max) return context.createError({message: `Maximum ${max} inches`})
        return true;
    }

    const getMaxIndent = (context: TestContext<AnyObject>) => {
        const root = getSchemaRootValues(context);
        return (root['depth'] || root['custom_depth']) - 1;
    }


    const getBlindLimits = (fullWidth: number) => {
        if (isAngle) {
            const angleCoef = Math.cos(45);
            return {
                min: Math.floor(fullWidth - blindDoorMinMax[1] * angleCoef),
                max: Math.floor(fullWidth - blindDoorMinMax[0] * angleCoef),
            };
        }
        if (hasCornerSideWidth) {
            return {
                min: 0,
                max: 99
            }
        }

        return {
            min: fullWidth - blindDoorMinMax[1],
            max: fullWidth - blindDoorMinMax[0],
        };
    };

    const schemaBasic = Yup.object({
        width: Yup.number().required(),
        blind_width: Yup.number()
            .test("isRequired", "Blind width is a required field", (val, {parent}) => {
                if (isBlind || hasCornerSideWidth) return !!val || parent.custom_blind_width
                return true;
            }),
        height: Yup.number().required(),
        depth: Yup.number().required(),
        custom_depth_string: Yup.string()
            .when('depth', {
                is: 0,
                then: (schema) => schema
                    .required('Please write down depth')
                    .test('limit', (val, context) => testMinMax(val, context, 'depth')),

            }),
        custom_depth: Yup.number().nullable(),
        led: Yup.object({
            border: Yup.array().of(Yup.mixed<BorderType>().oneOf(getBorderOptions(product.id), 'Error')),
            alignment: Yup.string()
                .when('border', {
                    is: (val: string[]) => val.length,
                    then: (schema) => schema
                        .required('Please choose alignment')
                        .oneOf(alignmentOptions, 'Error')
                        .default('Center')
                }),
            indent_string: Yup.string()
                .when('alignment', {
                    is: (val: string) => val && val !== 'Center',
                    then: (schema) => schema
                        .required('Required')
                        .matches(/^\d{1,2}\s\d{1,2}\/\d{1,2}|\d{1,2}\/\d{1,2}|\d{1,2}/, "Type error. Example: 12 3/8")

                        .test('limit', (val, context) => testMinMaxCustomLimit(val, context, 1, getMaxIndent(context))),
                }),
            indent: Yup.number().nullable()
        }),
        hinge_opening: Yup.string().oneOf(hingeArr),
        finish_sides: Yup.array().of(Yup.string().oneOf(finishSidesArr)),
        options: Yup.array().of(Yup.mixed<ProductOptionsType>()),
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
                    .test('limit', (val, context) => testMinMax(val, context, 'width')),
            }),
        custom_blind_width_string: Yup.string()
            .when('blind_width', {
                is: (blindWidth: number) => (isBlind || hasCornerSideWidth) && blindWidth === 0,
                then: (schema) => schema
                    .required('Please write down blind width')
                    .matches(/^\d{1,2}\s\d{1,2}\/\d{1,2}|\d{1,2}\/\d{1,2}|\d{1,2}/, "Type error. Example: 12 3/8")
                    .test('min-max', function (val, context){
                        const {parent, createError} = context;
                        const cabinet_width = parent.width || parent.custom_width;
                        const numberVal = NumericQuantityRounded(val)
                        let min = 0;
                        let max = Infinity;
                        if (isBlind) {
                            if (isAngle) {
                                const minCorner = blindDoorMinMax[0] * Math.cos(45);
                                const maxCorner = blindDoorMinMax[1] * Math.cos(45);
                                min = Math.floor(cabinet_width - maxCorner);
                                max = Math.floor(cabinet_width - minCorner);
                            } else {
                                min = cabinet_width - blindDoorMinMax[1];
                                max = cabinet_width - blindDoorMinMax[0];
                            }

                        }
                        if (hasCornerSideWidth) {
                            /// Unknown
                            min = 9;
                            max = 25
                        }

                        if (numberVal < min) return context.createError({message: `Minimum ${min} inches`})
                        if (numberVal > max) return context.createError({message: `Maximum ${max} inches`});
                        return true;
                    })
            }),
        custom_height_string: Yup.string()
            .when('height', {
                is: 0,
                then: (schema) => schema
                    .required('Please write down height')
                    .test('limit', (val, context) => testMinMax(val, context, 'height')),
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
                            const numberVal = NumericQuantityRounded(val);
                            const fullHeight = parent['height'] || parent['custom_height'];
                            return numberVal < fullHeight
                        }
                    )
            }),
        options: Yup.array().of(Yup.mixed<ProductOptionsType>()),
        farm_sink_height_string: Yup.string()
            .when('options', {
                is: (opts: ProductOptionsType[]) => opts.includes('Farm Sink'),
                then: (schema) => schema
                    .required("Farm Sink height is required")
                    .test('limit', (val, context) => testMinMaxCustomLimit(val, context, 1, 999)),
            })

    })
    if (product_type === "standard") return schemaBasic;
    return schemaBasic.concat(schemaExtended);
}
