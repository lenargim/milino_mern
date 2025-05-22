import {Navigate} from "react-router-dom";
import {MaybeNull} from "../helpers/productTypes";
import {MaterialsFormType} from "../Components/Room/RoomMaterialsForm";

export type WithChosenMaterialsProps = {
    outlet: JSX.Element,
};

export default function WithChosenMaterials({ outlet}: WithChosenMaterialsProps) {
    const materialsString = localStorage.getItem('materials');
    const materials:MaybeNull<MaterialsFormType> = materialsString ? JSON.parse(materialsString) : null
    if(materials) {
        return outlet;
    } else {
        return <Navigate to={{ pathname: '/' }} />;
    }
};
