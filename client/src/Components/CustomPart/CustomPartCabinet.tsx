import React, {FC} from 'react';
import {customPartDataType} from "../../helpers/productTypes";
import CustomPartForm from "./CustomPartForm";
import PVCForm from "./PVCForm";
import {OrderFormType} from "../../helpers/types";
import LEDForm from "./LEDForm";
import DoorAccessoiresForm from "./DoorAccessoiresForm";
import GlassDoorForm from "./GlassDoorForm";
import GlassShelfForm from "./GlassShelfForm";
import StandardDoorForm from "./StandardDoorForm";
import BackingForm from "./BackingForm";

type CustomPartCabinetType = {
    customPart: customPartDataType,
    materials: OrderFormType
}

const CustomPartCabinet: FC<CustomPartCabinetType> = ({customPart, materials}) => {
    switch (customPart.type) {
        case "custom":
            return <CustomPartForm customPart={customPart} materials={materials}/>
        case "backing":
            return <BackingForm customPart={customPart} />
        case "pvc":
            return <PVCForm customPart={customPart} materials={materials}/>
        case "led-accessories":
            return <LEDForm customPart={customPart}/>
        case "door-accessories":
            return <DoorAccessoiresForm customPart={customPart}/>
        case "glass-door":
            return <GlassDoorForm customPart={customPart} materials={materials}/>
        case "glass-shelf":
            return <GlassShelfForm customPart={customPart} materials={materials}/>
        case "standard-door":
        case "standard-glass-door":
            return <StandardDoorForm customPart={customPart}/>
        default:
            return <></>
    }
};

export default CustomPartCabinet;