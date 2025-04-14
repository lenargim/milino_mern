import React, {FC, useEffect} from 'react';
import s from "./product.module.sass";
import SelectField from "../../common/SelectField";
import {getSelectValfromVal, productValuesType} from "../../helpers/helpers";
import {ProductOptionsInput} from "../../common/Form";
import settings from "../../api/settings.json";
import {Field, useFormikContext} from "formik";

type OptionsBlockType = {
    id: number,
    filteredOptions: string[],
    isProductStandard: boolean
}

const glassSettings = settings['Glass'];
const {
    ['Profile']: profileSettings,
    ['Glass Type']: glassTypeSettings,
    ['Glass Color']: glassColorSettings,
} = glassSettings;

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
        case 105: {
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

const removeGlassDoorFromOptions = (options: string[]): string[] => {
    return options.splice(options.indexOf('Glass Door'), 1);
}

const OptionsBlock: FC<OptionsBlockType> = ({
                                                id,
                                                filteredOptions,
                                                isProductStandard
                                            }) => {
    const {values, setFieldValue} = useFormikContext<productValuesType>();
    const {
        Options: chosenOptions,
        ['Door Profile']: doorProfile,
        ['Door Glass Type']: doorGlassType,
        ['Door Glass Color']: doorGlassColor,
        ['Shelf Glass Color']: shelfGlassColor,
        Width: width,
        Height: height
    } = values;
    const glassShelfColorFiltered = glassColorSettings.filter(el => el.type === 'Glass');
    const isEnabledGlassDoorOption = enableGlassDoorOption(id, isProductStandard, width, height);
    const filteredOptionsFront = isEnabledGlassDoorOption ? filteredOptions : removeGlassDoorFromOptions(filteredOptions);
    useEffect(() => {
        if (!isEnabledGlassDoorOption) {
            setFieldValue('Options', removeGlassDoorFromOptions(filteredOptions));
            setFieldValue('Door Glass Color', '');
        }
    }, [width, height])
    return (
        <>
            {filteredOptionsFront.length
                ? <div className={s.block}>
                    <h3>Options</h3>
                    <div className={s.options} role="group">
                        {filteredOptionsFront.map((w, index) => <ProductOptionsInput key={index} name={`Options`}
                                                                                     value={w}/>)}
                    </div>
                </div> : null
            }
            {chosenOptions.includes('Glass Door') &&
            <>
              <h3>Glass Door</h3>
              <div className={s.blockWrap}>
                  {isProductStandard
                      ? <StandardCabinetGlassDoorBlock doorGlassColor={doorGlassColor}/>
                      : <CabinetGlassDoorBlock doorGlassColor={doorGlassColor} doorGlassType={doorGlassType}
                                               doorProfile={doorProfile}/>
                  }
              </div>
            </>}

            {chosenOptions.includes('Glass Shelf') &&
            <>
              <h3>Glass Shelf</h3>
              <div className={s.blockWrap}>
                {/*<div className={s.block}>*/}
                {/*  <SelectField name="Shelf Profile"*/}
                {/*               val={getSelectValfromVal(shelfProfile, profileSettings)}*/}
                {/*               options={profileSettings}/>*/}
                {/*</div>*/}
                {/*<div className={s.block}>*/}
                {/*  <SelectField name="Shelf Glass Type"*/}
                {/*               val={getSelectValfromVal(shelfGlassType, glassTypeSettings)}*/}
                {/*               options={glassTypeSettings}/>*/}
                {/*</div>*/}
                <div className={s.block}>
                  <SelectField name="Shelf Glass Color"
                               val={getSelectValfromVal(shelfGlassColor, glassShelfColorFiltered)}
                               options={glassShelfColorFiltered}/>
                </div>
              </div>
            </>}
        </>
    );
};

export default OptionsBlock;

const CabinetGlassDoorBlock: FC<{
    doorProfile: string,
    doorGlassType: string,
    doorGlassColor: string
}> = ({doorProfile, doorGlassType, doorGlassColor}) => {
    const glassDoorColorFiltered = glassColorSettings.filter(el => el.type === doorGlassType);
    return (
        <>
            <div className={s.block}>
                <SelectField name="Door Profile" val={getSelectValfromVal(doorProfile, profileSettings)}
                             options={profileSettings}/>
            </div>
            <div className={s.block}>
                <SelectField name="Door Glass Type"
                             val={getSelectValfromVal(doorGlassType, glassTypeSettings)}
                             options={glassTypeSettings}/>
            </div>
            <div className={s.block}>
                <SelectField name="Door Glass Color"
                             val={getSelectValfromVal(doorGlassColor, glassDoorColorFiltered)}
                             options={glassDoorColorFiltered}/>
            </div>
        </>
    )
}


const StandardCabinetGlassDoorBlock: FC<{
    doorGlassColor: string
}> = ({doorGlassColor}) => {
    const doorGlassType = "Glass";
    const glassDoorColorFiltered = glassColorSettings.filter(el => el.type === doorGlassType);
    return (
        <>
            <div className={s.block}>
                <SelectField name="Door Glass Color"
                             val={getSelectValfromVal(doorGlassColor, glassDoorColorFiltered)}
                             options={glassDoorColorFiltered}/>
            </div>
        </>
    )
}
