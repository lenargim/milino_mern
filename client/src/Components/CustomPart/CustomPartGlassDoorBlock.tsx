import React, {FC} from 'react';
import s from "../Product/product.module.sass";
import {
    getColorsList,
    getGlassTypeList,
    getProfileList,
    getSelectValfromVal, glassDoorHasProfile
} from "../../helpers/helpers";
import SelectField from "../../common/SelectField";

const CustomPartGlassDoorBlock: FC<{ is_custom: boolean, glass_door: string[], product_id: number }> = ({
                                                                                                            is_custom,
                                                                                                            glass_door,
                                                                                                            product_id
                                                                                                        }) => {
    const [profile, type, color] = glass_door;
    const door_profiles = getProfileList(is_custom);
    const door_types = getGlassTypeList();
    const door_colors = getColorsList(type);

    const showProfileSelection = glassDoorHasProfile(product_id);
    const showDoorTypeSelection = door_types.length && ((showProfileSelection && profile) || !showProfileSelection);
    const showDorColorSelection = door_colors.length && type

    return (
        <div className={s.blockWrap}>
            {showProfileSelection ?
                <div className={s.block}>
                    <h3>Door Profile</h3>
                    <SelectField label="Profile"
                                 name="glass_door[0]"
                                 val={getSelectValfromVal(profile, door_profiles)}
                                 options={door_profiles}
                    />
                </div> : null}

            {showDoorTypeSelection ?
                <div className={s.block}>
                    <h3>Door Type</h3>
                    <SelectField val={getSelectValfromVal(type, door_types)}
                                 label="Door Type"
                                 name="glass_door[1]"
                                 options={door_types}/>
                </div> : null}

            {showDorColorSelection ?
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

export default CustomPartGlassDoorBlock;