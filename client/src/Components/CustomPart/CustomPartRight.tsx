import React, {FC} from 'react';
import {CustomPartType, materialsCustomPart, MaybeNull} from "../../helpers/productTypes";
import {MaterialsFormType} from "../../common/MaterialsForm";
import CustomPartCabinet from "./CustomPartCabinet";
import LEDForm from "./LEDForm";
import DoorAccessoiresForm from "./DoorAccessoiresForm";
import StandardDoorForm from "./StandardDoorForm";
import StandardPanel from "./StandardPanel";
import PlasticToe from "./PlasticToe";

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
            return <LEDForm/>
        case "door-accessories":
            return <DoorAccessoiresForm/>
        case "standard-door":
        case "standard-glass-door":
            return <StandardDoorForm customPart={customPartProduct}/>
        case "standard-panel":
            return <StandardPanel product={customPartProduct} materials={materials}/>
        case "plastic_toe":
            return <PlasticToe product={customPartProduct} />
    }
};

export default CustomPartRight;