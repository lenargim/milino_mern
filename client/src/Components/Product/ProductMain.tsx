import React, {FC} from 'react';
import {OrderFormType} from "../../helpers/types";
import s from './product.module.sass'
import {getImg, getImgSize, getProductImage} from "../../helpers/helpers";
import {AtrrsList} from "../Cabinets/List";
import {productType, standardProductType} from "../../helpers/productTypes";
import StandardCabinet from "./StandardCabinet";
import Cabinet from "./Cabinet";
import Materials from "../../common/Materials";

type ProductMainType = {
    product: productType | standardProductType | null,
    materials: OrderFormType
}
const ProductMain: FC<ProductMainType> = ({product, materials}) => {
    if (!product) return <></>
    const {type, attributes, name, images, category} = product;
    const img = getProductImage(images, type);
    const imgSize = getImgSize(category);
    const isStandardCabinet = 'Standard Door' === materials.Category;

    return (
        <div className={s.productWrap}>
            <div className={s.left}>
                <h2>{name}</h2>
                <div className={[s.img, s[imgSize]].join(' ')}><img src={getImg('products', img)} alt={product.name}/>
                </div>
                <AtrrsList attributes={attributes} type={type}/>
                <Materials data={materials}/>
            </div>
            <div className={s.right}>
                {isStandardCabinet ?
                    <StandardCabinet product={product as standardProductType}
                                     materials={materials}
                    /> :
                    <Cabinet
                        product={product as productType}
                        materials={materials}
                    />
                }
            </div>
        </div>
    );
};

export default ProductMain;