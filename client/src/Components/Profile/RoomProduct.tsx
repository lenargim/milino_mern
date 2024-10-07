import React, {FC, useEffect} from 'react';
import {
    getImg,
    getImgSize,
    getProductImage,
    getProductsByCategory,
    useAppDispatch,
} from "../../helpers/helpers";
import {useNavigate, useOutletContext, useParams} from "react-router-dom";
import {productCategory, productDataType, productType, standardProductType} from "../../helpers/productTypes";
import {MaybeUndefined} from "./RoomForm";
import {AtrrsList} from "../Cabinets/List";
import {RoomTypeAPI, setProduct} from "../../store/reducers/roomSlice";
import {OrderFormType} from "../../helpers/types";
import StandardCabinet from "../Product/StandardCabinet";
import Cabinet from "../Product/Cabinet";
import s from "./profile.module.sass";

const RoomProduct: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const [roomData] = useOutletContext<[RoomTypeAPI]>()
    const {
        _id,
        category: roomCat,
        productPage,
        door_finish_material,
        door_type,
        box_material,
        door_color,
        door_grain,
        door_frame_width,
        drawer, drawer_type, drawer_color, leather
    } = roomData;
    let {category, productId} = useParams();
    let products = getProductsByCategory(category as productCategory);
    const product: MaybeUndefined<productDataType> = products.find(product => (product.id).toString() === productId);

    useEffect(() => {
        if (!category || !product) {
            navigate(`/profile/rooms/${_id}`)
        } else {
            if (!productPage || productPage.id !== product.id) {
                dispatch(setProduct({product, roomId: _id}));
            }
        }
    }, [])


    if (!productPage) return null;
    const {images, type, attributes, name} = productPage


    const img = getProductImage(images, type);
    const imgSize = getImgSize(category || '');
    const isStandardCabinet = roomCat === "Standard Door";
    const materials: OrderFormType = {
        'Category': roomCat,
        'Door Type': door_type,
        'Door Finish Material': door_finish_material,
        'Door Frame Width': door_frame_width,
        'Door Color': door_color,
        'Door Grain': door_grain,
        'Box Material': box_material,
        'Drawer': drawer,
        'Drawer Type': drawer_type,
        'Drawer Color': drawer_color,
        'Leather Type': leather
    };

    return (
        <div className={s.product}>
            <div className={s.left}>
                <h2>{name}</h2>
                <div className={[s.img, s[imgSize]].join(' ')}><img src={getImg('products', img)}
                                                                    alt={name}/>
                </div>
                <AtrrsList attributes={attributes} type={type}/>
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

export default RoomProduct;