import React, {FC, useEffect} from 'react';
import {CustomPartType} from "../../helpers/productTypes";
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
import {addToCartCustomPartAPI, filterCustomPartsMaterialsArray} from "../../helpers/helpers";
import {getCustomPartPrice} from "../../helpers/calculatePrice";
import CustomPartRibbed from "./CustomPartRibbed";
import CustomPartDrawerInserts from "./CustomPartDrawerInserts";
import CustomPartPanel from "./CustomPartPanel";
import CustomPartPVC from "./CustomPartPVC";
import CustomPartThickFloatingShelf from "./CustomPartFloatingShelf";
import CustomPartRODrawer from "./CustomPartRODrawer";
import CustomPartGlassShelfForm from "./CustomPartGlassShelfForm";
import CustomPartGlassDoorForm from "./CustomPartGlassDoorForm";
import CustomPartQtyOnly from "./CustomPartQtyOnly";


type CustomPartRight = {
    customPartProduct: CustomPartType,
    materials: RoomMaterialsFormType
}

const CustomPartRight: FC<CustomPartRight> = ({
                                                  customPartProduct,
                                                  materials
                                              }) => {

    const {door_color, door_type} = materials
    const isStandardCabinet = door_type === 'Standard Size Shaker';
    const {depth, type} = customPartProduct;
    // const depthApi = initialMaterialData?.depth ?? depth;
    const {values, setFieldValue} = useFormikContext<CustomPartFormType>();
    const {price} = values;
    const {materials_array, id} = customPartProduct;
    const filtered_materials_array = filterCustomPartsMaterialsArray(materials_array, id, isStandardCabinet);

    useEffect(() => {
        const APIValues = addToCartCustomPartAPI(values, customPartProduct, '', undefined)
        const newPrice = getCustomPartPrice(customPartProduct, materials, APIValues);
        if (price !== newPrice) {
            setFieldValue('price', newPrice)
        }
    }, [{...values}])

    switch (type) {
        case "custom":
            return <CustomPartCabinet product={customPartProduct} filtered_materials_array={filtered_materials_array}/>
        case "glass-door":
            return <CustomPartGlassDoorForm product={customPartProduct} filtered_materials_array={filtered_materials_array}/>
        case "glass-shelf":
            return <CustomPartGlassShelfForm/>
        case "panel":
        case "backing":
            return <CustomPartPanel product={customPartProduct} filtered_materials_array={filtered_materials_array}/>
        case "pvc":
            return <CustomPartPVC filtered_materials_array={filtered_materials_array}/>
        case "led-accessories":
            return <CustomPartLEDForm/>
        case "door-accessories":
            return <DoorAccessoriesForm/>
        case "standard-doors":
        case "standard-glass-doors":
            return <CustomPartStandardDoorForm customPart={customPartProduct} color={door_color}/>
        case "standard-panel":
            return <CustomPartStandardPanel product={customPartProduct}/>
        case "plastic_toe":
            return <CustomPartPlasticToe product={customPartProduct}/>
        case "rta-closets":
            return <CustomPartRTACloset materials={materials}/>
        case "custom-doors":
            return <CustomPartCustomDoors/>;
        case "ribbed":
            return <CustomPartRibbed filtered_materials_array={filtered_materials_array}/>
        case "thick_floating_shelf":
            return <CustomPartThickFloatingShelf product={customPartProduct} filtered_materials_array={filtered_materials_array}/>
        case "drawer-inserts":
            return <CustomPartDrawerInserts/>
        case "ro_drawer":
            return <CustomPartRODrawer product={customPartProduct}/>
        case "qty_only":
            return <CustomPartQtyOnly product={customPartProduct}/>
        default:
            return null;
    }
};

export default CustomPartRight;