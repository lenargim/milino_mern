import React, {FC} from "react";
import {attrItem, productTypings} from "../../helpers/productTypes";
import {getAttributes} from "../../helpers/helpers";

export const ProductAttributes: FC<{ attributes: attrItem[], type: productTypings }> = ({attributes, type}) => {
    const attrs = getAttributes(attributes, type);
    return (
        <div>
            {attrs.map((attr, index) => {
                let hasValue = !!attr.value;
                const isMultiple = attr.value > 1;
                const oneOf = ['Door', 'Drawer', 'Rollout', 'Shelf', 'Front'];
                let name = attr.name;
                if (name === 'Adjustable Shelf' && attr.value === 0) return null;
                if (isMultiple) {
                    const isNameExist = name.split(' ').find(el => oneOf.includes(el));
                    if (isNameExist) name = name + 's';
                }
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