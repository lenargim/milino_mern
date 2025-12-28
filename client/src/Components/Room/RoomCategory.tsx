import React, {FC} from 'react';
import {MaybeEmpty, productCategory} from "../../helpers/productTypes";
import RoomProductsList from "./RoomProductsList";
import {getImg, getSliderCategories, useAppDispatch} from "../../helpers/helpers";
import s from "./room.module.sass";
import {roomSetActiveCategory} from "../../store/reducers/roomSlice";
import {useOutletContext} from "react-router-dom";
import {RoomFront} from "../../helpers/roomTypes";

const RoomCategory: FC = () => {
    const [room] = useOutletContext<[RoomFront]>()
    if (!room) return null;
    const {_id, activeProductCategory: category_active, door_type} = room;
    const {categories, defaultImg} = getSliderCategories(room);
    const currentCat = categories.find(cat => cat.name === category_active);
    return (
        <>
            <form>
                <div>
                    <div className={s.img}>
                        <img src={getImg('categories', currentCat?.img ?? defaultImg)} alt={category_active}/>
                    </div>
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
            {category_active && <RoomProductsList category_active={category_active} room={room} isStandardCabinet={door_type === 'Standard size shaker'}/>}
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