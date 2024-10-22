import React, {FC} from 'react';
import s from "../Product/product.module.sass";
import {CustomPart} from "../../helpers/productTypes";
import {useFormikContext} from "formik";

import {getSelectValfromVal} from "../../helpers/helpers";
import SelectField, {optionType} from "../../common/SelectField";
import {CustomPartFormValuesType} from "./CustomPart";


function prepareToSelectField(arr: string[]): optionType[] {
    return arr.map(el => ({
            value: el,
            label: el
        })
    )
}

const GlassDoorBlock: FC<{ product: CustomPart }> = ({product}) => {
    const {values} = useFormikContext<CustomPartFormValuesType>();
    const {glass_door} = product
    if (!glass_door) return <>Glass Door error</>
    const {
        glass_door: [profile, type, color]
    } = values
    const {
        Profile: door_profiles,
        ...door_types_obj
    } = glass_door;
    const door_types = Object.keys(door_types_obj);
    const door_colors:string[] = door_types_obj[`${type}` as keyof typeof door_types_obj] || [];


    const doorTypesPrepared = prepareToSelectField(door_types)
    const doorColorsPrepared = prepareToSelectField(door_colors)

    return (
        <div className={s.blockWrap}>
            {door_profiles?.length ?
                <div className={s.block}>
                    <h3>Door Profile</h3>
                    <SelectField label="Profile"
                                 name="glass_door[0]"
                                 val={getSelectValfromVal(profile, door_profiles)}
                                 options={door_profiles}/>
                </div> : null}

            {door_types.length ?
                <div className={s.block}>
                    <h3>Door Type</h3>
                    <SelectField label="Door Type" name="glass_door[1]"
                                 val={getSelectValfromVal(type, doorTypesPrepared)}
                                 options={doorTypesPrepared}/>
                </div> : null}

            {door_colors.length && type ?
                <div className={s.block}>
                    <h3>Door Color</h3>
                    <SelectField name="glass_door[2]"
                                 val={getSelectValfromVal(color, doorColorsPrepared)}
                                 options={doorColorsPrepared}
                                 label="Door Color"
                    />
                </div> : null}
        </div>
    );
};

export default GlassDoorBlock;