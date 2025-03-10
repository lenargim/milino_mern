import * as Yup from 'yup';
import {materialsCustomPart, materialsLimitsType} from "../../helpers/productTypes";
import { numericQuantity } from 'numeric-quantity';

const patterntwodigisaftercomma = /^\d+(\.\d{0,2})?$/;

export function getPVCSchema(materialsRange: materialsCustomPart[] | undefined, limits: materialsLimitsType | undefined): Yup.InferType<any> {
    const schemaMain = Yup.object({
        'Width': Yup.string()
            .required('Please wright down width')
            .test('min',
                ({value}) => `It's too small size`,
                (val, context) => {
                    const numberVal = numericQuantity(val);
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
                    const numberVal = numericQuantity(val);
                    const material: string | undefined = context.parent['Material'];
                    const sizeLimit = materialsRange?.find(el => el.name === material)?.limits || limits
                    if (!sizeLimit?.width) return true;
                    const maxWidth = sizeLimit.width && sizeLimit.width[1] || 999;
                    return numberVal <= maxWidth;
                }
            ),
        'Material': Yup.string().required(),
        'Note': Yup.string(),
    })

    return schemaMain;
}