import React, {FC, useEffect} from 'react';
import s from "./product.module.sass";
import SelectField from "../../common/SelectField";
import {
    getAttributes,
    getColorsList,
    getSelectValfromVal
} from "../../helpers/helpers";
import {ProductOptionsInput} from "../../common/Form";
import {useFormikContext} from "formik";
import GlassDoorBlock from "../CustomPart/GlassDoorBlock";
import {attrItem, productValuesType} from "../../helpers/productTypes";

type OptionsBlockType = {
    id: number,
    filteredOptions: string[],
    isProductStandard: boolean,
    attributes: attrItem[]
}

const enableGlassDoorOption = (id: number, isProductStandard: boolean, width: number, height: number): boolean => {
    if (!isProductStandard) return true;
    switch (id) {
        case 101: {
            const standardHeight: boolean = [30, 36, 42].includes(height);
            if (!standardHeight) return false;
            return [12, 15, 18, 21, 24, 30, 36, 42].includes(width);
        }
        case 102:
        case 103: {
            const standardHeight: boolean = [30, 36, 42].includes(height);
            if (!standardHeight) return false;
            return [30, 36, 42].includes(width);
        }
        case 104:
        case 105:
        case 108: {
            const standardHeight: boolean = [12, 15, 18, 21].includes(height);
            if (!standardHeight) return false;
            return [30, 36].includes(width);
        }
        case 106:
        case 107: {
            const standardHeight: boolean = [12, 15, 18].includes(height);
            if (!standardHeight) return false;
            return [12, 15, 18, 24, 30, 36].includes(width);
        }
        case 111: {
            const standardHeight: boolean = [30, 36, 42].includes(height);
            if (!standardHeight) return false;
            return [27, 30, 33, 36].includes(width);
        }
    }
    return false
}

const enableGlassShelfOption = (attrs: { name: string, value: number }[]): boolean => {
    return !!attrs.find(el => el.name === 'Adjustable Shelf' && el.value >= 1);
}

const getFrontOptions = (filteredOptions: string[], isEnabledGlassDoorOption: boolean, isEnableGlassShelfOption: boolean): string[] => {
    let opt = [...filteredOptions];
    if (!isEnabledGlassDoorOption) opt = removeOptionFromOptions(opt, 'Glass Door');
    if (!isEnableGlassShelfOption) opt = removeOptionFromOptions(opt, 'Glass Shelf');
    return opt;
}

const removeOptionFromOptions = (options: string[], option: string): string[] => {
    return options.filter(el => el !== option)
}

const OptionsBlock: FC<OptionsBlockType> = ({
                                                id,
                                                filteredOptions,
                                                isProductStandard,
                                                attributes
                                            }) => {
    const {values, setFieldValue} = useFormikContext<productValuesType>();
    const {
        Options: chosenOptions,
        glass_door,
        ['Shelf Glass Color']: shelfGlassColor,
        Width: width,
        Height: height,
        image_active_number
    } = values;
    const attrs = getAttributes(attributes, image_active_number);
    const [, , glass_color] = glass_door
    const isEnabledGlassDoorOption = enableGlassDoorOption(id, isProductStandard, width, height);
    const isEnableGlassShelfOption = enableGlassShelfOption(attrs);
    const shelfGlassList = getColorsList('Glass');
    const filteredOptionsFront = getFrontOptions(filteredOptions, isEnabledGlassDoorOption, isEnableGlassShelfOption);
    useEffect(() => {
        if (!isEnabledGlassDoorOption) {
            glass_color && setFieldValue('Door Glass Color', '');
            chosenOptions.includes('Glass Door') && setFieldValue('Options', removeOptionFromOptions(chosenOptions, 'Glass Door'));
        }
        if (!isEnableGlassShelfOption) {
            shelfGlassColor && setFieldValue('Shelf Glass Color', '');
            chosenOptions.includes('Glass Shelf') && setFieldValue('Options', removeOptionFromOptions(chosenOptions, 'Glass Shelf'));
        }
    }, [width, height]);
    return (
        <>
            {filteredOptionsFront.length ?
                <div className={s.block}>
                    <h3>Options</h3>
                    <div className={s.options} role="group">
                        {filteredOptionsFront.map((w, index) => <ProductOptionsInput key={index} name={`Options`}
                                                                                     value={w}/>)}
                    </div>
                </div>
                : null}
            {chosenOptions.includes('Glass Door') &&
            <>
                {isProductStandard ?
                    <StandardCabinetGlassDoorBlock doorGlassColor={glass_color}/> :
                    <GlassDoorBlock glass_door={glass_door} is_custom={false}/>
                }
            </>}

            {chosenOptions.includes('Glass Shelf') &&
            <>
              <h3>Glass Shelf</h3>
              <div className={s.blockWrap}>
                <div className={s.block}>
                  <SelectField name="Shelf Glass Color"
                               val={getSelectValfromVal(shelfGlassColor, shelfGlassList)}
                               options={shelfGlassList}/>
                </div>
              </div>
            </>}
        </>
    );
};

export default OptionsBlock;


const StandardCabinetGlassDoorBlock: FC<{
    doorGlassColor: string
}> = ({doorGlassColor}) => {
    const door_colors = getColorsList('Glass');
    return (
        <div className={s.blockWrap}>
            <div className={s.block}>
                <h3>Glass Door</h3>
                <SelectField name="glass_door[2]"
                             val={getSelectValfromVal(doorGlassColor, door_colors)}
                             options={door_colors}
                             label="Door Color"
                />
            </div>
        </div>
    )
}
