import React, {FC, useEffect} from 'react';
import {Form, useFormikContext} from "formik";
import {
    filterGolaTypeArrByCategory,
    findHasGolaTypeByCategory,
    getBoxMaterialArr, getBoxMaterialColorsArr,
    getDoorColorsArr, getDoorFinishArr,
    getDoorTypeArr, getDrawerBrandArr, getDrawerColorArr, getDrawerTypeArr,
    getGrainArr,
    isBoxColor,
    isBoxMaterial,
    isDoorColorShown,
    isDoorFinishShown,
    isDoorFrameWidth,
    isDoorGrain,
    isDoorTypeShown,
    isDrawerBrand, isDrawerColor, isDrawerType, isGolaShown, isGolaTypeShown, isGrooveShown, isLeatherNote,
    isLeatherType,
    useAppDispatch, useAppSelector,
    usePrevious
} from "../../helpers/helpers";
import s from "./room.module.sass";
import {TextInput} from "../../common/Form";
import RoomMaterialsDataType from "./RoomMaterialsDataType";
import materialsAPI from "../../api/materials.json";
import {MaybeEmpty, MaybeUndefined} from "../../helpers/productTypes";
import {calculateCartPriceAfterMaterialsChange} from "../../helpers/calculatePrice";
import {
    colorType,
    finishType,
    materialsData,
    MaterialsType,
    RoomCategoriesType,
    RoomMaterialsFormType
} from "../../helpers/roomTypes";
import {RoomsState, updateCartAfterMaterialsChange} from "../../store/reducers/roomSlice";

const {
    categories,
    golaType,
    gola: golaArr,
    doors,
    boxMaterial,
    drawers,
    leatherType: leatherTypeArr,
    grain,
    groove: grooveArr
}: MaterialsType = materialsAPI;

export const materialsFormInitial: RoomMaterialsFormType = {
    name: '',
    category: '',
    category_gola_type: '',
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
    leather_note: '',
    groove: ''
}

function shouldClearFormData(category: MaybeEmpty<RoomCategoriesType>, prevCategory: MaybeUndefined<MaybeEmpty<RoomCategoriesType>>): boolean {
    if (!category || !prevCategory) return false;
    return category !== prevCategory
}

