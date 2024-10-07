import React, {FC, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {RoomSchema} from "./RoomSchems";
import {createRoom} from "../../api/apiFunctions";
import {addRoom} from "../../store/reducers/roomSlice";
import {Form, Formik, useFormikContext} from "formik";
import s from "./profile.module.sass";
import {TextInput} from "../../common/Form";
import {useDispatch} from "react-redux";
import {colorType, finishType, materialsData, MaterialsType} from "../../helpers/materialsTypes";
import {
    getBoxMaterialArr,
    getDoorColorsArr, isBoxMaterial,
    isDoorColorShown,
    isDoorFinishShown, isDoorFrameWidth, isDoorGrain,
    isDoorTypeShown, isLeatherType
} from "../../helpers/helpers";
import materials from "../../api/materials.json";
import {RoomType} from "../../helpers/categoriesTypes";
import DataType from "../OrderForm/DataType";

export type MaybeEmpty<T> = T | '';
export type MaybeUndefined<T> = T | undefined;
export type MaybeNull<T> = T | null;

export type RoomInitialType = {
    room_name: string,
    category: MaybeEmpty<RoomType>,
    door_type: string,
    door_finish_material: string,
    door_frame_width?: string,
    door_color?: string,
    door_grain?: string,
    box_material: string,
    drawer: string,
    drawer_type: string,
    drawer_color: string,
    leather?: string
}

export const initialValuesRoom: RoomInitialType = {
    room_name: '',
    category: '',
    door_type: '',
    door_finish_material: '',
    door_frame_width: '',
    door_color: '',
    door_grain: '',
    box_material: '',
    drawer: '',
    drawer_type: '',
    drawer_color: '',
    leather: ''
}

const {
    categories,
    doors,
    boxMaterial,
    drawers,
    leatherBoxMaterial: leatherBoxMaterialArr,
    leatherType: leatherTypeArr,
    grain
}: MaterialsType = materials;

type RoomFormType = {
    submitLabel?: string
}

const RoomForm: FC<RoomFormType> = ({submitLabel = 'Create room'}) => {
    const { values, setFieldValue, isValid, isSubmitting } = useFormikContext<RoomInitialType>();
    const {
        room_name,
        category,
        door_type,
        door_finish_material,
        door_frame_width,
        door_color,
        door_grain,
        box_material,
        drawer,
        drawer_type,
        drawer_color,
        leather
    } = values;

    const isLeather = category === 'Leather Closet';
    const finishArr: finishType[] = doors.find(el => el.value === door_type)?.finish ?? [];
    const colorArr: colorType[] = getDoorColorsArr(door_finish_material, category, doors, door_type) ?? []
    const isGrain = colorArr && colorArr.find(el => el.value === door_color)?.isGrain;
    const boxMaterialArr: materialsData[] = getBoxMaterialArr(isLeather, boxMaterial, leatherBoxMaterialArr)
    const drawerTypesArr = drawers.find(el => el.value === drawer)?.types;
    const drawerColorsArr = drawerTypesArr && drawerTypesArr.find(el => el.value === drawer_type)?.colors
    const frameArr: materialsData[] = doors.find(el => el.value === door_type)?.frame ?? [];

    const showDoorType = isDoorTypeShown(category)
    const showDoorFinish = isDoorFinishShown(category, door_type, finishArr);
    const showDoorColor = isDoorColorShown(category, door_finish_material, finishArr, colorArr);
    const showDoorFrameWidth = isDoorFrameWidth(door_type, door_finish_material, frameArr);
    const showDoorGrain = isDoorGrain(door_finish_material, colorArr, door_color);
    const showBoxMaterial = isBoxMaterial(door_finish_material, door_color, box_material);
    const showLeatherType = isLeatherType(drawer_color, isLeather, leatherTypeArr);

    // Check is values are in array
    useEffect(() => {
        switch (category) {
            case "Standard Door":
                if (door_type) setFieldValue('door_type', '');
                if (door_finish_material) setFieldValue('door_finish_material', '');
                if (door_grain) setFieldValue('door_grain', '');
                break
        }
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

        if (box_material && !boxMaterialArr.some(el => el.value == box_material)) {
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

        if (isGrain && !door_grain) setFieldValue('door_grain', 'Gorizontal');
        if (!isLeather && leather) setFieldValue('leather', '');
        if (door_type !== 'Micro Shaker' && door_frame_width) setFieldValue('door_frame_width', '');

        // if (cartLength) checkCartData(cart, values, dispatch);
    }, [values]);

    return (
        <Form className={s.roomForm}>
            <TextInput type={"text"} label={"Room Name"} name="room_name" autoFocus={true}  />
            {room_name && <DataType data={categories} value={category ?? ''} name="category" label="Category"/>}
            {showDoorType && <DataType data={doors} value={door_type} name='door_type' label="Door Type"/>}
            {showDoorFinish &&
              <DataType data={finishArr} value={door_finish_material} name='door_finish_material' label="Door Finish Material"/>}
            {showDoorFrameWidth &&
              <DataType data={frameArr} value={door_frame_width ?? ''} name='door_frame_width' label="Door Frame Width"/>}
            {showDoorColor && <DataType data={colorArr} value={door_color ?? ''} name="door_color" label="Door Color"/>}
            {showDoorGrain && <DataType data={grain} value={door_grain ?? ''} name="door_grain" label="Door Grain"/>}
            {showBoxMaterial && <DataType data={boxMaterialArr} value={box_material} name="box_material" label="Box Material"/>}
            {box_material && <DataType data={drawers} value={drawer} name="drawer" label="Drawer"/>}
            {drawer && drawerTypesArr &&
              <DataType data={drawerTypesArr} value={drawer_type} name="drawer_type" label="Drawer Type"/>}
            {drawer_type && drawerColorsArr &&
              <DataType data={drawerColorsArr} value={drawer_color} name="drawer_color" label="Drawer Color"/>}
            {showLeatherType &&
              <DataType data={leatherTypeArr} value={leather ?? ''} name="leather" label="Leather"/>}

            {isValid && <button disabled={isSubmitting} className="button yellow" type="submit">{submitLabel}</button>}
        </Form>
    )
};

export default RoomForm;