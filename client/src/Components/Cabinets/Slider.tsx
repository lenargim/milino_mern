import React, {FC} from 'react';
import s from './cabinets.module.sass'
import {setCategoryType, SliderType} from "../../helpers/categoriesTypes";
import {getImg, getSliderCategories} from "../../helpers/helpers";
import {MaybeUndefined, productCategory} from "../../helpers/productTypes";

export type catItem = {
    name: productCategory,
    img: string
}
export type catInfoType = {
    defaultImg: string,
    categories: catItem[]
}
const Slider: FC<SliderType> = ({setCategory, room, category, isStandardCabinet, noGola}) => {
    const {categories, defaultImg} = getSliderCategories(room, noGola, isStandardCabinet);
    const currentCat = categories.find(cat => cat.name === category);
    return (
        <form>
            {categories.length
                ? <div>
                    <div className={s.img}>
                        <img src={getImg('categories', currentCat ? currentCat.img : defaultImg)} alt={room}/>
                    </div>
                    <div className={s.category}>
                        {categories.map(el => <CategoryItem key={el.name}
                                                            name={el.name}
                                                            current={currentCat?.name}
                                                            setCategory={setCategory}
                        />)
                        }
                    </div>
                </div>
                : <div>Sorry, there are no products yet</div>}
        </form>
    );
};

export default Slider;

type CategoryItemType = {
    name: productCategory,
    current: MaybeUndefined<string>,
    setCategory: setCategoryType
}
const CategoryItem: FC<CategoryItemType> = ({name, setCategory, current}) => {
    const handleChange = (name: productCategory) => {
        setCategory(name)
    }
    return (
        <div className={[s.item, current === name ? s.itemChecked : ''].join(' ')}>
            <input name="category" type="radio" id={name} value={name} onInput={() => handleChange(name)}/>
            <label htmlFor={name} className="button yellow small">{name}</label>
        </div>
    )
}