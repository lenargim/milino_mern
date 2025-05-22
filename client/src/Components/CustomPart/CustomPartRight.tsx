import React, {FC} from 'react';
import {CustomPartType, materialsCustomPart, MaybeNull} from "../../helpers/productTypes";
import {MaterialsFormType} from "../Room/RoomMaterialsForm";
import CustomPartCabinet from "./CustomPartCabinet";
import CustomPartLEDForm from "./CustomPartLEDForm";
import CustomPartStandardDoorForm from "./CustomPartStandardDoorForm";
import CustomPartStandardPanel from "./CustomPartStandardPanel";
import CustomPartPlasticToe from "./CustomPartPlasticToe";
import DoorAccessoriesForm from "./CustomPartDoorAccessoiresForm";

type CustomPartRight = {
    customPartProduct: CustomPartType,
    initialMaterialData: MaybeNull<materialsCustomPart>,
    materials: MaterialsFormType
}

const CustomPartRight: FC<CustomPartRight> = ({
                                                  customPartProduct,
                                                  initialMaterialData,
                                                  materials
                                              }) => {
    const isStandardCabinet = materials.door_type === 'Standard White Shaker';
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
        case "standard-door":
        case "standard-glass-door":
            return <CustomPartStandardDoorForm customPart={customPartProduct}/>
        case "standard-panel":
            return <CustomPartStandardPanel product={customPartProduct} materials={materials}/>
        case "plastic_toe":
            return <CustomPartPlasticToe product={customPartProduct} />
    }
};

export default CustomPartRight;