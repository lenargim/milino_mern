import React, {FC} from 'react';
import {extraStandardPricesType, MaybeUndefined} from "../../helpers/productTypes";
import {AttributesPrices, coefType} from "../../helpers/calculatePrice";


type TestType = {
    coef: coefType,
    attributesPrices: AttributesPrices,
    boxMaterialCoef: number,
    grain_coef:number,
    finish_coef:number,
    premium_coef: number,
    base_price_type: 1|2|3,
    tablePrice: MaybeUndefined<number>
}

const Test: FC<TestType> = ({coef, attributesPrices, boxMaterialCoef, premium_coef, tablePrice, finish_coef, grain_coef, base_price_type}) => {
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
            <div>Finish Material coef: {finish_coef}</div>
            <div>Grain coef: {grain_coef}</div>
            <div>Premium coef: {premium_coef}</div>
            <div>Price column: {base_price_type}</div>
            <div>Table Price: {tablePrice}</div>
        </div>
    );
};

export default Test;