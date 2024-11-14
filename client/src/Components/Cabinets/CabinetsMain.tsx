import React, {FC} from 'react';
import Header from "../../common/Header/Header";
import {Navigate} from "react-router-dom";
import Room from "./Room";
import {MaterialsFormType} from "../../common/MaterialsForm";
export type CabinetsMainType = {
    materials: MaterialsFormType
}

const CabinetsMain: FC<CabinetsMainType> = ({materials}) => {
    const {category, door_type} = materials;
    const isStandardCabinet = door_type === 'Standard Door'
    if (!category) return <Navigate to={{pathname: '/'}}/>;
    return (
        <div className="container">
            <Header/>
            <h1>{category}</h1>
            <Room isStandardCabinet={isStandardCabinet} room={category} />
        </div>
    );

};

export default CabinetsMain;