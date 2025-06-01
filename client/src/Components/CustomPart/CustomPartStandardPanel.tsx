import React, {FC, useEffect} from 'react';
import {
    CustomPartType,
    pricePartStandardPanel,
    priceStandardPanel
} from "../../helpers/productTypes";
import standardProductsPrices from "../../api/standartProductsPrices.json";
import s from "../Product/product.module.sass";
import {TextInput} from "../../common/Form";
import {Form, useField, useFormikContext} from "formik";
import {CustomPartFormType} from "./CustomPart";
import {changeAmountType} from "../../helpers/cartTypes";
import {v4 as uuidv4} from "uuid";
import Select, {OnChangeValue} from "react-select";
import styles from "../../common/Form.module.sass";
import {customStyles, optionType} from "../../common/SelectField";
import {getdimensionsRow} from "../../helpers/helpers";
import settings from '../../api/settings.json'
import {RoomMaterialsFormType} from "../../helpers/roomTypes";

export type PanelsFormType = {
    standard_panel: PanelType[],
    shape_panel: PanelType[],
    wtk: PanelType[],
    crown_molding: number
}

export type PanelType = {
    _id: string,
    qty: number,
    name: string,
}

export type PanelsFormAPIType = {
    standard_panel: PanelAPIType[],
    shape_panel: PanelAPIType[],
    wtk: PanelAPIType[],
    crown_molding: number
}

export type PanelAPIType = Exclude<PanelType, '_id'>

type PanelTypeName = 'standard_panel' | 'shape_panel' | 'wtk';
type MoldingTypeName = 'crown_molding';

export const getStandardPanelsPrice = (standard_panels: PanelsFormType, is_price_type_default: boolean, apiPanelData: priceStandardPanel) => {
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


    const crown_molding_item_price:number = is_price_type_default ? settings.crown_molding_price[0] : settings.crown_molding_price[1]
    const crown_price = crown_molding_item_price*crown_molding;

    return standard_panel_price + shape_panel_price + wtk_price + crown_price;
}

const CustomPartStandardPanel: FC<{ product: CustomPartType, materials: RoomMaterialsFormType }> = ({product, materials}) => {
    const {values, setFieldValue, isSubmitting} = useFormikContext<CustomPartFormType>();
    const {price, standard_panels} = values;
    const {standard_panel, shape_panel, wtk, crown_molding} = standard_panels
    const {id} = product;
    const apiPanelData = standardProductsPrices.find(el => el.id === id) as priceStandardPanel;
    const {door_type, door_color} = materials
    const is_price_type_default = door_type === 'Standard White Shaker' && door_color === 'Default White';
    const addPanel = (panelType: PanelTypeName, panels: PanelType[]) => {
        setFieldValue(`standard_panels.${panelType}`, [...panels, {
            _id: uuidv4(),
            qty: 1,
            name: apiPanelData[panelType][0].name,
        }])
    };

    const addMolding = (moldingName:MoldingTypeName) => {
        setFieldValue(`standard_panels.${moldingName}`, 1)
    }

    useEffect(() => {
        const newPrice = getStandardPanelsPrice(standard_panels, is_price_type_default, apiPanelData)
        if (price !== newPrice) {
            setFieldValue('price', newPrice)
        }
    }, [values])
    return (
        <Form className={s.accessories}>
            <div className={s.block}>
                <h3>Panel</h3>
                {standard_panel.length
                    ? standard_panel.map((panel, index) => <PanelItem
                        key={panel._id}
                        panel={panel}
                        panel_type={'standard_panel'}
                        dropdown={apiPanelData.standard_panel}
                    />)
                    : null}
                <button type="button" className={['button yellow small'].join(' ')}
                        onClick={() => addPanel('standard_panel', standard_panel)}>+
                    Add Standard panel
                </button>
            </div>
            <div className={s.block}>
                <h3>L-Shape</h3>
                {shape_panel.length
                    ? shape_panel.map((panel, index) => <PanelItem
                        key={panel._id}
                        panel={panel}
                        panel_type={'shape_panel'}
                        dropdown={apiPanelData.shape_panel}
                    />)
                    : null}
                <button type="button" className={['button yellow small'].join(' ')}
                        onClick={() => addPanel('shape_panel', shape_panel)}>+
                    Add L-shape panel
                </button>
            </div>
            <div className={s.block}>
                <h3>WTK</h3>
                {wtk.length
                    ? wtk.map((panel, index) => <PanelItem
                        key={panel._id}
                        panel={panel}
                        panel_type={'wtk'}
                        dropdown={apiPanelData.wtk}
                    />)
                    : null}
                <button type="button" className={['button yellow small'].join(' ')}
                        onClick={() => addPanel('wtk', wtk)}>+
                    Add WTK
                </button>
            </div>
            <div className={s.block}>
                <h3>Crown Molding</h3>
                {crown_molding ?
                    <CrownMolding molding_type="crown_molding"/> :
                    <button type="button" className={['button yellow small'].join(' ')}
                            onClick={() => addMolding('crown_molding')}>+ Add Molding</button>}
            </div>

            <div className={s.block}>
                <TextInput type={"text"} label={'Note'} name="Note"/>
            </div>
            <div className={s.total}>
                <span>Total: </span>
                <span>{price}$</span>
            </div>
            <button type="submit" className={['button yellow'].join(' ')} disabled={isSubmitting}>Add to cart</button>
        </Form>
    );
};

