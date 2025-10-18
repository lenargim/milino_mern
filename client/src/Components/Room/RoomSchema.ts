import * as Yup from 'yup';
import {ObjectSchema} from "yup";
import {
    DoorTypesType, FinishTypes, golaNames,
    GolaType, golaTypeNames,
    GolaTypesType, grooveNames, GrooveType,
    roomCategories,
    RoomCategoriesType,
    RoomMaterialsFormType
} from "../../helpers/roomTypes";
import {BoxMaterialType, totalBoxMaterialNames} from "../../helpers/roomTypes";
import {MaybeEmpty} from "../../helpers/productTypes";
import {
    findHasGolaTypeByCategory,
    getDoorColorsArr,
    getDoorFinishArr, getGrainArr,
    isClosetLeatherOrRTA, isDoorGrain,
    isGolaShown
} from "../../helpers/helpers";
import materials from './../../api/materials.json'

export const RoomSchema = (reservedNames: string[] = []): ObjectSchema<RoomMaterialsFormType> => {
    return (
        Yup.object({
            name: Yup.string()
                .required('Enter purchase order name')
                .test("Unique", "Name should be unique", (value,) => {
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
                .default('')
                .when('category', {
                    is: (category:RoomCategoriesType) => {
                        const isRTACloset = category === 'RTA Closet';
                        return !isRTACloset
                    },
                    then: schema => schema.notOneOf([''], 'Please choose door type')
                }),
            groove: Yup.mixed<MaybeEmpty<GrooveType>>()
                .default('')
                .when('door_type', {
                    is: 'Wood ribbed doors',
                    then: schema => schema.oneOf(grooveNames, 'Please choose Grooves style')
                }),
            door_finish_material: Yup.mixed<MaybeEmpty<FinishTypes>>()
                .default('')
                .when(['category', 'door_type'], {
                    is: (category:MaybeEmpty<RoomCategoriesType>, door_type:MaybeEmpty<DoorTypesType>) => {
                        const isRTACloset = category === 'RTA Closet';
                        if (isRTACloset || door_type === 'Standard Size White Shaker') return false;
                        return true
                    },
                    then: schema => schema.notOneOf([''], 'Please choose door finish material')
                })
            ,
            door_frame_width: Yup.string()
                .default('')
                .when('door_type', {
                    is: 'Micro Shaker',
                    then: schema => schema.notOneOf([''], 'Please choose frame width')
                }),
            door_color: Yup.string()
                .default('')
                .when(['category','door_finish_material' ], {
                    is: (category: RoomCategoriesType, door_finish_material: MaybeEmpty<FinishTypes>) => {
                        const isRTACloset = category === 'RTA Closet';
                        const noHinges = door_finish_material === 'No Doors No Hinges';
                        if (isRTACloset || noHinges) return false;
                        return true;
                    },
                    then: schema => schema.notOneOf([''], 'Please choose door color')
                }),
            door_grain: Yup.string()
                .default('')
                .when(['category', 'door_type', 'door_finish_material', 'door_color'], {
                    is: (category:MaybeEmpty<RoomCategoriesType>, door_type:MaybeEmpty<DoorTypesType>, door_finish_material:MaybeEmpty<FinishTypes>, door_color:string) => {
                        if (!category || !door_type || !door_finish_material || !door_color) return true;
                        const finishArr = getDoorFinishArr(materials.doors, door_type);
                        const colorArr = getDoorColorsArr(door_finish_material, door_type, finishArr);
                        const grainArr = getGrainArr(materials.grain, colorArr, door_color)
                        return !isDoorGrain(category, door_finish_material, grainArr)
                    },
                    then: schema => schema,
                    otherwise: schema => schema.notOneOf([''], 'Please choose door grain')
                })
            ,
            box_material: Yup.mixed<MaybeEmpty<BoxMaterialType>>()
                .defined()
                .oneOf(totalBoxMaterialNames)
                .required('Please write down box material'),
            box_color: Yup.string()
                .defined()
                .when('category', {
                    is: (val: MaybeEmpty<RoomCategoriesType>) => isClosetLeatherOrRTA(val),
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