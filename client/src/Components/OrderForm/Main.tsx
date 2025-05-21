import React, {FC} from 'react';
import MaterialsForm, {MaterialsFormType} from "../../common/MaterialsForm";
import {useFormikContext} from "formik";
import Header from "../../common/Header/Header";
import {useAppSelector} from "../../helpers/helpers";
import {CartItemFrontType} from "../../api/apiFunctions";

const Main:FC = () => {
    const {resetForm} = useFormikContext<MaterialsFormType>();
    const cart = useAppSelector<CartItemFrontType[]>(state => state.general.cart)
    return (
        <main id="main" className="main">
            <div className="container">
            <Header resetForm={resetForm}/>
            <h1 className="h1" id="anchor">ORDER FORM</h1>
            <MaterialsForm cart={cart} button={'Submit'}/>
            </div>
        </main>

    );
};

export default Main;