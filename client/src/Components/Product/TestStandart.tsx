import React, {FC} from 'react';
import {extraStandardPricesType, MaybeUndefined} from "../../helpers/productTypes";
import {AttributesPrices, coefType} from "../../helpers/calculatePrice";


type TestType = {
    coef: coefType,
    attributesPrices: AttributesPrices,
    boxMaterialCoef: number,
    premium_coef: number,
    tablePrice: MaybeUndefined<number>
}

const Test: FC<TestType> = ({coef, attributesPrices, boxMaterialCoef, premium_coef, tablePrice}) => {
    return (
        <div style={{marginTop: '30px'}}>
            <h3>Extra prices</h3>
            {
                Object.entries(attributesPrices).map((el, index) => <div key={index}>{el[0]}: {el[1]}</div>)

            }
            <h3>Size coefs</h3>
            {
                Object.entries(coef).map((el, index) => <div key={index}>{el[0]}: {el[1]}</div>)

            }
            <h3>Material coefs</h3>
            <div>Box material coef: {boxMaterialCoef}</div>
            <div>Premium coef: {premium_coef}</div>
            <div>Table Price: {tablePrice}</div>
        </div>
    );
};

export default Test;