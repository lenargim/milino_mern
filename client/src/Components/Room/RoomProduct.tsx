import React, {FC} from 'react';
import {useOutletContext, useParams} from "react-router-dom";
import Product from "../Product/Product";
import {RoomFront, RoomMaterialsFormType} from "../../helpers/roomTypes";
import {
    findIsRoomStandard, getCustomPartInitialFormValues, getCustomPartInitialTableData, getInitialMaterialData,
    getProductById,
    getProductInitialFormValues,
    getProductInitialTableData
} from "../../helpers/helpers";
import CustomPart, {CustomPartFormType} from "../CustomPart/CustomPart";
import {
    CustomPartType,
    MaybeUndefined,
    ProductType
} from "../../helpers/productTypes";
import {CartItemFrontType} from "../../helpers/cartTypes";

const RoomProduct: FC<{ cartItemValues?: CartItemFrontType }> = ({cartItemValues}) => {
    let {productId} = useParams<{ productId: MaybeUndefined<string> }>();
    const [room, materials, isRoomStandard] = useOutletContext<[RoomFront, RoomMaterialsFormType, boolean]>()
    const {_id: room_id} = room
    const product_or_custom = getProductById(Number(productId), isRoomStandard);
    if (!product_or_custom) return <div>Product error</div>;
    const productEditId = cartItemValues?._id;
    switch (product_or_custom.product_type) {
        case "custom": {
            // const initialMaterialData = getInitialMaterialData(product_or_custom as CustomPartType, materials, isRoomStandard);
            // const initialSizes = getInitialSizes(custom_part, initialMaterialData);
            // const {initial_width, initial_height, initial_depth} = initialSizes
            // const isDoorAccessories = ["door-accessories"].includes(custom_part.type);
            // const initialValues: CustomPartFormType = {
            //     'Width': initial_width.toString(),
            //     'Height': initial_height.toString(),
            //     'Depth': initial_depth.toString(),
            //     'Width Number': initial_width,
            //     'Height Number': initial_height,
            //     'Depth Number': initial_depth,
            //     'Material': initialMaterialData?.name || '',
            //     glass_door: ['', '', ''],
            //     glass_shelf: '',
            //     led_accessories: {
            //         led_alum_profiles: [],
            //         led_gola_profiles: [],
            //         led_door_sensor: 0,
            //         led_dimmable_remote: 0,
            //         led_transformer: 0,
            //     },
            //     door_accessories: isDoorAccessories ? initialDoorAccessories : [],
            //     standard_door: null,
            //     standard_panels: initialStandardPanels,
            //     rta_closet_custom: [],
            //     'Note': '',
            //     price: 0,
            // }
            const customPartData = getCustomPartInitialTableData(product_or_custom as CustomPartType, materials, isRoomStandard);
            console.log(customPartData)
            const initialCustomPartValues = getCustomPartInitialFormValues(customPartData, cartItemValues, product_or_custom as CustomPartType)



            return <CustomPart materials={materials}
                               room_id={room_id}
                               custom_part={product_or_custom as CustomPartType}
                               customPartData={customPartData}
                               initialCustomPartValues={initialCustomPartValues}
            />
        }
        case "cabinet":
        case "standard": {
            const productData = getProductInitialTableData(product_or_custom as ProductType, materials);
            if (!productData) return <div>Cannot find product data</div>;
            const initialProductValues = getProductInitialFormValues(productData, cartItemValues, product_or_custom as ProductType)
            return <Product materials={materials}
                            room_id={room_id}
                            product={product_or_custom as ProductType}
                            productData={productData}
                            initialProductValues={initialProductValues}
                            productEditId={productEditId}
            />
        }
    }
};

export default RoomProduct;