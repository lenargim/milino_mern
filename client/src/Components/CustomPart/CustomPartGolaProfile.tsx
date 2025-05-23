import React, {FC} from "react";
import {useField} from "formik";
import {changeAmountType} from "../../helpers/cartTypes";
import s from "../Product/product.module.sass";
import {ProductInputCustom} from "../../common/Form";
import Select, {OnChangeValue, StylesConfig} from "react-select";
import styles from "../../common/Form.module.sass";

export type colorOption = 'Black' | 'White';

export type golaProfileType = {
    _id: string,
    length: number,
    color:  colorOption,
    qty: number,
}

export type golaProfileFormType = {
    _id: string,
    length: string,
    ['length Number']: number,
    color:  colorOption,
    qty: number,
}
const colorsArr:colorOption[] = ['Black', 'White']

const CustomPartGolaProfile: FC<{ profile: golaProfileFormType, index: number }> = ({profile, index}) => {
    const [{value}, , {setValue}] = useField<golaProfileType[]>('led_accessories.led_gola_profiles')
    const {qty, _id} = profile;

    const deleteItem = (_id: string) => {
        const newArr = value.filter(profile => profile._id !== _id)
        setValue(newArr)
    };
    const changeAmount = (type: changeAmountType) => {
        const profile = value[index];
        profile.qty = type === 'minus' ? profile.qty - 1 : profile.qty + 1;
        value.splice(index, 1, profile)
        setValue(value)

    }

    return (
        <div className={s.row}>
            <button onClick={() => deleteItem(_id)} className={s.close} type={"button"}>×</button>
            <ProductInputCustom label="Length"
                                name={`[led_accessories.led_gola_profiles].${index}.length`}/>
            <div className={s.row}>
                ×
                <div className={s.buttons}>
                    <button value="minus" disabled={qty <= 1} onClick={() => changeAmount('minus')}
                            type={"button"}>-
                    </button>
                    {qty}
                    <button value="plus" onClick={() => changeAmount('plus')} type={"button"}>+</button>
                </div>
                <ColorField options={colorsArr} name={`[led_accessories.led_gola_profiles].${index}.color`} />
            </div>
        </div>
    )
}

export default CustomPartGolaProfile


const ColorField:FC<{options:colorOption[], name:string}> = ({options, name}) => {
    const [field, meta, {setValue}] = useField(name);
    const {error, touched} = meta;

    type selectOption = {
        value: colorOption,
        label: string
    }

    const selectOptions = options.map(option => {
        return {
            value: option,
            label: `${option} color`
        }
    })


    const onChange = (value: OnChangeValue<selectOption, false>) => {
        if (value) setValue(value.value);
    };


    const customStyles: StylesConfig<selectOption, false> = {
        control: (styles, state) => ({
            position: 'relative',
            background: 'transparent',
            maxWidth: '300px',
            border: state.isFocused ? '2px solid #FFCE90' : '2px solid #000',
            borderRadius: '6px',
            font: '400 16px/20px Inter, sans-serif',
            transition: 'all .2s ease',
            display: 'grid',
            gridTemplateColumns: '1fr 25px',
            gap: '10px',
            margin: 0,
            ':hover': {
                borderColor: '#FFCE90'
            }
        }),

        container: (baseStyles) => ({
            ...baseStyles,
            maxWidth: '300px',
        }),
        indicatorsContainer: (base) => ({
            ...base,
            marginRight: '5px'
        }),
        dropdownIndicator: () => ({
            width: '20px',
            height: '20px',
        }),
        valueContainer: (baseStyles) => ({
            ...baseStyles,
            padding: '5.5px 10px'
        }),
        placeholder: (baseStyles) => ({
            ...baseStyles,
            cursor: "pointer"
        }),
        menu: () => ({
            borderRadius: '9px',
            boxShadow: '0px 59px 65px -8px rgba(48,36,20, 0.52182), 0px 30px 36px -7px rgba(29,24,14, 0.413297), 0px 10px 8px -7px rgba(0,0,0, 0)',
            backgroundColor: 'rgba(255,255,255, 1)',
            maxHeight: "300px",
            width: '100%',
            position: 'absolute',
            overflow: 'hidden',
            zIndex: 2,
        }),
        option: () => ({
            font: '400, 16px/20px Inter',
            padding: '5px 10px',
            color: 'black',
            cursor: 'pointer',
            transition: 'all .2s ease',
            ':hover': {
                backgroundColor: 'rgba(255,206,144, 1)',

            }
        }),


    }
    return (
        <div
            className={[styles.row, styles.select, field.value && styles.active, error && touched ? 'error' : ''].join(' ')}>
            {touched && error ? <div className={styles.error}>{error}</div> : ''}
            <Select options={selectOptions}
                    styles={customStyles}
                    onChange={onChange}
                    placeholder={'Color'}
                    isSearchable={false}
                    defaultValue={{value: field.value, label: `${field.value} color`}}
            />
        </div>
    )
}