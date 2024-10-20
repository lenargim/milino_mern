import React, {FC} from 'react';
// import {Form, Formik} from "formik";
// import {
//     ProductInputCustom,
//     ProductRadioInputCustom,
//     TextInput
// } from "../../common/Form";
// import s from './product.module.sass'
// import {
//     addToCartStandardProduct,
//     checkDoors,
//     checkHingeOpening,
//     checkProduct,
//     getInitialStandardProductValues,
//     isHasLedBlock,
//     standardProductValuesType,
//     useAppDispatch
// } from "../../helpers/helpers";
// import {
//     addToCart,
// } from "../../store/reducers/generalSlice";
// import {
//     CartExtrasType, extraStandardPricesType, StandardCabinetFormType,
//
// } from "../../helpers/productTypes";
// import {
//     addGlassDoorPrice,
//     addGlassShelfPrice,
//     addPTODoorsPrice,
//     addPTODrawerPrice,
//     addPTOTrashBinsPrice, calculateStandardData,
//     getDoorMinMaxValuesArr, getDoorPrice,
//     getDoorSquare,
//     getDoorWidth, getDrawerPrice,
//     getHingeArr,
//     getInitialPrice,
//     getLedPrice, getStandardStartPrice, getStandardTablePrice,
//
//     getType, getValidHeightRange
// } from "../../helpers/calculatePrice";
// import LedBlock from "./LED";
// import {getStandardProductSchema} from "./ProductSchema";
// import TestStandard from "./TestStandart";
// import OptionsBlock from "./OptionsBlock";
// import HingeBlock from "./HingeBlock";
// import CornerBlock from "./CornerBlock";
// import {useParams} from "react-router-dom";

