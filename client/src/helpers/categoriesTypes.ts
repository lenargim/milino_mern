import {productCategory} from "./productTypes";

export type category = {
    name: string,
    img: string
}

export type RoomType = 'Kitchen' | 'Vanity' | 'Build In Closet' | 'Leather Closet';

export type roomType = {
    defaultImg: string,
    categories: category[]
}


export type setCategoryType = (value: productCategory) => void;

export type SliderType = {
    category: productCategory | '',
    setCategory: setCategoryType,
    room: RoomType,
    isStandardCabinet: boolean
}