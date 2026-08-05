import React, {FC, useEffect, useState} from 'react';
import s from "./product.module.sass";
import {getImg, getImgOrNull, getImgSize, getProductImagePath} from "../../helpers/helpers";
import {ProductType, ProductFormType, MaybeNull} from "../../helpers/productTypes";
import {useFormikContext} from "formik";
import Materials from "../../common/Materials";
import {ProductAttributes} from "./ProductAttributes";
import {RoomFront, RoomMaterialsFormType} from "../../helpers/roomTypes";
import noImg from "../../assets/img/noPhoto.png";

const ProductLeft: FC<{ product: ProductType, materials: RoomMaterialsFormType, room: RoomFront }> = ({
                                                                                                          product,
                                                                                                          materials,
                                                                                                          room
                                                                                                      }) => {
    const {name, attributes} = product;
    const {
        values: {
            image_active_number,
            doors_amount,
            hinge_opening,
            corner,
            glass_door
        }
    } = useFormikContext<ProductFormType>();
    const {category} = room;
    const img = getProductImagePath(room, product, hinge_opening ?? corner);
    const imgSize = getImgSize(category);
    const [glassDoorImg, setGlassDoorImg] = useState<MaybeNull<string>>(null)

    useEffect(() => {
        const has_glass_door = !!glass_door && !!glass_door[0];

        if (!has_glass_door) {
            setGlassDoorImg(null);
            return;
        }
        const str = getImgOrNull('glass_door_profile', `${glass_door[0]}.jpg`);
        setGlassDoorImg(str)
    }, [glass_door[0]]);

    return (
        <div className={s.left}>
            <h2>{name}</h2>
            <div className={[s.img, s[imgSize]].join(' ')}>
                <img src={img} alt={name}/>
            </div>
            <ProductAttributes doors_amount={doors_amount} attributes={attributes} type={image_active_number}/>
            <Materials materials={materials}/>
            {
                glassDoorImg &&
                <div className={[s.img].join(' ')}>
                    <img src={glassDoorImg} alt={name}/>
                </div>
            }
        </div>
    );
};

export default ProductLeft;