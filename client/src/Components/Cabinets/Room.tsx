import React, {FC, useState} from 'react';
import Slider from "./Slider";
import List from "./List";
import {RoomType} from '../../helpers/categoriesTypes';
import {MaybeEmpty, productCategory} from "../../helpers/productTypes";

const Room: FC<{ room: RoomType, isStandardCabinet: boolean, noGola:boolean}> = ({room, isStandardCabinet, noGola}) => {
    const storageCat = localStorage.getItem('category') ? localStorage.getItem('category') as productCategory : '';
    let initialCat: MaybeEmpty<productCategory>;
    const kitchenCat = noGola ?
        ['Base Cabinets', 'Wall Cabinets', 'Tall Cabinets', 'Custom Parts']
        : ['Gola Base Cabinets', 'Gola Wall Cabinets', 'Gola Tall Cabinets', 'Custom Parts'];
    const StandardCats = ['Standard Base Cabinets', 'Standard Wall Cabinets', 'Standard Tall Cabinets']
    const vanityCat = noGola ?
        ['Vanities', 'Floating Vanities', 'Tall Cabinets','Custom Parts'] :
        ['Gola Floating Vanities', 'Gola Tall Cabinets','Custom Parts'];
    const closetCats = ['Build In', 'Leather', 'Custom Parts'];

    if (!storageCat) {
        initialCat = ''
    }
    else {
        switch (room) {
            case "Kitchen":
                if (isStandardCabinet) {
                    initialCat = StandardCats.includes(storageCat) ? storageCat : '';
                } else {
                    initialCat = kitchenCat.includes(storageCat) ? storageCat : '';
                }
                break
            case "Vanity":
                initialCat = vanityCat.includes(storageCat) ? storageCat : '';
                break
            case "Build In Closet":
            case "Leather Closet":
                initialCat = closetCats.includes(storageCat) ? storageCat : ''
                break;
            default:
                initialCat = 'Custom Parts'
        }
    }
    const [category, setCategory] = useState<MaybeEmpty<productCategory>>(initialCat)
    return (
        <>
            <Slider room={room} category={category} setCategory={setCategory} isStandardCabinet={isStandardCabinet} noGola={noGola}/>
            {category && <List category={category} room={room} isStandardCabinet={isStandardCabinet}/>}
        </>
    )
};

export default Room;