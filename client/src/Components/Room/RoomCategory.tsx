import React, {FC} from 'react';
import {MaybeEmpty, productCategory} from "../../helpers/productTypes";
import List from "../Cabinets/List";
import {getImg, getSliderCategories, useAppDispatch} from "../../helpers/helpers";
import s from "../Cabinets/cabinets.module.sass";
import {RoomFront, roomSetActiveCategory} from "../../store/reducers/roomSlice";
import {useOutletContext} from "react-router-dom";

const RoomCategory: FC = () => {
    const [roomData] = useOutletContext<[RoomFront]>()
    const {_id, activeProductCategory: category, category: room, door_type, gola} = roomData;
    if (!room) return null;
    const isStandardCabinet = door_type === 'Standard Door';
    const noGola = !gola || gola === 'No Gola'

    const {categories, defaultImg} = getSliderCategories(room, noGola, isStandardCabinet);
    const currentCat = categories.find(cat => cat.name === category);
    return (
        <>
            <form>
                <div>
                    <div className={s.img}>
                        <img src={getImg('categories', currentCat ? currentCat.img : defaultImg)} alt={room}/>
                    </div>
                    <div className={s.category}>
                        {categories.map(el => <CategoryItem key={el.name}
                                                            name={el.name}
                                                            current={category}
                                                            _id={_id}
                        />)
                        }
                    </div>
                </div>
            </form>
            {category && <List category={category} room={room} isStandardCabinet={isStandardCabinet}/>}
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