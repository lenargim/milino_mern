import React, {FC, useEffect} from 'react';
import {
    CustomPartType, MaybeNull,
    pricePartStandardPanel,
    priceStandardPanel
} from "../../helpers/productTypes";
import standardProductsPrices from "../../api/standartProductsPrices.json";
import s from "../Product/product.module.sass";
import {TextInput} from "../../common/Form";
import {FieldArray, Form, useField, useFormikContext} from "formik";
import {CustomPartFormType} from "./CustomPart";
import {changeAmountType} from "../../helpers/cartTypes";
import Select, {OnChangeValue} from "react-select";
import styles from "../../common/Form.module.sass";
import {customStyles, optionType} from "../../common/SelectField";
import {getdimensionsRow} from "../../helpers/helpers";
import settings from '../../api/settings.json'
import {RoomMaterialsFormType} from "../../helpers/roomTypes";
import CustomPartSubmit from "./CustomPartSubmit";

export type PanelsFormType = {
    standard_panel: PanelType[],
    shape_panel: PanelType[],
    wtk: PanelType[],
    crown_molding: number
}

export type PanelType = {
    qty: number,
    name: string,
}

export type PanelsFormAPIType = {
    standard_panel: PanelType[],
    shape_panel: PanelType[],
    wtk: PanelType[],
    crown_molding: number
}

type PanelTypeName = 'standard_panel' | 'shape_panel' | 'wtk';
type MoldingTypeName = 'crown_molding';

export const getStandardPanelsPrice = (standard_panels: MaybeNull<PanelsFormType>, is_price_type_default: boolean, apiPanelData: priceStandardPanel): number => {
    if (!standard_panels) return 0;
    const {standard_panel, shape_panel, wtk, crown_molding} = standard_panels;
    const standard_panel_price = standard_panel.reduce((acc, panel) => {
        const panelPriceData = apiPanelData.standard_panel.find(el => el.name === panel.name);
        if (!panelPriceData) return 0;
        return acc + ((is_price_type_default ? panelPriceData.price : panelPriceData.painted_price) * panel.qty)
    }, 0);

    const shape_panel_price = shape_panel.reduce((acc, panel) => {
        const panelPriceData = apiPanelData.shape_panel.find(el => el.name === panel.name);
        if (!panelPriceData) return 0;
        return acc + ((is_price_type_default ? panelPriceData.price : panelPriceData.painted_price) * panel.qty)
    }, 0);

    const wtk_price = wtk.reduce((acc, panel) => {
        const panelPriceData = apiPanelData.wtk.find(el => el.name === panel.name);
        if (!panelPriceData) return 0;
        return acc + ((is_price_type_default ? panelPriceData.price : panelPriceData.painted_price) * panel.qty)
    }, 0);


    const crown_molding_item_price: number = is_price_type_default ? settings.crown_molding_price[0] : settings.crown_molding_price[1]
    const crown_price = crown_molding_item_price * crown_molding;

    return standard_panel_price + shape_panel_price + wtk_price + crown_price;
}

export const initialStandardPanels: PanelsFormType = {
    standard_panel: [],
    shape_panel: [],
    wtk: [],
    crown_molding: 0
}

const CustomPartStandardPanel: FC<{ product: CustomPartType, materials: RoomMaterialsFormType }> = ({
                                                                                                        product,
                                                                                                        materials
                                                                                                    }) => {
    const {values, setFieldValue} = useFormikContext<CustomPartFormType>();
    const {price, standard_panels} = values;

    useEffect(() => {
        if (!standard_panels) setFieldValue('standard_panels', initialStandardPanels);
    }, [standard_panels])

    useEffect(() => {
        const newPrice = getStandardPanelsPrice(standard_panels, is_price_type_default, apiPanelData)
        if (price !== newPrice) {
            setFieldValue('price', newPrice)
        }
    }, [standard_panels])

    if (!standard_panels) return null;
    const {standard_panel, shape_panel, wtk, crown_molding} = standard_panels
    const {id} = product;
    const apiPanelData = standardProductsPrices.find(el => el.id === id) as priceStandardPanel;
    const {door_type, door_color} = materials
    const is_price_type_default = door_type === 'Standard Size White Shaker' && door_color === 'Default White';

    const addMolding = (moldingName: MoldingTypeName) => {
        setFieldValue(`standard_panels.${moldingName}`, 1)
    }
    return (
        <Form className={s.accessories}>
            <div className={s.block}>
                <h3>Panel</h3>
                <FieldArray name="standard_panels.standard_panel" render={({push, remove}) => (
                    <div>
                        {standard_panel.length
                            ? standard_panel.map((panel, index) => <PanelItem
                                panel_type="standard_panel"
                                key={index}
                                index={index}
                                remove={remove}
                                panel={panel}
                                dropdown={apiPanelData.standard_panel}
                            />)
                            : null}
                        <button type="button" className={['button yellow small'].join(' ')}
                                onClick={() => push({
                                    qty: 1, name: apiPanelData["standard_panel"][0].name,
                                })}
                        >+
                            Add Standard panel
                        </button>
                    </div>
                )}
                />


            </div>
            <div className={s.block}>
                <h3>L-Shape</h3>
                <FieldArray name="standard_panels.shape_panel" render={({push, remove}) => (
                    <div>
                        {shape_panel.length
                            ? shape_panel.map((panel, index) => <PanelItem
                                panel_type="shape_panel"
                                key={index}
                                index={index}
                                remove={remove}
                                panel={panel}
                                dropdown={apiPanelData.shape_panel}
                            />)
                            : null}
                        <button type="button" className={['button yellow small'].join(' ')}
                                onClick={() => push({
                                    qty: 1, name: apiPanelData["shape_panel"][0].name,
                                })}
                        >+
                            Add Standard panel
                        </button>
                    </div>
                )}
                />
            </div>
            <div className={s.block}>
                <h3>WTK</h3>
                <FieldArray name="standard_panels.wtk" render={({push, remove}) => (
                    <div>
                        {wtk.length
                            ? wtk.map((panel, index) => <PanelItem
                                panel_type="wtk"
                                key={index}
                                index={index}
                                remove={remove}
                                panel={panel}
                                dropdown={apiPanelData.wtk}
                            />)
                            : null}
                        <button type="button" className={['button yellow small'].join(' ')}
                                onClick={() => push({
                                    qty: 1, name: apiPanelData["wtk"][0].name,
                                })}
                        >+
                            Add Standard panel
                        </button>
                    </div>
                )}
                />
            </div>
            <div className={s.block}>
                <h3>Crown Molding</h3>
                {crown_molding ?
                    <CrownMolding molding_type="crown_molding"/> :
                    <button type="button" className={['button yellow small'].join(' ')}
                            onClick={() => addMolding('crown_molding')}>+ Add Molding</button>}
            </div>

            <div className={s.block}>
                <TextInput type={"text"} label={'Note'} name="note"/>
            </div>
            <div className={s.total}>
                <span>Total: </span>
                <span>{price}$</span>
            </div>
            <CustomPartSubmit />
        </Form>
    );
};

