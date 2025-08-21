import React, {FC} from 'react';
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
    const isDepthIsConst = typeof depthApi === 'number'
    switch (type) {
        case "custom":
        case "pvc":
        case "backing":
        case "glass-door":
        case "glass-shelf":
            return <CustomPartCabinet product={customPartProduct}
                                      isDepthIsConst={isDepthIsConst}
                                      materials={materials}
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
    }
};

export default CustomPartRight;