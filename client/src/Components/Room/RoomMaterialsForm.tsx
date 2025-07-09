import React, {FC, useEffect} from 'react';
import {Form, useFormikContext} from "formik";
import {
    findHasGolaByCategory,
    getBoxMaterialArr, getBoxMaterialColorsArr,
    getDoorColorsArr,
    getDoorTypeArr, getDrawerBrandArr, getDrawerColorArr, getDrawerTypeArr,
    getGrainArr,
    isBoxColor,
    isBoxMaterial,
    isDoorColorShown,
    isDoorFinishShown,
    isDoorFrameWidth,
    isDoorGrain,
    isDoorTypeShown,
    isDrawerBrand, isDrawerColor, isDrawerType, isGolaShown, isLeatherNote,
    isLeatherType,
    useAppDispatch, useAppSelector,
    usePrevious
} from "../../helpers/helpers";
import {colorType, finishType, materialsData, MaterialsType} from "../../helpers/materialsTypes";
import s from "./room.module.sass";
import {TextInput} from "../../common/Form";
import RoomMaterialsDataType from "./RoomMaterialsDataType";
import materialsAPI from "../../api/materials.json";
import {MaybeEmpty, MaybeUndefined} from "../../helpers/productTypes";
import {calculateCartPriceAfterMaterialsChange} from "../../helpers/calculatePrice";
import {RoomCategoriesType, RoomMaterialsFormType} from "../../helpers/roomTypes";
import {RoomsState, updateCartAfterMaterialsChange} from "../../store/reducers/roomSlice";

const {
    categories,
    gola: golaArr,
    doors,
    boxMaterial,
    drawers,
    leatherType: leatherTypeArr,
    grain,
}: MaterialsType = materialsAPI;

export const materialsFormInitial: RoomMaterialsFormType = {
    name: '',
    category: '',
    gola: '',
    door_type: '',
    door_finish_material: '',
    door_frame_width: '',
    door_color: '',
    door_grain: '',
    box_material: '',
    box_color: '',
    drawer_brand: '',
    drawer_type: '',
    drawer_color: '',
    leather: '',
    leather_note: ''
}

function shouldClearFormData(category:MaybeEmpty<RoomCategoriesType>, prevCategory:MaybeUndefined<string>):boolean {
    if (!category || !prevCategory) return false;
    if (category === prevCategory) return false;
    if (category === 'Leather Closet' && prevCategory !== 'Leather Closet') return true;
    if (category === 'Simple Closet' && prevCategory !== 'Simple Closet') return true;
    return false;
}

