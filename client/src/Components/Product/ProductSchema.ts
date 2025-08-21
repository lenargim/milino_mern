import * as Yup from 'yup';
import settings from './../../api/settings.json'
import {hingeArr, ProductType, sizeLimitsType} from "../../helpers/productTypes";
import {ObjectSchema} from "yup";
import {numericQuantity} from 'numeric-quantity';

export const borderOptions = ['Sides', 'Top', 'Bottom'] as const;
export const alignmentOptions = ['Center', 'From Face', 'From Back'] as const;

export function getProductSchema(product: ProductType, sizeLimit: sizeLimitsType): ObjectSchema<any> {
    const {isAngle, product_type, middleSectionDefault, isBlind} = product
    const blindDoorMinMax = settings.blindDoor;
    const minWidth = sizeLimit.width[0];
    const maxWidth = sizeLimit.width[1];
    const minHeight = sizeLimit.height[0];
    const maxHeight = sizeLimit.height[1];
    const minDepth = !isAngle ? sizeLimit.depth[0] : sizeLimit.width[0];
    const maxDepth = !isAngle ? sizeLimit.depth[1] : sizeLimit.width[1];

    const schemaBasic = Yup.object({
        width: Yup.number().required(),
        // isBlind: Yup.boolean(),
        blind_width: Yup.number()
            .test("isRequired", "Blind width is a required field", (val, {parent}) => {
                if (isBlind) return !!val || parent.custom_blind_width
            return true;
        }),
            // .when('isBlind', {
            //     is: true,
            //     then: (schema) => schema.required()
            // }),
        height: Yup.number().required(),
        depth: Yup.number().required(),
        custom_depth_string: Yup.string()
            .when('depth', {
                is: 0,
                then: (schema) => schema
                    .required('Please write down depth')
                    .matches(/^\d{1,2}\s\d{1,2}\/\d{1,2}|\d{1,2}\/\d{1,2}|\d{1,2}/, "Type error. Example: 12 3/8")
                    .test(
                        "min",
                        `Minimum ${minDepth} inches`,
                        (val: string) => {
                            const numberVal = numericQuantity(val);
                            return numberVal >= minDepth
                        }
                    )
                    .test(
                        "max",
                        `Maximum ${maxDepth} inches`,
                        (val: string) => {
                            const numberVal = numericQuantity(val);
                            return numberVal <= maxDepth
                        }
                    )

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
                    .matches(/^\d{1,2}\s\d{1,2}\/\d{1,2}|\d{1,2}\/\d{1,2}|\d{1,2}/, "Type error. Example: 12 3/8")
                    .test(
                        "min",
                        `Minimum ${minWidth} inches`,
                        (val: string) => {
                            const numberVal = numericQuantity(val);
                            return numberVal >= minWidth
                        }
                    )
                    .test(
                        "max",
                        `Maximum ${maxWidth} inches`,
                        (val: string) => {
                            const numberVal = numericQuantity(val);
                            return numberVal <= maxWidth
                        }
                    )
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
                    .matches(/^\d{1,2}\s\d{1,2}\/\d{1,2}|\d{1,2}\/\d{1,2}|\d{1,2}/, "Type error. Example: 12 3/8")
                    .test(
                        "min",
                        `Minimum ${minHeight} inches`,
                        (val: string) => {
                            const numberVal = numericQuantity(val);
                            return numberVal >= minHeight
                        }
                    )
                    .test(
                        "max",
                        `Maximum ${maxHeight} inches`,
                        (val: string) => {
                            const numberVal = numericQuantity(val);
                            return numberVal <= maxHeight
                        }
                    )
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
