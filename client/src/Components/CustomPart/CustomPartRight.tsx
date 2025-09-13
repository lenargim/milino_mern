import React, {FC, useEffect} from 'react';
import {CustomPartTableDataType, CustomPartType} from "../../helpers/productTypes";
import CustomPartCabinet from "./CustomPartCabinet";
import CustomPartLEDForm from "./CustomPartLEDForm";
import CustomPartStandardDoorForm from "./CustomPartStandardDoorForm";
import CustomPartStandardPanel from "./CustomPartStandardPanel";
import CustomPartPlasticToe from "./CustomPartPlasticToe";
import DoorAccessoriesForm from "./CustomPartDoorAccessoiresForm";
import {RoomMaterialsFormType} from "../../helpers/roomTypes";
import CustomPartRTACloset from "./CustomPartRTACloset";
import CustomPartCustomDoors from "./CustomPartCustomDoors";
import {useFormikContext} from "formik";
import {CustomPartFormType} from "./CustomPart";
import {addToCartCustomPart} from "../../helpers/helpers";
import {getCustomPartPrice} from "../../helpers/calculatePrice";
import CustomPartRibbed from "./CustomPartRibbed";
import CustomPartFloatingShelf from "./CustomPartFloatingShelf";
import CustomPartDrawerInserts from "./CustomPartDrawerInserts";

type CustomPartRight = {
    customPartProduct: CustomPartType,
    customPartData: CustomPartTableDataType,
    materials: RoomMaterialsFormType
}

const CustomPartRight: FC<CustomPartRight> = ({
                                                  customPartProduct,
                                                  customPartData,
                                                  materials
                                              }) => {
    const {initialMaterialData} = customPartData;
    const {door_color, door_type} = materials
    const isStandardCabinet = door_type === 'Standard Size White Shaker';
    const {depth, type} = customPartProduct;
    const depthApi = initialMaterialData?.depth ?? depth;
    const isDepthIsConst = typeof depthApi === 'number';
    const {values, setFieldValue} = useFormikContext<CustomPartFormType>();
    const {price} = values

    useEffect(() => {
        const APIValues = addToCartCustomPart(values, customPartProduct, '', undefined)
        const newPrice = getCustomPartPrice(customPartProduct, materials, APIValues);
        if (price !== newPrice) {
            setFieldValue('price', newPrice)
        }
    }, [{...values}])

    switch (type) {
        case "custom":
        case "pvc":
        case "backing":
        case "glass-door":
        case "glass-shelf":
            return <CustomPartCabinet product={customPartProduct}
                                      isDepthIsConst={isDepthIsConst}
                                      isStandardCabinet={isStandardCabinet}
            />
        case "led-accessories":
            return <CustomPartLEDForm/>
        case "door-accessories":
            return <DoorAccessoriesForm/>
        case "standard-doors":
        case "standard-glass-doors":
            return <CustomPartStandardDoorForm customPart={customPartProduct} color={door_color}/>
        case "standard-panel":
            return <CustomPartStandardPanel product={customPartProduct} materials={materials}/>
        case "plastic_toe":
            return <CustomPartPlasticToe product={customPartProduct}/>
        case "rta-closets":
            return <CustomPartRTACloset materials={materials}/>
        case "custom-doors":
            return <CustomPartCustomDoors product={customPartProduct} />;
        case "ribbed":
            return <CustomPartRibbed product={customPartProduct} isStandardCabinet={isStandardCabinet} />
        case "floating-shelf":
            return <CustomPartFloatingShelf product={customPartProduct} isStandardCabinet={isStandardCabinet} />
        case "drawer-inserts":
            return <CustomPartDrawerInserts product={customPartProduct} isStandardCabinet={isStandardCabinet} />
        default:
            return null;
    }
};

export default CustomPartRight;