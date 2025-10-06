import React, {FC, useEffect} from 'react';
import Select, {OnChangeValue, StylesConfig} from "react-select";
import {useField} from "formik";
import styles from "./Form.module.sass";
import {MaybeNull} from "../helpers/productTypes";

export type optionType = {
    value: string,
    label: string,
    type?: string
}

export type optionTypeDoor = {
    value: string,
    label: string,
    width: number,
    height: number
}

type SelectFieldType = {
    options: optionType[],
    name: string,
    val: MaybeNull<optionType>
    label?: string,
}


export const customStyles: StylesConfig<optionType, false> = {
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

const SelectField: FC<SelectFieldType> = ({options, name, val, label = name}) => {
    const [field, meta, {setValue}] = useField(name);
    const {error, touched} = meta;

    function onChange(value: OnChangeValue<optionType, false>) {
        if (value) setValue(value.value);
    }

    useEffect(() => {
        if (field.value && !val) {
            setValue('')
        }
    }, [val, setValue, field.value]);
    return (
        <div
            className={[styles.row, styles.select, field.value && styles.active, error && touched ? 'error' : ''].join(' ')}>
            {error && touched ? <div className={styles.error}>{error}</div> : ''}
            <Select options={options}
                    onChange={onChange}
                    placeholder={label}
                    styles={customStyles}
                    isSearchable={false}
                    defaultValue={val}
                    value={val}
            />
        </div>
    )
};

export default SelectField;
