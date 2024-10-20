import * as Yup from 'yup';
import {CustomPart, materialsCustomPart, materialsLimitsType} from "../../helpers/productTypes";
import {getSizeNumberRegex} from "../../helpers/helpers";
import {string, tuple} from "yup";

const patterntwodigisaftercomma = /^\d+(\.\d{0,2})?$/;
const patternthreedigisaftercomma = /^\d+(\.\d{0,3})?$/;


export function getCustomPartSchema(product: CustomPart): Yup.InferType<any> {
    const {materials_array, limits, type} = product;
    const customSchema = Yup.object({
        'Width': Yup.string()
            .required('Please wright down width')
            .matches(/^\d{1,2}\s\d{1,2}\/\d{1,2}|\d{1,2}\/\d{1,2}|\d{1,2}/, "Type error. Example: 12 3/8")
            .test('min',
                ({value}) => `It's too small size`,
                (val, context) => {
                    const numberVal = getSizeNumberRegex(val);
                    const material: string | undefined = context.parent['Material'];
                    const sizeLimit = materials_array?.find(el => el.name === material)?.limits ?? limits
                    if (!sizeLimit?.width) return true;
                    const minWidth = sizeLimit.width && sizeLimit.width[0] || 1;
                    return numberVal >= minWidth;
                }
            )
            .test('max',
                ({value}) => `It's too huge size`,
                (val, context) => {
                    const numberVal = getSizeNumberRegex(val);
                    const material: string | undefined = context.parent['Material'];
                    const sizeLimit = materials_array?.find(el => el.name === material)?.limits || limits
                    if (!sizeLimit?.width) return true;
                    const maxWidth = sizeLimit.width && sizeLimit.width[1] || 999;
                    return numberVal <= maxWidth;
                }
            ),
        'Height': Yup.string()
            .required('Please wright down height')
            .matches(/^\d{1,2}\s\d{1,2}\/\d{1,2}|\d{1,2}\/\d{1,2}|\d{1,2}/, "Type error. Example: 12 3/8")
            .test('min',
                ({value}) => `It's too small size`,
                (val, context) => {
                    const numberVal = getSizeNumberRegex(val);
                    const material: string | undefined = context.parent['Material'];
                    const sizeLimit = materials_array?.find(el => el.name === material)?.limits || limits
                    if (!sizeLimit?.height) return true;
                    const minHeight = sizeLimit.height && sizeLimit.height[0] || 1;
                    return numberVal >= minHeight;
                }
            )
            .test('max',
                ({value}) => `It's too huge size`,
                (val, context) => {
                    const numberVal = getSizeNumberRegex(val);
                    const material: string | undefined = context.parent['Material'];
                    const sizeLimit = materials_array?.find(el => el.name === material)?.limits || limits
                    if (!sizeLimit?.height) return true;
                    const maxHeight = sizeLimit.height && sizeLimit.height[1] || 999;
                    return numberVal <= maxHeight;
                }
            )
        ,
        'Depth': Yup.string()
            .required('Please wright down depth')
            .test('min',
                ({value}) => `It's too small size`,
                (val, context) => {
                    const numberVal = getSizeNumberRegex(val);
                    const material: string | undefined = context.parent['Material'];
                    const sizeLimit = materials_array?.find(el => el.name === material)?.limits || limits
                    if (!sizeLimit?.depth) return true;
                    const minDepth = sizeLimit.depth && sizeLimit.depth[0] || 1;
                    return numberVal >= minDepth;
                }
            )
            .test('max',
                ({value}) => `It's too huge size`,
                (val, context) => {
                    const numberVal = getSizeNumberRegex(val);
                    const material: string | undefined = context.parent['Material'];
                    const sizeLimit = materials_array?.find(el => el.name === material)?.limits || limits
                    if (!sizeLimit?.depth) return true;
                    const maxDepth = sizeLimit.depth && sizeLimit.depth[1] || 999;
                    return numberVal <= maxDepth;
                }
            ),
        'Material': Yup.string(),
        'Note': Yup.string(),
        price: Yup.number().required().positive()
    })
    switch (type) {
        case "custom":
        case "backing":
        case "pvc":
            return customSchema
        case "glass-door":
            const glassDoorSchema = Yup.object({
                glass_door: Yup.tuple([
                    Yup.string(),
                    Yup.string().required('Door Type required'),
                    Yup.string().required('Door Color required'),
                ]).required('Glass Door settings required'),
            })
            return customSchema.concat(glassDoorSchema)
        case "glass-shelf":
            const shelfDoorSchema = Yup.object({
                glass_shelf: Yup.string().required('Glass Shelf required'),
            })
            return customSchema.concat(shelfDoorSchema)
        case "led-accessories":
            // case "door-accessories":
            return Yup.object({
                price: Yup.number().required().positive()
            })

        case "door-accessories":
            return Yup.object({
                price: Yup.number().required().positive(),
                // doorAccessoiresType: Yup.object({
                //     hingeHoleCustom: Yup.object().shape({
                //         qty: Yup.number(),
                //         label: Yup.string(),
                //         title: Yup.string()
                //             .when('qty', {
                //                 is: (val: number) => val > 0,
                //                 then: schema => schema.required('Enter custom hinge')
                //             })
                //     })
                // })
            })
        case "standard-door":
        case "standard-glass-door":
            return Yup.object({
                standard_door: Yup.object().shape({
                    doors: Yup.array().of(Yup.object().shape({
                        name: Yup.string(),
                        qty: Yup.number().integer().positive()
                    })).min(1),
                    color: Yup.string().required('Choose Color')
                }),
                price: Yup.number().required().positive(),
            })
        default:
            return undefined
    }

}