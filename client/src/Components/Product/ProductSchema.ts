import * as Yup from 'yup';
import settings from './../../api/settings.json'
import {hingeArr, ProductType, sizeLimitsType} from "../../helpers/productTypes";
import {getSizeNumberRegex} from "../../helpers/helpers";
import {ObjectSchema} from "yup";
export const alignmentOptions = ['Center', 'From Face', 'From Back'] as const;

export function getProductSchema(product:ProductType, sizeLimit:sizeLimitsType): ObjectSchema<any> {
    const {isAngle, hasMiddleSection, isProductStandard} = product
    const blindDoorMinMax = settings.blindDoor;
    const minWidth = sizeLimit.width[0];
    const maxWidth = sizeLimit.width[1];
    const minHeight = sizeLimit.height[0];
    const maxHeight = sizeLimit.height[1];
    const minDepth = !isAngle ? sizeLimit.depth[0] : sizeLimit.width[0];
    const maxDepth = !isAngle ? sizeLimit.depth[1] : sizeLimit.width[1];

    const schemaStandard = Yup.object({
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
                            const numberVal = getSizeNumberRegex(val);
                            return numberVal >= minDepth
                        }
                    )
                    .test(
                        "max",
                        `Maximum ${maxDepth} inches`,
                        (val: string) => {
                            const numberVal = getSizeNumberRegex(val);
                            return numberVal <= maxDepth
                        }
                    )

            }),
        'LED borders': Yup.array()
            .of(Yup.string())
            .when('LED indent', {
                is: (val:number) => val > 0,
                then: (schema) => schema
                    .min(1, 'Choose LED Borders')
            }),
        'LED alignment': Yup.string()
            .oneOf(alignmentOptions, 'error'),
        'LED indent': Yup.string()
            .when('LED alignment', {
                is: (val: string) => val !== 'Center',
                then: (schema) => schema
                    .required('Required')
                    .matches(/^\d{1,2}\s\d{1,2}\/\d{1,2}|\d{1,2}\/\d{1,2}|\d{1,2}/, "Type error. Example: 12 3/8")
                    .test(
                        "is-max",
                        `Indent should be lower than Cabinet Depth`,
                        (val: any, {parent}) => {
                            const numberVal = getSizeNumberRegex(val);
                            const fullDepth = parent['Depth Number'] || parent['Custom Depth Number'];
                            return numberVal < fullDepth
                        }
                    )

            }),
        'Hinge opening': Yup.string().oneOf(hingeArr),
        'Options': Yup.array()
            .of(Yup.string()),
        'Door Profile': Yup.string()
            .when('Options', (options, field) =>
                options[0].includes('Glass Door') ? field.required() : field
            ),
        'Door Glass Type': Yup.string()
            .when('Options', (options, field) =>
                options[0].includes('Glass Door') ? field.required() : field
            ),
        'Door Glass Color': Yup.string()
            .when('Options', (options, field) =>
                options[0].includes('Glass Door') ? field.required() : field
            ),
        'Shelf Profile': Yup.string()
            .when('Options', (options, field) =>
                options[0].includes('Glass Shelf') ? field.required() : field
            ),
        'Shelf Glass Type': Yup.string()
            .when('Options', (options, field) =>
                options[0].includes('Glass Shelf') ? field.required() : field
            ),
        'Shelf Glass Color': Yup.string()
            .when('Options', (options, field) =>
                options[0].includes('Glass Shelf') ? field.required() : field
            ),
        'Note': Yup.string(),
        cartExtras: Yup.object({
            ptoDoors: Yup.number().required(),
            ptoDrawers: Yup.number().required(),
            glassShelf: Yup.number().required(),
            glassDoor: Yup.number().required(),
            ptoTrashBins: Yup.number().required(),
            ledPrice: Yup.number().required(),
            coefExtra: Yup.number().required(),
            attributes: Yup.array(),
            boxFromFinishMaterial: Yup.boolean()
        }),
        price: Yup.number().required().positive()
    });

    const schemaExtended = Yup.object({
        'Custom Width': Yup.string()
            .when('Width',{
                is: 0,
                then: (schema) => schema
                    .required('Please wright down width')
                    .matches(/^\d{1,2}\s\d{1,2}\/\d{1,2}|\d{1,2}\/\d{1,2}|\d{1,2}/, "Type error. Example: 12 3/8")
                    .test(
                        "min",
                        `Minimum ${minWidth} inches`,
                        (val: string) => {
                            const numberVal = getSizeNumberRegex(val);
                            return numberVal >= minWidth
                        }
                    )
                    .test(
                        "max",
                        `Maximum ${maxWidth} inches`,
                        (val: string) => {
                            const numberVal = getSizeNumberRegex(val);
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
                            const numberVal = getSizeNumberRegex(val);
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
                            const numberVal = getSizeNumberRegex(val);
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
                            const numberVal = getSizeNumberRegex(val);
                            return numberVal >= minHeight
                        }
                    )
                    .test(
                        "max",
                        `Maximum ${maxHeight} inches`,
                        (val: string) => {
                            const numberVal = getSizeNumberRegex(val);
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
                        `Middle Section height should be lower than cabinet height`,
                        (val: any, {parent}) => {
                            const numberVal = getSizeNumberRegex(val);
                            const fullHeight = parent['Height'] || parent['Custom Height'];
                            return numberVal < fullHeight
                        }
                    )
            }),
    })

    if (!isProductStandard) {
        return schemaStandard.concat(schemaExtended)
    }

    return schemaStandard;
}
