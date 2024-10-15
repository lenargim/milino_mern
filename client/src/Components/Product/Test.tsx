import React, {FC} from 'react';
// import {extraPricesType, materialDataType, pricePart, ProductType} from "../../helpers/productTypes";
// import {
//     addDepthPriceCoef, addGlassDoorPrice, addGlassShelfPrice,
//     addHeightPriceCoef, addPTODoorsPrice, addPTODrawerPrice, addPTOTrashBinsPrice,
//     addWidthPriceCoef,
//     coefType, getDoorPrice, getDrawerPrice, getLedPrice, getProductDataToCalculatePrice,
//     getProductRange, getPvcPrice
// } from "../../helpers/calculatePrice";
// import {CartAPI, CartItemType} from "../../api/apiFunctions";
// import {getSquare} from "../../helpers/helpers";
//
//
// type TestType = {
//     cartItem: CartItemType,
//     product: ProductType,
//     tablePriceData: pricePart[],
//     materialData: materialDataType
// }
// const Test: FC<TestType> = ({materialData, tablePriceData, product, cartItem}) => {
//     const {category, isAngle, doorSquare, legsHeight, attributes} = product
//     const {width, height, depth, door_option, options, led_border,blind_width} = cartItem
//     const productRange = getProductRange(tablePriceData, category, height, depth);
//     const {drawer_brand, door_finish_material, drawer_type, drawer_color, door_price_multiplier,is_acrylic, door_type} = materialData
//     const {widthRange, heightRange, depthRange} = productRange
//     const coef: coefType = {
//         width: 0,
//         height: 0,
//         depth: 0
//     }
//     const maxWidth = widthRange[widthRange.length - 1];
//     const maxHeight = heightRange[heightRange.length - 1];
//     if (maxWidth < width) coef.width = addWidthPriceCoef(width, maxWidth);
//     if (maxHeight < height) coef.height = addHeightPriceCoef(height, maxHeight);
//     if (depthRange[0] !== depth) coef.depth = addDepthPriceCoef(depth, depthRange, isAngle);
//
//     const productPriceData = getProductDataToCalculatePrice(product, drawer_brand);
//     const {
//         drawersQty,
//         shelfsQty,
//         rolloutsQty,
//     } = productPriceData;
//     const doorHeight = height - legsHeight;
//     const frontSquare = getSquare(width, doorHeight);
//     const ptoDoors = options.includes('PTO for doors') ? addPTODoorsPrice(attributes, image_active_number) : 0;
//     const ptoDrawers = options.includes('PTO for drawers') ? addPTODrawerPrice(image_active_number, drawersQty) : 0;
//     const glassShelf = options.includes('Glass Shelf') ? addGlassShelfPrice(shelfsQty) : 0;
//     const glassDoor = options.includes('Glass Door') ? addGlassDoorPrice(doorSquare, door_option[0]) : 0;
//     const ptoTrashBins = options.includes('PTO for Trash Bins') ? addPTOTrashBinsPrice() : 0;
//     const ledPrice = getLedPrice(width, height, led_border)
//     const pvcPrice = getPvcPrice(width, blind_width, doorHeight, is_acrylic, door_type, door_finish_material);
//     const doorPrice = getDoorPrice(frontSquare, door_price_multiplier);
//     const drawerPrice = getDrawerPrice(drawersQty + rolloutsQty, width, category, drawer_brand, drawer_type, drawer_color);
//
//
//     return (
//         <div>
//             <h3>Extra prices</h3>
//             {
//                 Object.entries(addition).map((el, index) => <div key={index}>{el[0]}: {el[1]}</div>)
//
//             }
//             <h3>Additional coefs for custom sizes</h3>
//             {
//                 Object.entries(coef).map((el, index) => <div key={index}>{el[0]}: {el[1]}</div>)
//
//             }
//         </div>
//     );
// };
//
// export default Test;