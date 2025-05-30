import * as Yup from 'yup';
import settings from './../../api/settings.json'
import {hingeArr, ProductType, sizeLimitsType} from "../../helpers/productTypes";
import {ObjectSchema} from "yup";
import {numericQuantity} from 'numeric-quantity';

export const alignmentOptions = ['Center', 'From Face', 'From Back'] as const;

export function getProductSchema(product: ProductType, sizeLimit: sizeLimitsType): ObjectSchema<any> {
    const {isAngle, hasMiddleSection, isProductStandard} = product
    const blindDoorMinMax = settings.blindDoor;
    const minWidth = sizeLimit.width[0];
    const maxWidth = sizeLimit.width[1];
    const minHeight = sizeLimit.height[0];
    const maxHeight = sizeLimit.height[1];
    const minDepth = !isAngle ? sizeLimit.depth[0] : sizeLimit.width[0];
    const maxDepth = !isAngle ? sizeLimit.depth[1] : sizeLimit.width[1];

    const schemaBasic = Yup.object({
        'Width': Yup.number().required(),
        isBlind: Yup.boolean(),
        'Blind Width': Yup.number()
            .when('isBlind', {
                is: true,
                then: (schema) => schema.required()
            }),
        'Height': Yup.number().required(),
        'Depth': Yup.number().required(),
        'Custom Depth': Yup.string()
            .when('Depth', {
                is: 0,
                then: (schema) => schema
                    .required('Please wright down depth')
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
        'LED borders': Yup.array()
            .of(Yup.string())
            .when('LED indent', {
                is: (val: number) => val > 0,
                then: (schema) => schema
                    .min(1, 'Choose LED Borders')
            }),
        'LED alignment': Yup.string()
            .oneOf(alignmentOptions, 'error'),
        'LED indent': Yup.string()
            .when('LED alignment', {
                is: (val: string) => val && val !== 'Center',
                then: (schema) => schema
                    .required('Required')
                    .matches(/^\d{1,2}\s\d{1,2}\/\d{1,2}|\d{1,2}\/\d{1,2}|\d{1,2}/, "Type error. Example: 12 3/8")
                    .test(
                        "is-max",
                        `Indent should be lower than Depth`,
                        (val: any, {parent}) => {
                            const numberVal = numericQuantity(val);
                            const fullDepth = parent['Depth'] || parent['Custom Depth'];
                            return numberVal < fullDepth
                        }
                    )

            }),
        'Hinge opening': Yup.string().oneOf(hingeArr),
        Options: Yup.array().of(Yup.string()),
        glass_door: Yup.lazy((value, context) => {
            const options = context?.parent?.Options ?? [];

            const requiredIf = (index: number) => {
                if (!options.includes('Glass Door')) return Yup.string().notRequired();
                if (isProductStandard) {
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
            .when('Options', (options, field) =>
                options[0].includes('Glass Shelf') ? field.required('Glass Shelf is required') : field
            ),
        'Note': Yup.string(),
        price: Yup.number().required().positive()
    });

    const schemaExtended = Yup.object({
        'Custom Width': Yup.string()
            .when('Width', {
                is: 0,
                then: (schema) => schema
                    .required('Please wright down width')
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
        'Custom Blind Width': Yup.string()
            .when(['isBlind', 'Blind Width'], {
                is: (isBlind: boolean, blindWidth: number) => isBlind && blindWidth === 0,
                then: (schema) => schema
                    .required('Please wright down blind width')
                    .matches(/^\d{1,2}\s\d{1,2}\/\d{1,2}|\d{1,2}\/\d{1,2}|\d{1,2}/, "Type error. Example: 12 3/8")
                    .test(
                        "is-min",
                        `Width is too small`,
                        (val: any, {parent}) => {
                            const numberVal = numericQuantity(val);
                            const fullWidth = parent['Width'] || parent['Custom Width'];
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
                            const fullWidth = parent['Width'] || parent['Custom Width'];
                            if (isAngle) {
                                const minCorner = blindDoorMinMax[0] * Math.cos(45);
                                return numberVal <= Math.floor(fullWidth - minCorner)
                            } else {
                                return numberVal <= (fullWidth - blindDoorMinMax[0])
                            }
                        }
                    )

            }),
        'Custom Height': Yup.string()
            .when('Height', {
                is: 0,
                then: (schema) => schema
                    .required('Please wright down height')
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
        'Middle Section': Yup.string()
            .when([], {
                is: () => hasMiddleSection === true,
                then: (schema) => schema
                    .required()
                    .matches(/^\d{1,2}\s\d{1,2}\/\d{1,2}|\d{1,2}\/\d{1,2}|\d{1,2}/, "Type error. Example: 12 3/8")
                    .test(
                        "is-max",
                        `Cutout height should be lower than cabinet height`,
                        (val: any, {parent}) => {
                            const numberVal = numericQuantity(val);
                            const fullHeight = parent['Height'] || parent['Custom Height'];
                            return numberVal < fullHeight
                        }
                    )
            }),
    })

    if (!isProductStandard) {
        return schemaBasic.concat(schemaExtended)
    }

    return schemaBasic;
}
