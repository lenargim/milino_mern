import * as Yup from 'yup';
import {materialsCustomPart, materialsLimitsType} from "../../helpers/productTypes";
import {getSizeNumberRegex} from "../../helpers/helpers";

const patterntwodigisaftercomma = /^\d+(\.\d{0,2})?$/;
const patternthreedigisaftercomma = /^\d+(\.\d{0,3})?$/;

export function getCustomPartSchema(materialsRange: materialsCustomPart[] | undefined, limits: materialsLimitsType | undefined): Yup.InferType<any> {
    const schemaMain = Yup.object({
        'Width': Yup.string()
            .required('Please wright down width')
            // .typeError('Invalid Input: numbers please')
            .matches(/^\d{1,2}\s\d{1,2}\/\d{1,2}|\d{1,2}\/\d{1,2}|\d{1,2}/, "Type error. Example: 12 3/8")
            // .test("is-decimal",
            //     "Maximum two digits after comma",
            //     (val: any) => {
            //         return val !== undefined ? patterntwodigisaftercomma.test(val) : true
            //     })
            .test('min',
                ({value}) => `It's too small size`,
                (val, context) => {
                    const numberVal = getSizeNumberRegex(val);
                    const material: string | undefined = context.parent['Material'];
                    const sizeLimit = materialsRange?.find(el => el.name === material)?.limits ?? limits
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
                    const sizeLimit = materialsRange?.find(el => el.name === material)?.limits || limits
                    if (!sizeLimit?.width) return true;
                    const maxWidth = sizeLimit.width && sizeLimit.width[1] || 999;
                    return numberVal <= maxWidth;
                }
            )
        ,
        'Height': Yup.string()
            .required('Please wright down height')
            // .typeError('Invalid Input: numbers please')
            // .test("is-decimal",
            //     "Maximum two digits after comma",
            //     (val: any) => {
            //         return val !== undefined ? patterntwodigisaftercomma.test(val) : true
            //     })
            .matches(/^\d{1,2}\s\d{1,2}\/\d{1,2}|\d{1,2}\/\d{1,2}|\d{1,2}/, "Type error. Example: 12 3/8")
            .test('min',
                ({value}) => `It's too small size`,
                (val, context) => {
                    const numberVal = getSizeNumberRegex(val);
                    const material: string | undefined = context.parent['Material'];
                    const sizeLimit = materialsRange?.find(el => el.name === material)?.limits || limits
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
                    const sizeLimit = materialsRange?.find(el => el.name === material)?.limits || limits
                    if (!sizeLimit?.height) return true;
                    const maxHeight = sizeLimit.height && sizeLimit.height[1] || 999;
                    return numberVal <= maxHeight;
                }
            )
        ,
        'Depth': Yup.string()
            .required('Please wright down depth')
            // .typeError('Invalid Input: numbers please')
            // .test("is-decimal",
            //     "Maximum three digits after comma",
            //     (val: any) => {
            //         return val !== undefined ? patternthreedigisaftercomma.test(val) : true
            //     })
            .test('min',
                ({value}) => `It's too small size`,
                (val, context) => {
                    const numberVal = getSizeNumberRegex(val);
                    const material: string | undefined = context.parent['Material'];
                    const sizeLimit = materialsRange?.find(el => el.name === material)?.limits || limits
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
                    const sizeLimit = materialsRange?.find(el => el.name === material)?.limits || limits
                    if (!sizeLimit?.depth) return true;
                    const maxDepth = sizeLimit.depth && sizeLimit.depth[1] || 999;
                    return numberVal <= maxDepth;
                }
            ),
        'Material': Yup.string(),
        'Note': Yup.string(),
    })

    return schemaMain;
}