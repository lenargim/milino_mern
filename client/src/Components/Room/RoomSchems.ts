import * as Yup from 'yup';
import {roomCategories} from "../../helpers/productTypes";
import {ObjectSchema} from "yup";
import {MaterialsFormType} from "../../common/MaterialsForm";

export const RoomSchema = (reservedNames: string[] = []):ObjectSchema<MaterialsFormType> => {
    return (
        Yup.object({
            room_name: Yup.string()
                .required('Enter Process Order name')
                .notOneOf(reservedNames, 'Name should be unique')
                .min(2, 'Min 2 symbols')
                .default('')
                .defined('Enter Process Order name'),
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
                })
        })

    )
}