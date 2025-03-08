import React, {FC, useEffect} from 'react';
import {CustomPartType, pricePartStandardPanel, priceStandardPanel} from "../../helpers/productTypes";
import {MaterialsFormType} from "../../common/MaterialsForm";
import standardProductsPrices from "../../api/standartProductsPrices.json";
import s from "../Product/product.module.sass";
import {TextInput} from "../../common/Form";
import {Form, useField, useFormikContext} from "formik";
import {CustomPartFormValuesType} from "./CustomPart";
import {changeAmountType} from "../OrderForm/Sidebar/Sidebar";
import {v4 as uuidv4} from "uuid";
import Select, {OnChangeValue} from "react-select";
import styles from "../../common/Form.module.sass";
import {customStyles, optionType} from "../../common/SelectField";
import {getDimentionsRow} from "../../helpers/helpers";

export type PanelsFormType = {
    standard_panel: PanelType[],
    shape_panel: PanelType[],
    wtk: PanelType[]
}

export type PanelType = {
    _id: string,
    qty: number,
    name: string,
}

type PanelTypeName = 'standard_panel' | 'shape_panel' | 'wtk';

export const getStandardPanelsPrice = (standard_panels:PanelsFormType,is_price_type_default:boolean,apiPanelData:priceStandardPanel) => {
    const {standard_panel, shape_panel, wtk} = standard_panels;
    const standard_panel_price = standard_panel.reduce((acc, panel) => {
        const panelPriceData = apiPanelData.standard_panel.find(el => el.name === panel.name);
        if (!panelPriceData) return 0;
        return acc + ((is_price_type_default? panelPriceData.price: panelPriceData.painted_price)* panel.qty)
    }, 0);

    const shape_panel_price = shape_panel.reduce((acc, panel) => {
        const panelPriceData = apiPanelData.shape_panel.find(el => el.name === panel.name);
        if (!panelPriceData) return 0;
        return acc + ((is_price_type_default? panelPriceData.price: panelPriceData.painted_price)* panel.qty)
    }, 0);

    const wtk_price = wtk.reduce((acc, panel) => {
        const panelPriceData = apiPanelData.wtk.find(el => el.name === panel.name);
        if (!panelPriceData) return 0;
        return acc + ((is_price_type_default? panelPriceData.price: panelPriceData.painted_price)* panel.qty)
    }, 0);

    return standard_panel_price + shape_panel_price + wtk_price;
}

const StandardPanel: FC<{ product: CustomPartType, materials: MaterialsFormType }> = ({product, materials}) => {
    const {values, setFieldValue} = useFormikContext<CustomPartFormValuesType>();
    const {price, standard_panels} = values;
    const {standard_panel, shape_panel, wtk} = standard_panels
    const {id} = product;
    const apiPanelData = standardProductsPrices.find(el => el.id === id) as priceStandardPanel;
    const {door_type, door_color} = materials
    const is_price_type_default = door_type === 'Standard White Shaker' && door_color === 'Default White';
    const addPanel = (panelType: PanelTypeName, panels:PanelType[]) => {
        setFieldValue(`standard_panels.${panelType}`, [...panels, {
            _id: uuidv4(),
            qty: 1,
            name: apiPanelData[panelType][0].name,
        }])
    }

    useEffect(() => {
        const newPrice = getStandardPanelsPrice(standard_panels,is_price_type_default,apiPanelData)
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
                        onClick={() => addPanel('standard_panel',standard_panel)}>+
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
                        onClick={() => addPanel('shape_panel',shape_panel)}>+
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
                        onClick={() => addPanel('wtk',wtk)}>+
                    Add WTK
                </button>
            </div>
            <div className={s.block}>
                <TextInput type={"text"} label={'Note'} name="Note"/>
            </div>
            <div className={s.total}>
                <span>Total: </span>
                <span>{price}$</span>
            </div>
            <button type="submit" className={['button yellow'].join(' ')}>Add to Cart</button>
        </Form>
    );
};

export default StandardPanel;

const PanelItem: FC<{ panel: PanelType, panel_type: PanelTypeName, dropdown:pricePartStandardPanel[] }> = ({panel, panel_type,dropdown}) => {
    const [{value}, , {setValue}] = useField<PanelType[]>(`standard_panels.${panel_type}`)
    const {qty, _id, name} = panel;

    const item = dropdown.find(apiEL => apiEL.name === name);
    if (!item) return null;
    const dimentions = getDimentionsRow(item.width, item.height, item.depth);
    function getOptions(dropdown:pricePartStandardPanel[]):PanelType[] {
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

    const changeAmount = (type: changeAmountType, _id:string) => {
        const newValue:PanelType[] = value.map(el => {
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
            {dimentions}
            <div className={s.row}>×
                <div className={s.buttons}>
                    <button value="minus" disabled={qty <= 1} onClick={() => changeAmount('minus',_id)}
                            type={"button"}>-
                    </button>
                    {qty}
                    <button value="plus" onClick={() => changeAmount('plus',_id)} type={"button"}>+</button>
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
const SelectField: FC<SelectFieldType> = ({options, name, val, label = name, }) => {
    const [field, meta, {setValue}] = useField<PanelType[]>(name);
    const {error, touched} = meta;
    function onChange (value: OnChangeValue<optionType, false>) {
        const newValue:PanelType[] = field.value.map(el => {
            if (value && value.type === el._id) return {_id: el._id, qty: el.qty, name: value.value}
            return el
        });
        if (value) setValue(newValue);
    }

    return (
        <div
            className={[styles.row, styles.select, field.value && styles.active, error && touched ? 'error' : ''].join(' ')}>
            {touched && error ? <div className={styles.error}>{error}</div> : ''}

            <Select options={options.map(el => ({value: el.name, label: el.name, type: el._id}) )}
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