export default CustomPartStandardPanel;

const PanelItem: FC<{ panel: PanelType, panel_type: PanelTypeName, dropdown: pricePartStandardPanel[] }> = ({
                                                                                                                panel,
                                                                                                                panel_type,
                                                                                                                dropdown
                                                                                                            }) => {
    const [{value}, _, {setValue}] = useField<PanelType[]>(`standard_panels.${panel_type}`)
    const {qty, _id, name} = panel;

    const item = dropdown.find(apiEL => apiEL.name === name);
    if (!item) return null;
    const dimensions = getdimensionsRow(item.width, item.height, item.depth);

    function getOptions(dropdown: pricePartStandardPanel[]): PanelType[] {
        return dropdown.map(el => ({
            name: el.name,
            qty, _id
        }))
    }

    const dropdownOptions = getOptions(dropdown)
    const deleteAlItem = (_id: string) => {
        const newArr = value.filter(profile => profile._id !== _id)
        setValue(newArr)
    };

    const changeAmount = (type: changeAmountType, _id: string) => {
        const newValue: PanelType[] = value.map(el => {
            if (_id === el._id) return {...el, qty: type === 'minus' ? panel.qty - 1 : panel.qty + 1}
            return el
        });
        setValue(newValue)
    }
    return (
        <div className={s.row}>
            <button onClick={() => deleteAlItem(_id)} className={s.close} type={"button"}>×</button>
            <SelectField label="Panel"
                         name={`standard_panels.${panel_type}`}
                         val={panel}
                         options={dropdownOptions}/>
            {dimensions}
            <div className={s.row}>×
                <div className={s.buttons}>
                    <button value="minus" disabled={qty <= 1} onClick={() => changeAmount('minus', _id)}
                            type={"button"}>-
                    </button>
                    {qty}
                    <button value="plus" onClick={() => changeAmount('plus', _id)} type={"button"}>+</button>
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
}
const SelectField: FC<SelectFieldType> = ({options, name, val, label = name,}) => {
    const [field, meta, {setValue}] = useField<PanelType[]>(name);
    const {error, touched} = meta;

    function onChange(value: OnChangeValue<optionType, false>) {
        const newValue: PanelType[] = field.value.map(el => {
            if (value && value.type === el._id) return {_id: el._id, qty: el.qty, name: value.value}
            return el
        });
        if (value) setValue(newValue);
    }

    return (
        <div
            className={[styles.row, styles.select, field.value && styles.active, error && touched ? 'error' : ''].join(' ')}>
            {touched && error ? <div className={styles.error}>{error}</div> : ''}

            <Select options={options.map(el => ({value: el.name, label: el.name, type: el._id}))}
                    onChange={onChange}
                    placeholder={label}
                    styles={customStyles}
                    isSearchable={false}
                    defaultValue={{value: val.name, label: val.name, type: val._id}}
                    value={{value: val.name, label: val.name, type: val._id}}
            />
        </div>
    )
};