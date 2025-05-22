import * as Yup from 'yup';
import {CustomPartType} from "../../helpers/productTypes";
import {numericQuantity} from 'numeric-quantity';

export function getCustomPartSchema(product: CustomPartType): Yup.InferType<any> {
    const {materials_array, limits, type} = product;
    const customSchema = Yup.object({
        'Width': Yup.string()
            .required('Please wright down width')
            .matches(/^\d{1,2}\s\d{1,2}\/\d{1,2}|\d{1,2}\/\d{1,2}|\d{1,2}/, "Type error. Example: 12 3/8")
            .test('min',
                ({value}) => `It's too small size`,
                (val, context) => {
                    const numberVal = numericQuantity(val);
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
                    const numberVal = numericQuantity(val);
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
                    const numberVal = numericQuantity(val);
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
                    const numberVal = numericQuantity(val);
                    const material: string | undefined = context.parent['Material'];
                    const sizeLimit = materials_array?.find(el => el.name === material)?.limits || limits
                    if (!sizeLimit?.height) return true;
                    const maxHeight = sizeLimit.height && sizeLimit.height[1] || 999;
                    return numberVal <= maxHeight;
                }
            ),
        'Depth': Yup.string()
            .required('Please wright down depth')
            .test('min',
                ({value}) => `It's too small size`,
                (val, context) => {
                    const numberVal = numericQuantity(val);
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
                    const numberVal = numericQuantity(val);
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
                glass_door: Yup.lazy((value, context) => {
                    const requiredIf = (index: number) => {
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
            })
            return customSchema.concat(glassDoorSchema)
        case "glass-shelf":
            const shelfDoorSchema = Yup.object({
                glass_shelf: Yup.string().required('Glass Shelf required'),
            })
            return customSchema.concat(shelfDoorSchema)
        case "led-accessories":
            return Yup.object({
                price: Yup.number().required().positive()
            })
        case "door-accessories":
            return Yup.object({
                price: Yup.number().required().positive(),
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