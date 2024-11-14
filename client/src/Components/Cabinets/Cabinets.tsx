import React, {FC} from 'react';
import CabinetsMain from "./CabinetsMain";
import {getStorageMaterials} from "../../helpers/helpers";
import {Navigate} from "react-router-dom";
import Sidebar from "../OrderForm/Sidebar/Sidebar";

const Cabinets: FC = () => {
    const materials = getStorageMaterials();
    if (!materials) return <Navigate to={{pathname: '/'}}/>;
    return (
        <div className="page">
            <CabinetsMain materials={materials}/>
            <Sidebar />
        </div>
    );
};

export default Cabinets;