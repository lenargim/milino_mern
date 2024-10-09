import React, {FC} from 'react';
import {sizeLimitsType} from "../../helpers/productTypes";
import {
    getBaseProductPrice,
    getProductRange,
    getStandardMaterialData,
    // getStandardProductPriceData
} from "../../helpers/calculatePrice";
//import StandardCabinetForm from "./StandardCabinetForm";
//import sizes from "../../api/sizes.json";

// const StandardCabinet:FC<StandardCabinetType> = ({product, materials}) => {
//     const {id, customHeight, customDepth, category} = product
//     const materialData = getStandardMaterialData(materials)
//     const StandardProductPriceData = getStandardProductPriceData(product, materialData)
//     const baseProductPrice = getBaseProductPrice(id);
//     const productRange = getProductRange(baseProductPrice, category, customHeight, customDepth);
//     const sizeLimit: sizeLimitsType | undefined = sizes.find(size => size.productIds.includes(product.id))?.limits;
//
//     if (!baseProductPrice) return <div>No price table data</div>
//     if (!sizeLimit) return <div>Cannot find size limit</div>;
//     if (!productRange.widthRange[0]) return <div>Cannot find initial width</div>;
//
//     return <StandardCabinetForm StandardProductPriceData={StandardProductPriceData}
//                                 baseProductPrice={baseProductPrice}
//                                 productRange={productRange}
//                                 sizeLimit={sizeLimit}
//                                 product={product}
//                                 materialData={materialData}
//     />;
// };

// export default StandardCabinet;