import * as Yup from 'yup';
import { StringSchema} from "yup";
import {RoomType} from "../../helpers/categoriesTypes";


export const RoomSchema= (reservedNames:string[] = []) => {
    return (
        Yup.object({
            room_name: Yup.string()
                .required()
                .notOneOf(reservedNames, 'Name should be unique')
                .min(2, 'Min 2 symbols'),
            category: Yup.string()
                .ensure()
                .required() as StringSchema<RoomType | ''>,
            door_type: Yup.string()
                .ensure()
                .when('category',  {
                    is: (val:RoomType | '') => val !== 'Standard Door',
                    then: schema => schema.required('Please write down door type'),
                }),
            door_finish_material: Yup.string()
                .ensure()
                .when('category',  {
                    is: (val:RoomType | '') => val !== 'Standard Door',
                    then: schema => schema.required('Please write down finish material'),
                }),
            door_frame_width: Yup.string()
                .when('door_type', {
                    is: 'Micro Shaker',
                    then: schema => schema.required('Please choose Frame width')
                }),
            door_color: Yup.string()
                .when('door_finish_material', {
                    is: (val: string) => val !== 'No Doors No Hinges',
                    then: (schema => schema.required('Please choose down color'))
                }),
            door_grain: Yup.string(),
            box_material: Yup.string()
                .required('Please write down box material'),
            drawer_brand: Yup.string()
                .required('Please write down Drawer'),
            drawer_type: Yup.string()
                .required('Please write down drawer type'),
            drawer_color: Yup.string()
                .required('Please write color'),
            leather: Yup.string()
                .when('category', {
                    is: 'Leather Closet',
                    then: schema => schema.required('Please choose Leather Type')
                })
        })

    )
}