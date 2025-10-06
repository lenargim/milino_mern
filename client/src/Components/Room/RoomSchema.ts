import * as Yup from 'yup';
import {ObjectSchema} from "yup";
import {
    DoorTypesType, finishNames, FinishTypes, golaNames,
    GolaType, golaTypeNames,
    GolaTypesType, grooveNames, GrooveType,
    roomCategories,
    RoomCategoriesType,
    RoomMaterialsFormType
} from "../../helpers/roomTypes";
import {BoxMaterialType, totalBoxMaterialNames} from "../../helpers/roomTypes";
import {MaybeEmpty} from "../../helpers/productTypes";
import {findHasGolaTypeByCategory, isCloset, isGolaShown, isLeatherOrRTACloset} from "../../helpers/helpers";


export const RoomSchema = (reservedNames: string[] = []): ObjectSchema<RoomMaterialsFormType> => {
    return (
        Yup.object({
            name: Yup.string()
                .required('Enter purchase order name')
                .test("Unique", "Name should be unique", (value) => {
                    if (!value) return false;
                    return !reservedNames.includes(value.trim().toLowerCase())
                })
                .min(2, 'Min 2 symbols')
                .defined('Enter Room name'),
            category: Yup.mixed<RoomCategoriesType>()
                .oneOf(roomCategories)
                .defined()
                .required('Choose category'),
            category_gola_type: Yup.mixed<MaybeEmpty<GolaTypesType>>()
                .default('')
                .oneOf([...golaTypeNames, ''] as const)
                .when('category', {
                    is: (val: MaybeEmpty<RoomCategoriesType>) => findHasGolaTypeByCategory(val),
                    then: (schema => schema.oneOf(golaTypeNames,'Please choose gola type'))
                }),
            gola: Yup.mixed<MaybeEmpty<GolaType>>()
                .default('')
                .when('category_gola_type', {
                    is: (val: MaybeEmpty<GolaTypesType>) => isGolaShown(val),
                    then: schema => schema.oneOf(golaNames, 'Please choose gola type')
                }),
            door_type: Yup.mixed<MaybeEmpty<DoorTypesType>>()
                .default(''),
            groove: Yup.mixed<MaybeEmpty<GrooveType>>()
                .default('')
                .when('door_type', {
                    is: 'Wood ribbed doors',
                    then: schema => schema.oneOf(grooveNames, 'Please choose Grooves style')
                }),
            door_finish_material: Yup.mixed<MaybeEmpty<FinishTypes>>()
                .default('')
                .oneOf([...finishNames, ''] as const),
            door_frame_width: Yup.string()
                .default('')
                .when('door_type', {
                    is: 'Micro Shaker',
                    then: schema => schema.required('Please choose Frame width')
                }),
            door_color: Yup.string()
                .default('')
                .when(['door_finish_material', 'category'], {
                    is: (door_finish_material: MaybeEmpty<FinishTypes>, category: RoomCategoriesType) => {
                        const isRTACloset = category === 'RTA Closet';
                        const noHinges = door_finish_material === 'No Doors No Hinges';
                        return isRTACloset && noHinges;
                    },
                    then: schema => schema.required('Please choose color')
                }),
            door_grain: Yup.string()
                .default(''),
            box_material: Yup.mixed<MaybeEmpty<BoxMaterialType>>()
                .defined()
                .oneOf(totalBoxMaterialNames)
                .required('Please write down box material'),
            box_color: Yup.string()
                .defined()
                .when('category', {
                    is: (val: MaybeEmpty<RoomCategoriesType>) => isLeatherOrRTACloset(val),
                    then: schema => schema.required('Please choose Box Color'),
                    otherwise: schema => schema.default('')
                }),
            drawer_brand: Yup.string()
                .defined()
                .required('Please write down Drawer'),
            drawer_type: Yup.string()
                .default('')
                .required('Please write down drawer type'),
            drawer_color: Yup.string()
                .default('')
                .when('drawer_type', {
                    is: (val: string) => val !== 'Undermount',
                    then: (schema => schema.required('Please write color'))
                }),
            leather: Yup.string()
                .defined()
                .when('category', {
                    is: 'Leather Closet',
                    then: schema => schema.required('Please choose Leather Type'),
                    otherwise: schema => schema.default('')
                }),
            leather_note: Yup.string()
                .default('')
                .when('leather', {
                    is: 'Other',
                    then: schema => schema
                        .min(3, 'Minimum 3 symbols')
                        .max(80, 'Too long note')
                        .required('Leather Note is required')
                })
        })

    )
}