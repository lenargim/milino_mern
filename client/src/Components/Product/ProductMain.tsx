import React, {FC} from 'react';
// import {OrderFormType} from "../../helpers/types";
// import s from './product.module.sass'
// import {getImg, getImgSize, getProductImage} from "../../helpers/helpers";
// import {AtrrsList} from "../Cabinets/List";
// import {ProductType} from "../../helpers/productTypes";
// import StandardCabinet from "./StandardCabinet";
// import Cabinet from "./Cabinet";
// import Materials from "../../common/Materials";
// import {MaybeNull} from "../Profile/RoomForm";
//
// type ProductMainType = {
//     product: MaybeNull<ProductType>,
//     materials: OrderFormType
// }
// const ProductMain: FC<ProductMainType> = ({product, materials}) => {
//     if (!product) return null;
//     const {image_active_number, attributes, name, images, category, isProductStandard} = product;
//     const img = getProductImage(images, image_active_number);
//     const imgSize = getImgSize(category);
//
//     return (
//         <div className={s.productWrap}>
//             <div className={s.left}>
//                 <h2>{name}</h2>
//                 <div className={[s.img, s[imgSize]].join(' ')}><img src={getImg('products', img)} alt={product.name}/>
//                 </div>
//                 <AtrrsList attributes={attributes} type={image_active_number}/>
//                 <Materials data={materials}/>
//             </div>
//             <div className={s.right}>
//                 {isProductStandard ?
//                     <StandardCabinet product={product}
//                                      materials={materials}
//                     /> :
//                     <Cabinet
//                         product={product}
//                         materials={materials}
//                     />
//                 }
//             </div>
//         </div>
//     );
// };
//
// export default ProductMain;