import * as Yup from 'yup';
import {ObjectSchema} from "yup";
import {roomCategories} from "../../helpers/productTypes";
import {MaterialsFormType} from "../../common/MaterialsForm";

export const OrderFormSchema: ObjectSchema<MaterialsFormType> = Yup.object({
    room_name: Yup.string()
        .default(null)
        .defined('Enter purchase order name')
        .nullable(),
    category: Yup.string()
        .oneOf(roomCategories)
        .defined()
        .required(),
    gola: Yup.string()
        .default('')
        .when('category', {
            is: (val:string) => val === 'Kitchen' || val === 'Vanity',
            then: (schema => schema.required('Please choose gola type'))
        }),
    door_type: Yup.string()
        .default(''),
    door_finish_material: Yup.string()
        .default(''),
    door_frame_width: Yup.string()
        .default('')
        .when('door_type', {
            is: 'Micro Shaker',
            then: schema => schema.required('Please choose Frame width')
        }),
    door_color: Yup.string()
        .default('')
        .when('door_finish_material', {
            is: (val: string) => val !== 'No Doors No Hinges',
            then: (schema => schema.required('Please choose color'))
        }),
    door_grain: Yup.string()
        .default(''),
    box_material: Yup.string()
        .default('')
        .required('Please write down box material'),
    box_color: Yup.string()
        .default('')
        .when('category', {
            is: 'Leather Closet',
            then: schema => schema.required('Please choose Box Color')
        }),
    drawer_brand: Yup.string()
        .default('')
        .required('Please write down Drawer'),
    drawer_type: Yup.string()
        .default('')
        .required('Please write down drawer type'),
    drawer_color: Yup.string()
        .default('')
        .required('Please write color'),
    leather: Yup.string()
        .default('')
        .when('category', {
            is: 'Leather Closet',
            then: schema => schema.required('Please choose Leather Type')
        }),
    leather_note: Yup.string()
        .default('')
        .when('leather', {
            is: 'Other',
            then: schema => schema.required('Leather Note is required')
        })
})
