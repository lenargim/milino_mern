import * as Yup from 'yup';
import {RoomType} from "../../helpers/categoriesTypes";
import {ObjectSchema} from "yup";
import {MaybeEmpty, roomCategories} from "../../helpers/productTypes";
import {MaterialsFormType} from "../../common/MaterialsForm";

export const OrderFormSchema: ObjectSchema<MaterialsFormType> = Yup.object({
    room_name: Yup.string()
        .default(null)
        .defined('Enter room name')
        .nullable(),
        // .required('Enter room name'),
    category: Yup.string()
        .oneOf(roomCategories)
        .defined()
        .required(),
    door_type: Yup.string()
        .default('')
        .when('category', {
            is: (val: MaybeEmpty<RoomType>) => val !== 'Standard Door',
            then: schema => schema.required('Please write down door type').required(),
        }),
    door_finish_material: Yup.string()
        .default('')
        .when('category', {
            is: (val: MaybeEmpty<RoomType>) => val !== 'Standard Door',
            then: schema => schema.required('Please write down finish material'),
        }),
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
        })
})
