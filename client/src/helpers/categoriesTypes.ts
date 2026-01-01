import {MaybeEmpty, productCategory} from "./productTypes";
import {RoomCategoriesType} from "./roomTypes";

export type setCategoryType = (value: productCategory) => void;

export type SliderType = {
    category: MaybeEmpty<productCategory>,
    setCategory: setCategoryType,
    room: RoomCategoriesType,
    isStandardCabinet: boolean,
    noGola: boolean
}


export type CatItemType = 'reqular'|'gola'|'custom'|'standard'
export type CatItem = {
    name: productCategory,
    img: string,
    type: CatItemType
}

export type SliderCategoriesType = {
    "Kitchen": SliderCategoriesItemType,
    "Kitchen Gola": SliderCategoriesItemType,
    "Kitchen Standard": SliderCategoriesItemType,
    "Vanity": SliderCategoriesItemType,
    "Vanity Gola": SliderCategoriesItemType,
    "Build In Closet": SliderCategoriesItemType,
    "Leather Closet": SliderCategoriesItemType,
    "Standard Door": SliderCategoriesItemType,
    "RTA Closet": SliderCategoriesItemType,
    "Cabinet System Closet": SliderCategoriesItemType
}

export type SliderCategoriesItemType = {
    name: productCategory,
    img: string,
    type: CatItemType,
    categories: CatItem[]
}