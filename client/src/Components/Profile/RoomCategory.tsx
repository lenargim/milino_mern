import React, {FC} from 'react';
import {productCategory} from "../../helpers/productTypes";
import {catInfoType} from "../Cabinets/Slider";
import List from "../Cabinets/List";
import {getImg, useAppDispatch} from "../../helpers/helpers";
import s from "../Cabinets/cabinets.module.sass";
import {roomSetActiveCategory, RoomTypeAPI} from "../../store/reducers/roomSlice";
import categoriesData from "../../api/categories.json";
import {MaybeEmpty} from "./RoomForm";
import {useOutletContext} from "react-router-dom";

const RoomCategory: FC = () => {
    const [roomData] = useOutletContext<[RoomTypeAPI]>()
    const {_id, activeProductCategory: category, category: room} = roomData;
    if (!room) return null;
    const {categories, defaultImg} = categoriesData[room] as catInfoType;
    const currentCat = categories.find(cat => cat.name === category);
    return (
        <>
            <form>
                <div className={s.slider}>
                    <div className={s.img}>
                        <img src={getImg('categories', currentCat ? currentCat.img : defaultImg)} alt={room}/>
                    </div>
                    <div className={s.category}>
                        {categories.map(el => <CategoryItem name={el.name}
                                                            current={category}
                                                            key={el.name}
                                                            _id={_id}
                        />)
                        }
                    </div>
                </div>
            </form>
            {category && <List category={category} room={room}/>}
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