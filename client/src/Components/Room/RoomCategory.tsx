import React, {FC, useState} from 'react';
import {getCategoryImg, getSliderCategories, useAppDispatch} from "../../helpers/helpers";
import s from "./room.module.sass";
import {useOutletContext} from "react-router-dom";
import {customPartsImgList, CustomPartsImgListItem, RoomFront} from "../../helpers/roomTypes";
import {CatItem} from "../../helpers/categoriesTypes";
import {MaybeEmpty, MaybeNull, productCategory} from "../../helpers/productTypes";
import RoomProductsList from "./RoomProductsList";
import {roomSetActiveCategory} from "../../store/reducers/roomSlice";


const RoomCategory: FC = () => {
    const [room] = useOutletContext<[RoomFront]>();
    const [hoveredItem, setHoveredItem] = useState<MaybeNull<CustomPartsImgListItem>>(null);
    if (!room) return null;
    const {_id, activeProductCategory: category_active, door_type} = room;
    const {categories, img, name, type} = getSliderCategories(room);
    const currentCat: CatItem = categories.find(cat => cat.name === category_active) ?? {name, type, img};


    return (
        <>
            <form>
                <div>
                    <div className={s.img}>
                        <img src={getCategoryImg(room, currentCat, hoveredItem)} alt={category_active}/>
                    </div>
                    <ul className={s.customPartsList}>
                        {customPartsImgList.map((el, index) => {
                            return <li key={index}
                                       onMouseEnter={() => setHoveredItem(el)}
                                       onMouseLeave={() => setHoveredItem(null)}
                            >{el.name}</li>
                        })}
                    </ul>
                    <div className={s.category}>
                        {categories.map(el => <CategoryItem key={el.name}
                                                            name={el.name}
                                                            current={category_active}
                                                            _id={_id}
                        />)
                        }
                    </div>
                </div>
            </form>
            {category_active && <RoomProductsList category_active={category_active} room={room}
                                                  isStandardCabinet={door_type === 'Standard Size Shaker'}/>}
        </>
    )
};

export default RoomCategory;

const CategoryItem: FC<{ name: productCategory, current: MaybeEmpty<productCategory>, _id: string }> = ({
                                                                                                            _id,
                                                                                                            name,
                                                                                                            current
                                                                                                        }) => {
    const dispatch = useAppDispatch();
    return (
        <div className={[s.item, current === name ? s.itemChecked : ''].join(' ')}>
            <input name="category" type="radio" id={name} value={name} onInput={() => dispatch(roomSetActiveCategory({
                _id,
                category: name
            }))}/>
            <label htmlFor={name} className="button yellow small">{name}</label>
        </div>
    )
}