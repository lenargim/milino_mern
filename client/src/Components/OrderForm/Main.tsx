import React, {FC, useEffect} from 'react';
import s from "./OrderForm.module.sass";
import materials from "./../../api/materials.json"
import {OrderFormType} from "../../helpers/types";
import {colorType, finishType, materialsData, MaterialsType} from "../../helpers/materialsTypes";
import {
    getBoxMaterialArr,
    getDoorColorsArr, isBoxMaterial,
    isDoorColorShown,
    isDoorFinishShown,
    isDoorFrameWidth, isDoorGrain,
    isDoorTypeShown, isLeatherType, useAppDispatch
} from "../../helpers/helpers";
import Header from "../../common/Header/Header";
import {useFormikContext} from "formik";
import DataType from './DataType';
import {CartItemType} from "../../store/reducers/generalSlice";
import {checkCartData} from "../../helpers/calculatePrice";

type MainType = {
    values: OrderFormType,
    isSubmitting: boolean,
    isValid: boolean,
    setFieldValue: (field: string, value: any) => void,
    cart: CartItemType[],
    cartLength: number
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

const Main: FC<MainType> = ({values, isSubmitting, isValid, setFieldValue,cart, cartLength}) => {
    const dispatch = useAppDispatch()
    const {resetForm} = useFormikContext<OrderFormType>();
    const {
        ['Category']: category,
        ['Door Type']: doorType,
        ['Door Finish Material']: doorFinishMaterial,
        ['Door Frame Width']: doorFrameWidth,
        ['Door Color']: doorColor,
        ['Door Grain']: doorGrain,
        ["Box Material"]: boxMaterialVal,
        ["Drawer"]: drawerVal,
        ["Drawer Type"]: drawerTypeVal,
        ['Drawer Color']: drawerColor,
        ['Leather Type']: leatherType
    } = values;

    const isLeather = category === 'Leather Closet';
    const finishArr: finishType[] = doors.find(el => el.value === doorType)?.finish ?? [];
    const colorArr: colorType[] = getDoorColorsArr(doorFinishMaterial, category, doors, doorType) ?? []
    const isGrain = colorArr && colorArr.find(el => el.value === doorColor)?.isGrain;
    const boxMaterialArr:materialsData[] = getBoxMaterialArr(isLeather,boxMaterial, leatherBoxMaterialArr)
    const drawerTypesArr = drawers.find(el => el.value === drawerVal)?.types;
    const drawerColorsArr = drawerTypesArr && drawerTypesArr.find(el => el.value === drawerTypeVal)?.colors
    const frameArr: materialsData[] = doors.find(el => el.value === doorType)?.frame ?? [];

    const showDoorType = isDoorTypeShown(category)
    const showDoorFinish = isDoorFinishShown(category, doorType, finishArr);
    const showDoorColor = isDoorColorShown(category, doorFinishMaterial, finishArr, colorArr);
    const showDoorFrameWidth = isDoorFrameWidth(doorType, doorFinishMaterial, frameArr);
    const showDoorGrain = isDoorGrain(doorFinishMaterial, colorArr, doorColor);
    const showBoxMaterial = isBoxMaterial(doorFinishMaterial, doorColor, boxMaterialVal);
    const showLeatherType = isLeatherType(drawerColor, isLeather, leatherTypeArr);

    // Check is values are in array
    useEffect(() => {
        switch (category) {
            case "Standard Door":
                if (doorType) setFieldValue('Door Type', '');
                if (doorFinishMaterial) setFieldValue('Door Finish Material', '');
                if (doorGrain) setFieldValue('Door Grain', '');
                break
        }
        switch (finishArr?.length) {
            case 1:
                setFieldValue('Door Finish Material', finishArr[0].value);
                break;
            case undefined:
                setFieldValue('Door Finish Material', '');
                break;
            default:
                if (doorFinishMaterial && finishArr && !finishArr.some(el => el.value === doorFinishMaterial)) {
                    setFieldValue('Door Finish Material', '');
                }
        }
        switch (colorArr?.length) {
            case 1:
                setFieldValue('Door Color', colorArr[0].value);
                break;
            case undefined:
                setFieldValue('Door Color', '');
                break;
            default:
                if (!showDoorColor || (doorColor && colorArr && !colorArr.some(el => el.value === doorColor))) {
                    setFieldValue('Door Color', '');
                }
        }

        if (boxMaterialVal && !boxMaterialArr.some(el => el.value == boxMaterialVal)) {
            setFieldValue('Box Material', '');
        }

        switch (drawerTypesArr?.length) {
            case 1:
                setFieldValue('Drawer Type', drawerTypesArr[0].value);
                break;
            case undefined:
                setFieldValue('Drawer Type', '');
                break;
            default:
                if (drawerTypeVal && drawerTypesArr && !drawerTypesArr.some(el => el.value === drawerTypeVal)) {
                    setFieldValue('Drawer Type', '');
                }
        }
        switch (drawerColorsArr?.length) {
            case 1:
                setFieldValue('Drawer Color', drawerColorsArr[0]);
                break;
            case undefined:
                setFieldValue('Drawer Color', '');
                break;
            default:
                if (drawerColor && drawerColorsArr && !drawerColorsArr.some(el => el.value === drawerColor)) {
                    setFieldValue('Drawer Color', '');
                }
        }

        if (isGrain && !doorGrain) setFieldValue('Door Grain', 'Gorizontal');
        if (!isLeather && leatherType) setFieldValue('Leather Type', '');
        if (doorType !== 'Micro Shaker' && doorFrameWidth) setFieldValue('Door Frame Width', '');

        if (cartLength) checkCartData(cart, values, dispatch);
    }, [values]);

    return (
        <main id="main" className="main">
            <div className="container">
                <Header resetForm={resetForm}/>
                <h1 className="h1" id="anchor">ORDER FORM</h1>
                <div className={s.orderList}>
                    <DataType data={categories} value={category ?? ''} name="Category"/>
                    {showDoorType && <DataType data={doors} value={doorType} name="Door Type"/>}
                    {showDoorFinish &&
                      <DataType data={finishArr} value={doorFinishMaterial} name="Door Finish Material"/>}
                    {showDoorFrameWidth &&
                      <DataType data={frameArr} value={doorFrameWidth ?? ''} name={'Door Frame Width'}/>}
                    {showDoorColor && <DataType data={colorArr} value={doorColor ?? ''} name="Door Color"/>}
                    {showDoorGrain && <DataType data={grain} value={doorGrain ?? ''} name="Door Grain"/>}
                    {showBoxMaterial && <DataType data={boxMaterialArr} name="Box Material" value={boxMaterialVal}/>}
                    {boxMaterialVal && <DataType data={drawers} name="Drawer" value={drawerVal}/>}
                    {drawerVal && drawerTypesArr &&
                      <DataType data={drawerTypesArr} name="Drawer Type" value={drawerTypeVal}/>}
                    {drawerTypeVal && drawerColorsArr &&
                      <DataType data={drawerColorsArr} name="Drawer Color" value={drawerColor}/>}
                    {showLeatherType &&
                      <DataType data={leatherTypeArr} value={leatherType ?? ''} name={'Leather Type'}/>}
                </div>
                {isValid && <button type="submit" className={['button yellow', s.submit].join(' ')}
                                    disabled={isSubmitting}>Submit</button>}
            </div>
        </main>
    );
};

export default Main;