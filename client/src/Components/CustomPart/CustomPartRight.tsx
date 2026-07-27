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
import {addToCartCustomPartAPI} from "../../helpers/helpers";
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
    const isStandardCabinet = door_type === 'Standard Size Shaker';
    const {depth, type} = customPartProduct;
    const depthApi = initialMaterialData?.depth ?? depth;
    const isDepthIsConst = typeof depthApi === 'number';
    const {values, setFieldValue} = useFormikContext<CustomPartFormType>();
    const {price} = values;
    useEffect(() => {
        const APIValues = addToCartCustomPartAPI(values, customPartProduct, '', undefined)
        const newPrice = getCustomPartPrice(customPartProduct, materials, APIValues);
        if (price !== newPrice) {
            setFieldValue('price', newPrice)
        }
    }, [{...values}])

    switch (type) {
        case "custom":
            return <CustomPartCabinet product={customPartProduct}
                                      isDepthIsConst={isDepthIsConst}
                                      isStandardCabinet={isStandardCabinet}
            />
        case "glass-door":
            return <CustomPartGlassDoorForm product={customPartProduct} />
        case "glass-shelf":
            return <CustomPartGlassShelfForm />
        case "panel":
        case "backing":
            return <CustomPartPanel product={customPartProduct} isStandardCabinet={isStandardCabinet} />
        case "pvc":
            return <CustomPartPVC product={customPartProduct} isStandardCabinet={isStandardCabinet} />
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
        case "thick_floating_shelf":
            return <CustomPartThickFloatingShelf product={customPartProduct} isStandardCabinet={isStandardCabinet} />
        case "drawer-inserts":
            return <CustomPartDrawerInserts product={customPartProduct} isStandardCabinet={isStandardCabinet} />
        case "ro_drawer":
            return <CustomPartRODrawer product={customPartProduct} />
        case "qty_only":
            return <CustomPartQtyOnly product={customPartProduct} />
        default:
            return null;
    }
};

export default CustomPartRight;