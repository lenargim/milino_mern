import React, {FC} from "react";
import {attrItem, productTypings} from "../../helpers/productTypes";
import {getAttributes, pluralizeName} from "../../helpers/helpers";

export const ProductAttributes: FC<{ attributes: attrItem[], type: productTypings, doors_amount?:number }> = ({attributes, type, doors_amount}) => {
    const attrs = getAttributes(attributes, type);
    const oneOf: string[] = ['Door', 'Drawer', 'Rollout', 'Shelf', 'False Front', 'Hanging Rod', 'Hamper'];
    return (
        <div>
            {doors_amount ? <div>
                <span>Doors: </span>
                <span>{doors_amount}</span>
            </div>: null}
            {attrs.map((attr, index) => {
                let hasValue = !!attr.value;
                const name = attr.value > 1 ? pluralizeName(attr.name, oneOf) : attr.name;
                return (
                    <div key={index}>
                        {hasValue ? <>
                            <span>{name}: </span>
                            <span>{attr.value}</span>
                        </> : <span>{name}</span>
                        }
                    </div>
                )
            })}
        </div>
    )
}