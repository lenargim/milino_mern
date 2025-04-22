import React, {FC} from 'react';
import s from "../Product/product.module.sass";
import {
    getColorsList,
    getGlassTypeList,
    getProfileList,
    getSelectValfromVal
} from "../../helpers/helpers";
import SelectField from "../../common/SelectField";

const GlassDoorBlock: FC<{ is_custom: boolean, glass_door: string[] }> = ({is_custom, glass_door}) => {
    const [profile, type, color] = glass_door;
    const door_profiles = getProfileList(is_custom);
    const door_types = getGlassTypeList();
    const door_colors = getColorsList(type);

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

            {door_types.length && profile ?
                <div className={s.block}>
                    <h3>Door Type</h3>
                    <SelectField val={getSelectValfromVal(type, door_types)}
                                 label="Door Type"
                                 name="glass_door[1]"
                                 options={door_types}/>
                </div> : null}

            {door_colors.length && type ?
                <div className={s.block}>
                    <h3>Door Color</h3>
                    <SelectField name="glass_door[2]"
                                 val={getSelectValfromVal(color, door_colors)}
                                 options={door_colors}
                                 label="Door Color"
                    />
                </div>
                : null}
        </div>
    );
};

export default GlassDoorBlock;