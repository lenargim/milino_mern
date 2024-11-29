import React, {FC, useEffect} from 'react';
import {Form, useFormikContext} from "formik";
import {
    getBoxMaterialArr,
    getDoorColorsArr,
    getDoorTypeArr,
    getGrainArr,
    isBoxColor,
    isBoxMaterial,
    isDoorColorShown,
    isDoorFinishShown,
    isDoorFrameWidth,
    isDoorGrain,
    isDoorTypeShown,
    isDrawerBrand, isGolaShown,
    isLeatherType,
    useAppDispatch,
    usePrevious
} from "../helpers/helpers";
import {materialsData, MaterialsType} from "../helpers/materialsTypes";
import s from "../Components/Profile/profile.module.sass";
import {TextInput} from "./Form";
import DataType from "../Components/OrderForm/DataType";
import {RoomType} from "../helpers/categoriesTypes";

import materials from "../api/materials.json";
import {MaybeEmpty, MaybeNull} from "../helpers/productTypes";
import {CartItemType} from "../api/apiFunctions";
import {checkCartData} from "../helpers/calculatePrice";

export type MaterialsFormType = {
    room_name: MaybeNull<string>,
    category: MaybeEmpty<RoomType>,
    gola: string,
    door_type: string,
    door_finish_material: string,
    door_frame_width: string,
    door_color: string,
    door_grain: string,
    box_material: string,
    box_color: string,
    drawer_brand: string,
    drawer_type: string,
    drawer_color: string,
    leather: string
}

export const materialsFormInitial: MaterialsFormType = {
    room_name: '',
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
    leather: ''
}

const {
    categories,
    gola: golaArr,
    doors,
    boxMaterial,
    drawers,
    leatherBoxMaterial: leatherBoxMaterialArr,
    leatherType: leatherTypeArr,
    grain,
}: MaterialsType = materials;

const MaterialsForm: FC<{ button: string, cart?: CartItemType[],has_room_field?: boolean }> = ({button,cart = [], has_room_field = false}) => {
    const dispatch = useAppDispatch()
    const {values, setFieldValue, isValid, isSubmitting, setValues} = useFormikContext<MaterialsFormType>();
    const {
        room_name,
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
        leather
    } = values;

    const isLeather = category === 'Leather Closet';
    const isStandardDoor = door_type === 'Standard Door';
    const hasGola = category === 'Kitchen' || category === 'Vanity';
    const doorTypeArr = getDoorTypeArr(doors,gola);
    const finishArr = doors.find(el => el.value === door_type)?.finish ?? [];
    const colorArr = getDoorColorsArr(door_finish_material, isStandardDoor, doors, door_type) ?? []
    // const isGrain = colorArr.find(el => el.value === door_color)?.isGrain;
    const boxMaterialArr: materialsData[] = getBoxMaterialArr(category, boxMaterial, leatherBoxMaterialArr)
    const drawerTypesArr = drawers.find(el => el.value === drawer_brand)?.types;
    const drawerColorsArr = drawerTypesArr && drawerTypesArr.find(el => el.value === drawer_type)?.colors
    const frameArr: materialsData[] = doors.find(el => el.value === door_type)?.frame ?? [];
    const grainArr = getGrainArr(grain, colorArr, door_color)

    const prevCategory = usePrevious(category);

    useEffect(() => {
        const isLeather = category === 'Leather Closet';
        if ( category && prevCategory && category !== prevCategory && ((isLeather && prevCategory !== 'Leather Closet') || (!isLeather && prevCategory === 'Leather Closet'))) {
            setValues({
                room_name,
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
                leather: ''
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
                setFieldValue('door_color', '');
                break;
            default:
                if (!showDoorColor || (door_color && colorArr && !colorArr.some(el => el.value === door_color))) {
                    setFieldValue('door_color', '');
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

        if (!hasGola && gola) setFieldValue('gola', '');
        if (category && !grainArr && door_grain) setFieldValue('door_grain', '');
        if (category && !isLeather && leather) setFieldValue('leather', '');
        if (category && !isLeather && box_color) setFieldValue('box_color', '');
        if (door_frame_width && door_type !== 'Micro Shaker') setFieldValue('door_frame_width', '');

        if (cart.length) {
            checkCartData(cart, values,dispatch);
        }
    }, [values]);

    const showCategory = !!(!has_room_field || room_name);
    const showGola = isGolaShown(category, hasGola)
    const showDoorType = isDoorTypeShown(category, gola, showGola)
    const showDoorFinish = isDoorFinishShown(category, door_type, finishArr);
    const showDoorColor = isDoorColorShown(door_type, door_finish_material, finishArr, colorArr);
    const showDoorFrameWidth = isDoorFrameWidth(door_type, door_finish_material, frameArr);
    const showDoorGrain = isDoorGrain(door_finish_material, grainArr);
    const showBoxMaterial = isBoxMaterial(door_finish_material, door_color, box_material,boxMaterialArr,showDoorGrain, door_grain);
    const showBoxColor = isBoxColor(box_material,isLeather,boxMaterial)
    const showDrawerBrand = isDrawerBrand(box_material, box_color, isLeather);
    const showLeatherType = isLeatherType(drawer_color, isLeather, leatherTypeArr);

    return (
        <Form className={s.roomForm}>
            {has_room_field && <TextInput type={"text"} label={"Process Order Name"} name="room_name" autoFocus={true}/>}
            {showCategory && <DataType data={categories} value={category ?? ''} name="category" label="Category"/>}
            {showGola && <DataType data={golaArr} value={gola ?? ''} name="gola" label="Gola"/>}
            {showDoorType && <DataType data={doorTypeArr} value={door_type} name='door_type' label="Door Type"/>}
            {showDoorFinish &&
              <DataType data={finishArr} value={door_finish_material} name='door_finish_material'
                        label="Door Finish Material"/>}
            {showDoorFrameWidth &&
              <DataType data={frameArr} value={door_frame_width ?? ''} name='door_frame_width'
                        label="Door Frame Width"/>}
            {showDoorColor && <DataType data={colorArr} value={door_color ?? ''} name="door_color" label="Door Color"/>}
            {showDoorGrain && <DataType data={grainArr||[]} value={door_grain ?? ''} name="door_grain" label="Door Grain"/>}
            {showBoxMaterial &&
              <DataType data={boxMaterialArr} value={box_material} name="box_material" label="Box Material"/>}
            {showBoxColor &&
              <DataType data={boxMaterial} value={box_color} name="box_color" label="Box Color"/>}
            {showDrawerBrand && <DataType data={drawers} value={drawer_brand} name="drawer_brand" label="Drawer" small={true}/>}
            {drawer_brand && drawerTypesArr &&
              <DataType data={drawerTypesArr} value={drawer_type} name="drawer_type" label="Drawer Type" small={true}/>}
            {drawer_type && drawerColorsArr &&
              <DataType data={drawerColorsArr} value={drawer_color} name="drawer_color" label="Drawer Color" small={true}/>}
            {showLeatherType &&
              <DataType data={leatherTypeArr} value={leather ?? ''} name="leather" label="Leather"/>}
            {isValid && <button disabled={isSubmitting} className="button yellow" type="submit">{button}</button>}
        </Form>

    )
};

export default MaterialsForm;