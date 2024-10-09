import {Navigate} from "react-router-dom";
import {MaybeNull} from "../Components/Profile/RoomForm";
import {OrderFormType} from "../helpers/types";

export type WithChosenMaterialsProps = {
    outlet: JSX.Element,
};

export default function WithChosenMaterials({ outlet}: WithChosenMaterialsProps) {
    const materialsString = localStorage.getItem('materials');
    const materials:MaybeNull<OrderFormType> = materialsString ? JSON.parse(materialsString) : null
    if(materials) {
        return outlet;
    } else {
        return <Navigate to={{ pathname: '/' }} />;
    }
};