// const CabinetForm: FC<StandardCabinetFormType> = ({
//                                                       product,
//                                                       StandardProductPriceData,
//                                                       productRange,
//                                                       sizeLimit,
//                                                       baseProductPrice,
//                                                       materialData
//                                                   }) => {
//     const dispatch = useAppDispatch();
//     const {id: roomId} = useParams();
//     const {
//         id,
//         name,
//         images,
//         type,
//         attributes,
//         price,
//         widthDivider,
//         depth,
//         category,
//         legsHeight,
//         isBlind,
//         isAngle,
//         hasMiddleSection,
//         isCornerChoose,
//         cartExtras
//     } = product;
//     const {
//         doorValues,
//         blindArr, filteredOptions, shelfsQty, drawersQty, rolloutsQty
//     } = StandardProductPriceData
//     const {category: materialCat, drawer, boxMaterialCoef} = materialData
//     const {widthRange, heightRange, depthRange} = productRange;
//
//
//     const hasLedBlock = isHasLedBlock(category)
//     const depthRangeWithCustom = depthRange.concat([0]);
//
//     return (
//         <Formik
//             initialValues={getInitialStandardProductValues(productRange, doorValues, category, depth, isBlind, blindArr, isAngle, isCornerChoose)}
//             validationSchema={getStandardProductSchema(sizeLimit, isAngle)}
//             onSubmit={(values: standardProductValuesType, {resetForm}) => {
//                 if (price) {
//                     const cartData = addToCartStandardProduct(values, type, id, isBlind, images, name, hasMiddleSection, category, price, cartExtras, legsHeight, productRange)
//                     dispatch(addToCart(cartData))
//                     resetForm();
//                 }
//             }}
//         >
//             {({values, setFieldValue}) => {
//                 const {
//                     ['Width']: width,
//                     ['Height']: height,
//                     ['Depth']: depth,
//                     ['Custom Depth Number']: customDepthNumber,
//                     doors: doors,
//                     ['Blind Width']: blindWidth,
//                     ['Hinge opening']: hingeOpening,
//                     ['Door Profile']: doorProfile,
//                     ['Door Glass Type']: doorGlassType,
//                     ['Door Glass Color']: doorGlassColor,
//                     ['Shelf Profile']: shelfProfile,
//                     ['Shelf Glass Type']: shelfGlassType,
//                     ['Shelf Glass Color']: shelfGlassColor,
//                     Options: chosenOptions,
//                     'LED borders': ledBorders,
//                     'LED alignment': ledAlignment,
//                     'LED indent': ledIndent
//                 } = values;
//
//                 const realWidth: number = +width ?? 0;
//                 const realBlindWidth: number = +blindWidth ?? 0;
//                 const realHeight = +height ?? 0;
//                 const doorHeight: number = realHeight ? realHeight - legsHeight : 0;
//                 const realDepth: number = isAngle ? realWidth : (+depth || +customDepthNumber || 0);
//                 if (isAngle && realWidth !== depth) setFieldValue('Depth', realWidth);
//
//                 const validHeightRange = getValidHeightRange(realWidth, heightRange, baseProductPrice);
//
//                 if (!validHeightRange.includes(realHeight)) {
//                     setFieldValue('Height', validHeightRange[0]);
//                 }
//
//                 const doorArr = getDoorMinMaxValuesArr(width, doorValues, widthDivider);
//                 const hingeArr = getHingeArr(doorArr || [], category);
//
//                 const doorWidth = getDoorWidth(realWidth, realBlindWidth, isBlind, isAngle)
//                 const doorSquare = getDoorSquare(doorWidth, doorHeight);
//                 const newType = getType(realWidth, realHeight, widthDivider, doors, category, attributes);
//
//                 const extraPrices: extraStandardPricesType = {
//                     ptoDoors: chosenOptions.includes('PTO for doors') ? addPTODoorsPrice(attributes, type) : 0,
//                     ptoDrawers: chosenOptions.includes('PTO for drawers') ? addPTODrawerPrice(type, drawersQty) : 0,
//                     glassShelf: chosenOptions.includes('Glass Shelf') ? addGlassShelfPrice(shelfsQty) : 0,
//                     glassDoor: chosenOptions.includes('Glass Door') ? addGlassDoorPrice(doorSquare, doorProfile) : 0,
//                     ptoTrashBins: chosenOptions.includes('PTO for Trash Bins') ? addPTOTrashBinsPrice() : 0,
//
//                     doorPrice: getDoorPrice(doorSquare, 37.8),
//                     drawerPrice: getDrawerPrice(drawersQty + rolloutsQty, drawer, realWidth, materialCat),
//                     ledPrice: getLedPrice(realWidth, realHeight, ledBorders),
//                     boxMaterialCoef: boxMaterialCoef,
//                     doorSquare: doorSquare,
//                 }
//
//                 checkDoors(+doors, doorArr, hingeOpening, setFieldValue)
//                 checkHingeOpening(hingeOpening, hingeArr, +doors, setFieldValue)
//
//                 const initialPrice = getInitialPrice(baseProductPrice, productRange, category, boxMaterialCoef);
//                 if (!initialPrice) return <div>Cannot find initial price</div>
//                 const tablePrice = getStandardTablePrice(realWidth, realHeight, realDepth, baseProductPrice);
//                 const startPrice: number = getStandardStartPrice(realDepth, boxMaterialCoef, sizeLimit, tablePrice);
//
//                 const calculatedStandardData = calculateStandardData(startPrice, extraPrices, realDepth, depthRange, isAngle);
//                 const {totalPrice, coefDepth, coefExtra} = calculatedStandardData
//                 const totalDepthPrice = initialPrice * (coefDepth + 1);
//                 extraPrices.depth = +(totalDepthPrice - initialPrice).toFixed(1);
//                 extraPrices.tablePrice = tablePrice;
//
//                 const cartExtras: CartExtrasType = {
//                     ptoDoors: extraPrices.ptoDoors,
//                     ptoDrawers: extraPrices.ptoDrawers,
//                     glassShelf: extraPrices.glassShelf,
//                     glassDoor: extraPrices.glassDoor,
//                     ptoTrashBins: extraPrices.ptoTrashBins,
//                     ledPrice: extraPrices.ledPrice,
//                     coefExtra,
//                     attributes,
//                     boxFromFinishMaterial: false
//                 }
//
//
//                 setTimeout(() => {
//                     checkProduct(price, totalPrice, type, newType, cartExtras, dispatch, roomId)
//                 }, 0)
//
//                 return (
//                     <Form>
//                         <div className={s.block}>
//                             <h3>Width</h3>
//                             <div className={s.options}>
//                                 {widthRange.map((w, index) => <ProductRadioInputCustom key={index}
//                                                                                        name={'Width'}
//                                                                                        value={w}/>)}
//                             </div>
//                         </div>
//
//                         <div className={s.block}>
//                             <h3>Height</h3>
//                             <div className={s.options}>
//                                 {validHeightRange.map((w, index) => <ProductRadioInputCustom key={index}
//                                                                                              name={'Height'}
//                                                                                              value={w}/>)}
//                             </div>
//                         </div>
//
//                         <div className={s.divider}>
//                             {!isAngle ?
//                                 <div className={s.block}>
//                                     <h3>Depth {extraPrices.depth ? `+${extraPrices.depth}$` : null}</h3>
//                                     <div className={s.options}>
//                                         {depthRangeWithCustom.map((w, index) => <ProductRadioInputCustom key={index}
//                                                                                                          name={'Depth'}
//                                                                                                          value={w}/>)}
//                                         {!depth && <ProductInputCustom value={null} name={'Custom Depth'}/>}
//                                     </div>
//                                 </div>
//                                 : null}
//                         </div>
//                         <HingeBlock hingeArr={hingeArr}/>
//                         <CornerBlock isCornerChoose={isCornerChoose}/>
//                         <LedBlock borders={ledBorders} alignment={ledAlignment} indent={ledIndent}
//                                   hasLedBlock={hasLedBlock}/>
//                         <OptionsBlock filteredOptions={filteredOptions} chosenOptions={chosenOptions}
//                                       doorProfile={doorProfile} doorGlassType={doorGlassType}
//                                       doorGlassColor={doorGlassColor} shelfProfile={shelfProfile}
//                                       shelfGlassType={shelfGlassType} shelfGlassColor={shelfGlassColor}/>
//                         <div className={s.block}>
//                             <TextInput type={"text"} label={'Note'} name="Note"/>
//                         </div>
//                         <div className={s.total}>
//                             <span>Total: </span>
//                             <span>{totalPrice}$</span>
//                         </div>
//                         <button type="submit" className={['button yellow'].join(' ')}>Add to cart</button>
//                         <TestStandard extraPrices={extraPrices}/>
//                     </Form>
//                 )
//             }}
//         </Formik>
//     );
// };
//
// export default CabinetForm;