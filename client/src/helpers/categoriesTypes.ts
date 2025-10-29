import {MaybeEmpty, productCategory} from "./productTypes";
import {RoomCategoriesType} from "./roomTypes";

// export type category = {
//     name: string,
//     img: string
// }

export type setCategoryType = (value: productCategory) => void;

export type SliderType = {
    category: MaybeEmpty<productCategory>,
    setCategory: setCategoryType,
    room: RoomCategoriesType,
    isStandardCabinet: boolean,
    noGola: boolean
}

export type CatItem = {
    name: productCategory,
    img: string
}

export type SliderCategoriesType = {
    "Kitchen": SliderCategoriesItemType,
    "Kitchen Gola": SliderCategoriesItemType,
    "Vanity": SliderCategoriesItemType,
    "Vanity Gola": SliderCategoriesItemType,
    "Build In Closet": SliderCategoriesItemType,
    "Leather Closet": SliderCategoriesItemType,
    "Standard Door": SliderCategoriesItemType,
    "RTA Closet": SliderCategoriesItemType,
    "Cabinet System Closet": SliderCategoriesItemType
}

export type SliderCategoriesItemType = {
    "defaultImg": string,
    categories: CatItem[]
}