const RoomMaterialsForm: FC<{ isRoomNew: boolean }> = ({isRoomNew}) => {
    const dispatch = useAppDispatch()
    const {values, setFieldValue, isValid, isSubmitting, setValues, errors} = useFormikContext<RoomMaterialsFormType>();
    const {
        name,
        category_gola_type,
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
        leather_note,
        groove
    } = values as RoomMaterialsFormType;
    const submitText = isRoomNew ? 'Create Room' : 'Edit Room';
    const roomNameText = isRoomNew ? 'New Room Name' : 'Room Name';
    const leatherBoxMaterialArr: MaybeUndefined<finishType[]> = materialsAPI.doors.find(el => el.value === 'Slab')?.finish
    const isLeather = category === 'Leather Closet';
    const isRTACloset = category === 'RTA Closet';
    const isCloset = isLeather || isRTACloset;
    const hasGolaType = findHasGolaTypeByCategory(category);
    const golaTypeArr = filterGolaTypeArrByCategory(category, golaType);
    const doorTypeArr = getDoorTypeArr(doors, gola, isLeather);
    const finishArr = getDoorFinishArr(doors, door_type);
    const colorArr = getDoorColorsArr(door_finish_material, door_type, finishArr);
    const boxMaterialArr: finishType[] = getBoxMaterialArr(isCloset, boxMaterial, leatherBoxMaterialArr || [])
    const boxMaterialColor: colorType[] = getBoxMaterialColorsArr(isLeather, isRTACloset, box_material, boxMaterialArr, boxMaterial);
    const drawerBrandArr = getDrawerBrandArr(drawers);
    const drawerTypesArr = getDrawerTypeArr(drawers, drawer_brand);
    const drawerColorsArr = getDrawerColorArr(drawers, drawer_brand, drawer_type)
    const frameArr: materialsData[] = doors.find(el => el.value === door_type)?.frame ?? [];
    const grainArr = getGrainArr(grain, colorArr, door_color)
    const prevCategory = usePrevious(category);
    const {cart_items} = useAppSelector<RoomsState>(state => state.room)

    useEffect(() => {
        if (!isRoomNew && hasGolaType && !category_gola_type) {
            setFieldValue('category_gola_type', gola ? `Gola ${category}` : `Regular ${category}`)
        }
    }, [])

    useEffect(() => {
        if (shouldClearFormData(category, prevCategory)) {
            setValues({
                ...materialsFormInitial,
                name,
                category,
            }, false)
        }
    }, [category])
    // Check is values are in array
    useEffect(() => {
        if (category) {
            //Gola
            if (!hasGolaType) {
                category_gola_type && setFieldValue('category_gola_type', '');
                gola && setFieldValue('gola', '');
            } else {
                if (category_gola_type && !isGolaShown(category_gola_type)) setFieldValue('gola', '');
            }

            //Groove
            if (groove && door_type !== 'Wood ribbed doors') setFieldValue('groove', '');

            // Door finish material
            if (!finishArr.length) setFieldValue('door_finish_material', '');
            if (finishArr.length === 1) setFieldValue('door_finish_material', finishArr[0].value);
            if (door_finish_material && !finishArr.some(el => el.value === door_finish_material)) setFieldValue('door_finish_material', '');

            //Door color
            if (!colorArr.length) setFieldValue('door_color', '');
            if (colorArr.length === 1) setFieldValue('door_color', colorArr[0].value);
            if (!showDoorColor || (door_color && !colorArr.some(el => el.value === door_color))) setFieldValue('door_color', '');

            //Box color
            if (!boxMaterialColor.length) setFieldValue('box_color', '');
            if (boxMaterialColor.length === 1) setFieldValue('box_color', boxMaterialColor[0].value);
            if (!showBoxColor || (box_color && !boxMaterialColor.some(el => el.value === box_color))) setFieldValue('box_color', '');

            //Box material
            if (!boxMaterialArr.length) setFieldValue('box_material', '');
            if (category && box_material && !boxMaterialArr.some(el => el.value == box_material)) setFieldValue('box_material', '');


            //Drawer type
            if (!drawerTypesArr.length) setFieldValue('drawer_type', '');
            if (drawerTypesArr.length === 1) setFieldValue('drawer_type', drawerTypesArr[0].value);
            if (drawer_type && !drawerTypesArr.some(el => el.value === drawer_type)) setFieldValue('drawer_type', '');

            //Drawer color
            if (!drawerColorsArr.length) setFieldValue('drawer_color', '');
            if (drawerColorsArr.length === 1) setFieldValue('drawer_color', drawerColorsArr[0]);
            if (drawer_color && !drawerColorsArr.some(el => el.value === drawer_color)) setFieldValue('drawer_color', '');

            if (door_frame_width && door_type !== 'Micro Shaker') setFieldValue('door_frame_width', '');
            if (!grainArr && door_grain) setFieldValue('door_grain', '');

            // Check Box Color
            if (!isCloset && box_color) setFieldValue('box_color', '');

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
    const showGolaType = isGolaTypeShown(category, hasGolaType);
    const showGola = isGolaShown(category_gola_type)
    const showDoorType = isDoorTypeShown(values, showGola)
    const showGroove = isGrooveShown(door_type)
    const showDoorFinish = isDoorFinishShown(values, finishArr, showGroove);
    const showDoorFrameWidth = isDoorFrameWidth(values, frameArr);
    const showDoorColor = isDoorColorShown(values, colorArr, showDoorFrameWidth);
    const showDoorGrain = isDoorGrain(values, grainArr);
    const showBoxMaterial = isBoxMaterial(values, boxMaterialArr,showDoorFinish,showDoorColor,showDoorGrain);
    const showBoxColor = isBoxColor(category, box_material, isLeather, boxMaterialArr)
    const showDrawerBrand = isDrawerBrand(box_material, box_color, isCloset);
    const showDrawerType = isDrawerType(showDrawerBrand, drawer_brand, drawerTypesArr);
    const showDrawerColor = isDrawerColor(showDrawerType, drawer_type, drawerColorsArr);
    const showLeatherType = isLeatherType(drawer_color, drawer_type, isLeather, leatherTypeArr);
    const showLeatherNote = isLeatherNote(showLeatherType, leather)
    return (
        <Form className={s.roomForm}>
            <TextInput type={"text"} label={roomNameText} name="name" autoFocus={true}/>
            {hasName &&
            <RoomMaterialsDataType data={categories} value={category} name="category" label="Category"/>}
            {showGolaType &&
            <RoomMaterialsDataType data={golaTypeArr} value={category_gola_type} name="category_gola_type"
                                   label={`${category} Type`}/>}
            {showGola && <RoomMaterialsDataType data={golaArr} value={gola} name="gola" label={`Gola Type`}/>}
            {showDoorType &&
            <RoomMaterialsDataType data={doorTypeArr} value={door_type} name='door_type' label="Door Type"/>}
            {showGroove && <RoomMaterialsDataType data={grooveArr} value={groove} name='groove' label="Grooves style"/>}

            {showDoorFinish &&
            <RoomMaterialsDataType data={finishArr} value={door_finish_material} name='door_finish_material'
                                   label="Door Finish Material. Price increase from left to right"/>}
            {showDoorFrameWidth &&
            <RoomMaterialsDataType data={frameArr} value={door_frame_width ?? ''} name='door_frame_width'
                                   label="Door Frame Width"/>}
            {showDoorColor && <RoomMaterialsDataType data={colorArr} value={door_color} name="door_color" label="Door Color"/>}
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