export default CustomPartStandardPanel;

const PanelItem: FC<{ index: number, remove: Function, panel: PanelType, dropdown: pricePartStandardPanel[], panel_type: PanelTypeName }> = ({
                                                                                                                                                 index,
                                                                                                                                                 remove,
                                                                                                                                                 panel,
                                                                                                                                                 dropdown,
                                                                                                                                                 panel_type
                                                                                                                                             }) => {
    const [{value}, _, {setValue}] = useField<PanelType[]>(`standard_panels.${panel_type}`)
    const {qty, name} = panel;

    const item = dropdown.find(apiEL => apiEL.name === name);
    if (!item) return null;
    const dimensions = getdimensionsRow(item.width, item.height, item.depth);

    function getOptions(dropdown: pricePartStandardPanel[]): PanelType[] {
        return dropdown.map(el => ({name: el.name, qty}))
    }

    const dropdownOptions = getOptions(dropdown)

    const changeAmount = (type: changeAmountType) => {
        const panel = value[index];
        panel.qty = type === 'minus' ? panel.qty - 1 : panel.qty + 1
        setValue(value, true)
    }
    return (
        <div className={s.row}>
            <button onClick={() => remove(index)} className={s.close} type={"button"}>×</button>
            <SelectField label="Panel"
                         index={index}
                         name={`standard_panels.${panel_type}`}
                         val={panel}
                         options={dropdownOptions}/>
            {dimensions}
            <div className={s.row}>×
                <div className={s.buttons}>
                    <button value="minus" disabled={qty <= 1} onClick={() => changeAmount('minus')}
                            type={"button"}>-
                    </button>
                    {qty}
                    <button value="plus" onClick={() => changeAmount('plus')} type={"button"}>+</button>
                </div>
            </div>
        </div>
    )
}


const CrownMolding: FC<{ molding_type: MoldingTypeName }> = ({molding_type}) => {
    const [{value}, _, {setValue}] = useField<number>(`standard_panels.${molding_type}`)

    const changeAmount = (type: changeAmountType) => {
        setValue(type === 'minus' ? value - 1 : value + 1)
    }

    return (
        <div className={s.row}>
            <button onClick={() => setValue(0)} className={s.close} type={"button"}>×</button>
            <span>Crown Molding</span>
            <div className={s.row}>×
                <div className={s.buttons}>
                    <button value="minus" disabled={value <= 1} onClick={() => changeAmount('minus')}
                            type={"button"}>-
                    </button>
                    {value}
                    <button value="plus" onClick={() => changeAmount('plus')} type={"button"}>+</button>
                </div>
            </div>
        </div>
    )
}

type SelectFieldType = {
    label: string,
    name: string,
    val: PanelType,
    options: PanelType[]
    index: number
}
const SelectField: FC<SelectFieldType> = ({options, name, val, label = name, index}) => {
    const [{value}, meta, {setValue}] = useField<PanelType[]>(name);
    const {error, touched} = meta;

    function onChange(newVal: OnChangeValue<optionType, false>) {
        if (!newVal) return;
        const newArr = value.map((el, i) => {
            if (index !== i) return el;
            return {qty: value[index].qty, name: newVal.value};
        })
        setValue(newArr);
    }

    return (
        <div
            className={[styles.row, styles.select, value && styles.active, error && touched ? 'error' : ''].join(' ')}>
            {touched && error ? <div className={styles.error}>{error}</div> : ''}

            <Select options={options.map(el => ({value: el.name, label: el.name}))}
                    onChange={onChange}
                    placeholder={label}
                    styles={customStyles}
                    isSearchable={false}
                    defaultValue={{value: val.name, label: val.name}}
                    value={{value: val.name, label: val.name}}
            />
        </div>
    )
};