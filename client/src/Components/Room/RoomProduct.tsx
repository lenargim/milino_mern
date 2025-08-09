import React, {FC} from 'react';
import {useOutletContext, useParams} from "react-router-dom";
import Product from "../Product/Product";
import {RoomFront, RoomMaterialsFormType} from "../../helpers/roomTypes";
import {
    getCustomPartInitialFormValues, getCustomPartInitialTableData,
    getProductById,
    getProductInitialFormValues,
    getProductInitialTableData
} from "../../helpers/helpers";
import CustomPart from "../CustomPart/CustomPart";
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
            const customPartData = getCustomPartInitialTableData(product_or_custom as CustomPartType, materials, isRoomStandard);
            const initialCustomPartValues = getCustomPartInitialFormValues(customPartData, cartItemValues)
            return <CustomPart materials={materials}
                               room_id={room_id}
                               custom_part={product_or_custom as CustomPartType}
                               customPartData={customPartData}
                               initialCustomPartValues={initialCustomPartValues}
                               productEditId={productEditId}
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