const RoomMaterialsForm: FC<{ isRoomNew: boolean}> = ({isRoomNew}) => {
    const dispatch = useAppDispatch()
    const {values, setFieldValue, isValid, isSubmitting, setValues, errors} = useFormikContext<RoomMaterialsFormType>();
    const {
        name,
        gola,
        category,
        door_type,
        door_finish_material,
        door_frame_width,
        door_color,
        door_grain,
        box_material,
        box_color,
        drawer_brand,
        drawer_type,
        drawer_color,
        leather,
        leather_note
    } = values;

    const submitText = isRoomNew ? 'Create Room' : 'Edit Room';
    const roomNameText = isRoomNew ? 'New Room Name' : 'Room Name';
    const leatherBoxMaterialArr: MaybeUndefined<finishType[]> = materialsAPI.doors.find(el => el.value === 'Slab')?.finish
    const isLeather = category === 'Leather Closet';
    const isSimpleCloset = category === 'Simple Closet';
    const isCloset = isLeather || isSimpleCloset;
    const isStandardDoor = door_type === 'Standard White Shaker';
    const hasGola = findHasGolaByCategory(category);
    const doorTypeArr = getDoorTypeArr(doors, gola, isLeather);
    const finishArr = doors.find(el => el.value === door_type)?.finish ?? [];
    const colorArr = getDoorColorsArr(door_finish_material, isStandardDoor, doors, door_type) ?? []
    const boxMaterialArr: finishType[] = getBoxMaterialArr(isCloset, boxMaterial, leatherBoxMaterialArr || [])
    const boxMaterialColor: colorType[] = getBoxMaterialColorsArr(isLeather, isSimpleCloset,box_material, boxMaterialArr, boxMaterial);
    const drawerBrandArr = getDrawerBrandArr(drawers);
    const drawerTypesArr = getDrawerTypeArr(drawers, drawer_brand);
    const drawerColorsArr = getDrawerColorArr(drawers, drawer_brand, drawer_type)
    const frameArr: materialsData[] = doors.find(el => el.value === door_type)?.frame ?? [];
    const grainArr = getGrainArr(grain, colorArr, door_color)
    const prevCategory = usePrevious(category);
    const {cart_items} = useAppSelector<RoomsState>(state => state.room)

    useEffect(() => {
        if (shouldClearFormData(category, prevCategory)) {
            setValues({
                name,
                category,
                gola: '',
                door_type: '',
                door_finish_material: '',
                door_frame_width: '',
                door_color: '',
                door_grain: '',
                box_material: '',
                box_color: '',
                drawer_brand: '',
                drawer_type: '',
                drawer_color: '',
                leather: '',
                leather_note: ''
            })
        }
    }, [category])

    // Check is values are in array
    useEffect(() => {
        switch (finishArr?.length) {
            case 1:
                setFieldValue('door_finish_material', finishArr[0].value);
                break;
            case undefined:
                setFieldValue('door_finish_material', '');
                break;
            default:
                if (door_finish_material && finishArr && !finishArr.some(el => el.value === door_finish_material)) {
                    setFieldValue('door_finish_material', '');
                }
        }
        switch (colorArr?.length) {
            case 1:
                setFieldValue('door_color', colorArr[0].value);
                break;
            case undefined:
            case 0:
                setFieldValue('door_color', '');
                break;
            default:
                if (!showDoorColor || (door_color && colorArr && !colorArr.some(el => el.value === door_color))) {
                    setFieldValue('door_color', '');
                }
        }
        switch (boxMaterialColor?.length) {
            case 1:
                setFieldValue('box_color', boxMaterialColor[0].value);
                break;
            case undefined:
            case 0:
                setFieldValue('box_color', '');
                break;
            default:
                if (!showBoxColor || (box_color && !boxMaterialColor.some(el => el.value === box_color))) {
                    setFieldValue('box_color', '');
                }
        }
        if (category && box_material && !boxMaterialArr.some(el => el.value == box_material)) {
            setFieldValue('box_material', '');
        }
        switch (drawerTypesArr?.length) {
            case 1:
                setFieldValue('drawer_type', drawerTypesArr[0].value);
                break;
            case undefined:
                setFieldValue('drawer_type', '');
                break;
            default:
                if (drawer_type && drawerTypesArr && !drawerTypesArr.some(el => el.value === drawer_type)) {
                    setFieldValue('drawer_type', '');
                }
        }
        switch (drawerColorsArr?.length) {
            case 1:
                setFieldValue('drawer_color', drawerColorsArr[0]);
                break;
            case undefined:
                setFieldValue('drawer_color', '');
                break;
            default:
                if (drawer_color && drawerColorsArr && !drawerColorsArr.some(el => el.value === drawer_color)) {
                    setFieldValue('drawer_color', '');
                }
        }
        if (category) {
            if (!hasGola && gola) setFieldValue('gola', '');
            if (door_frame_width && door_type !== 'Micro Shaker') setFieldValue('door_frame_width', '');
            if (!grainArr && door_grain) setFieldValue('door_grain', '');

            // Check Box Color
            if (!isCloset) {
                if (box_color) setFieldValue('box_color', '');
            }

            // Check Leather
            if (!isLeather) {
                if (leather) setFieldValue('leather', '');
                if (leather_note) setFieldValue('leather_note', '')
            }
            if (leather !== 'Other') setFieldValue('leather_note', '');
        }

        if (!isRoomNew && cart_items?.length) {
            const newCart = calculateCartPriceAfterMaterialsChange(cart_items, values);
            dispatch(updateCartAfterMaterialsChange(newCart))
        }
    }, [values]);

    const hasName = !!name;
    const showGola = isGolaShown(category, hasGola)
    const showDoorType = isDoorTypeShown(category, gola, showGola)
    const showDoorFinish = isDoorFinishShown(category, door_type, finishArr);
    const showDoorColor = isDoorColorShown(category, door_type, door_finish_material, finishArr, colorArr);
    const showDoorFrameWidth = isDoorFrameWidth(category,door_type, door_finish_material, frameArr);
    const showDoorGrain = isDoorGrain(category, door_finish_material, grainArr);
    const showBoxMaterial = isBoxMaterial(category,door_finish_material, door_color, box_material, boxMaterialArr, showDoorGrain, door_grain);
    const showBoxColor = isBoxColor(category,box_material, isLeather, boxMaterialArr)
    const showDrawerBrand = isDrawerBrand(box_material, box_color, isCloset);
    const showDrawerType = isDrawerType(showDrawerBrand, drawer_brand, drawerTypesArr);
    const showDrawerColor = isDrawerColor(showDrawerType, drawer_type, drawerColorsArr);
    const showLeatherType = isLeatherType(drawer_color, drawer_type, isLeather, leatherTypeArr);
    const showLeatherNote = isLeatherNote(showLeatherType, leather)

    return (
        <Form className={s.roomForm}>
            <TextInput type={"text"} label={roomNameText} name="name" autoFocus={true}/>
            {hasName &&
            <RoomMaterialsDataType data={categories} value={category ?? ''} name="category" label="Category"/>}
            {showGola && <RoomMaterialsDataType data={golaArr} value={gola ?? ''} name="gola" label="Gola"/>}
            {showDoorType &&
            <RoomMaterialsDataType data={doorTypeArr} value={door_type} name='door_type' label="Door Type"/>}
            {showDoorFinish &&
            <RoomMaterialsDataType data={finishArr} value={door_finish_material} name='door_finish_material'
                                   label="Door Finish Material. Price increase from left to right"/>}
            {showDoorFrameWidth &&
            <RoomMaterialsDataType data={frameArr} value={door_frame_width ?? ''} name='door_frame_width'
                                   label="Door Frame Width"/>}
            {showDoorColor &&
            <RoomMaterialsDataType data={colorArr} value={door_color ?? ''} name="door_color" label="Door Color"/>}
            {showDoorGrain && <RoomMaterialsDataType data={grainArr || []} value={door_grain ?? ''} name="door_grain"
                                                     label="Door Grain"/>}
            {showBoxMaterial &&
            <RoomMaterialsDataType data={boxMaterialArr} value={box_material} name="box_material"
                                   label="Box Material"/>}
            {showBoxColor &&
            <RoomMaterialsDataType data={boxMaterialColor} value={box_color} name="box_color" label="Box Color"/>}
            {showDrawerBrand &&
            <RoomMaterialsDataType data={drawerBrandArr} value={drawer_brand} name="drawer_brand" label="Drawer"
                                   small={true}/>}
            {showDrawerType &&
            <RoomMaterialsDataType data={drawerTypesArr} value={drawer_type} name="drawer_type" label="Drawer Type"
                                   small={true}/>}
            {showDrawerColor &&
            <RoomMaterialsDataType data={drawerColorsArr} value={drawer_color} name="drawer_color" label="Drawer Color"
                                   small={true}/>}
            {showLeatherType &&
            <RoomMaterialsDataType data={leatherTypeArr} value={leather ?? ''} name="leather" label="Leather"/>}
            {showLeatherNote && <TextInput type="text" value={leather_note} name="leather_note" label="Note"/>}
            {isValid && <button disabled={isSubmitting} className="button yellow" type="submit">{submitText}</button>}
        </Form>

    )
};

export default RoomMaterialsForm;