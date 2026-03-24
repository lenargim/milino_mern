import React, {FC, useEffect, useState} from "react";
import styles from './Form.module.sass'
import {useField, ErrorMessage, Field, FieldArray, FieldArrayRenderProps} from "formik";
import CheckSvg from "../assets/img/CheckSvg";
import noImg from "../assets/img/noPhoto.png"
import Input from 'react-phone-number-input/input'
import {getFraction, getVariableType} from "../helpers/helpers";
import {numericQuantity} from 'numeric-quantity';
import EyeOff from "../assets/img/Eye-Off";
import EyeOn from "../assets/img/Eye-on";
import NestedErrorMessage from "./ErrorForNestedFields";
import {MaybeUndefined} from "../helpers/productTypes";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import {addMonths, addWeeks} from 'date-fns';
import s from "../Components/Profile/profile.module.sass";

export function handleFocus(input: HTMLInputElement): void {
    input.classList.add(`${styles.focused}`);
}

export function handleBlur(input: HTMLInputElement, setTouched: (state: boolean) => void) {
    setTouched(true)
    if (input.value === '') input.classList.remove(`${styles.focused}`);
}

interface InputInterface {
    className?: string,
    name: string,
}

interface textInputInterface extends InputInterface {
    disabled?: boolean,
    type: 'text' | 'number' | 'email' | 'date',
    label: string,

    [x: string]: any;
}


interface PasswordInputInterface extends InputInterface {
    type: 'text' | 'password',
    label: string,

    [x: string]: any;
}

interface RadioInterface extends InputInterface {
    img?: string,
    value: string | number,
    checked?: boolean,
    label?: string,
    outOfStock?: boolean
}

interface ProductRadioInterface extends InputInterface {
    value: string,
}

interface ProductRadioInterfaceNumber extends InputInterface {
    value: number,
}

interface ProductDimensionRadioCustomInterface extends InputInterface {
    value: null | number,
    nullable?: boolean,
    label?: string
}

interface ProductOptionsRadioInterface extends InputInterface {
    value: string,
}

export const TextInput: FC<textInputInterface> = ({
                                                      className = '',
                                                      name,
                                                      label,
                                                      disabled = false,
                                                      type = 'text',
                                                      ...props
                                                  }) => {
    const [field, meta, helpers] = useField(name);
    const {error, touched} = meta;
    const length = field?.value?.length ?? 0;

    return (
        <div className={[styles.row, error && touched ? 'error' : null, className].join(' ')}>
            <Field
                {...props}
                className={[styles.input, length ? `${styles.focused}` : null, error && touched ? styles.inputError : null,].join(' ')}
                type={type}
                name={name}
                id={name}
                disabled={disabled}
                onFocus={(e: any) => handleFocus(e.target)}
                onBlur={(e: any) => handleBlur(e.target, helpers.setTouched)}
            />
            <label className={styles.label} htmlFor={name}>{label}</label>
            <ErrorMessage name={name} component="div" className={styles.error}/>
        </div>
    );
};


export const PasswordInput: FC<PasswordInputInterface> = ({
                                                              className = '',
                                                              name,
                                                              label,
                                                              ...props
                                                          }) => {
    const [field, meta, helpers] = useField(name);
    const {error, touched} = meta;
    const length = field?.value?.length ?? 0;
    const [eyeIsOn, setEyeIsOn] = useState<boolean>(true)

    function handleChange() {
        setEyeIsOn(!eyeIsOn);
    }

    return (
        <div className={[styles.row, error && touched ? 'error' : null, className].join(' ')}>
            {<button tabIndex={-1} type="button" onClick={handleChange} className={styles.eye}>{eyeIsOn ? <EyeOff/> :
                <EyeOn/>}</button>}
            <Field
                {...props}
                className={[styles.input, length ? `${styles.focused}` : null, error && touched ? styles.inputError : null,].join(' ')}
                type={eyeIsOn ? 'password' : 'text'}
                name={name}
                id={name}
                onFocus={(e: any) => handleFocus(e.target)}
                onBlur={(e: any) => handleBlur(e.target, helpers.setTouched)}
            />
            <label className={styles.label} htmlFor={name}>{label}</label>
            <ErrorMessage name={name} component="div" className={styles.error}/>
        </div>
    );
};

export const PhoneInput: FC<textInputInterface> = ({
                                                       className = '',
                                                       name,
                                                       label,
                                                       disabled = false,
                                                       type = 'text',
                                                   }) => {
    const [field, meta, helpers] = useField(name);
    const {error, touched} = meta;
    const length = field?.value?.length ?? 0;

    return (
        <div className={[styles.row, error && touched ? 'error' : null, className].join(' ')}>
            <Field name={name}>
                {() => <Input
                    // international={false}
                    countryselectprops={{unicodeFlags: false}}
                    country="US"
                    onChange={(value) => {
                        helpers.setValue(value);
                        helpers.setTouched(true);
                    }}
                    value={field.value}
                    className={[styles.input, length ? `${styles.focused}` : null, error && touched ? styles.inputError : null,].join(' ')}
                    type={type}
                    id={name}
                    disabled={disabled}
                    onFocus={(e: any) => handleFocus(e.target)}
                    onBlur={(e: any) => handleBlur(e.target, helpers.setTouched)}
                />}

            </Field>
            <label className={styles.label} htmlFor={name}>{label}</label>
            <ErrorMessage name={name} component="div" className={styles.error}/>
        </div>
    );
};

export const RadioInput: FC<RadioInterface> = ({
                                                   name,
                                                   value,
                                                   className,
                                                   img = noImg,
                                                   checked = false,
                                                   outOfStock,
                                                   label
                                               }) => {
    const [field] = useField(name)
    return (
        <div className={[className, styles.checkboxSelect].join(' ')}>
            <Field type="radio" checked={checked} name={name} value={value} id={`${name}_${value}`}/>
            <label htmlFor={`${name}_${value}`}
                   className={[styles.radioLabel, outOfStock ? styles.outOfStock : ''].join(' ')}>
                <img src={img} alt={value.toString()}/>
                <span>{label ?? value}</span>
                {field.value === value && <CheckSvg classes={styles.checked}/>}
            </label>
        </div>
    )
}
export const RadioInputWithImage: FC<RadioInterface> = ({
                                                            name,
                                                            value,
                                                            className,
                                                            img = noImg,
                                                            checked = false,
                                                            label
                                                        }) => {
    const [field] = useField(name)
    return (
        <div className={[className, styles.checkboxSelect].join(' ')}>
            <Field type="radio" checked={checked} name={name} value={value} id={`${name}_${value}`}/>
            <label htmlFor={`${name}_${value}`} className={styles.radioLabelImaged}>
                <span>{label ?? value}</span>
                <img src={img} alt={value.toString()}/>
                {field.value === value && <CheckSvg classes={styles.checked}/>}
            </label>
        </div>
    )
}

export const RadioInputGrain: FC<RadioInterface> = ({name, value, className, img = noImg, checked = false}) => {
    const [field, , helpers] = useField(name);

    const handleChange = (inputElement: HTMLInputElement) => {
        helpers.setValue(inputElement.value)
    }
    return (
        <div className={[className, styles.checkboxSelect].join(' ')}>
            <Field type="radio" checked={checked} onChange={(e: any) => handleChange(e.target)} name={name}
                   value={value} id={`${name}_${value}`}/>
            <label htmlFor={`${name}_${value}`} className={styles.radioLabel}>
                <img src={img} alt={value.toString()}/>
                <span>{value}</span>
                {field.value === value && <CheckSvg classes={styles.checked}/>}
            </label>
        </div>
    )
}


export const ProductRadioInputCustom: FC<ProductDimensionRadioCustomInterface> = ({
                                                                                      name,
                                                                                      value,
                                                                                      className,
                                                                                      nullable = false
                                                                                  }) => {
    const labelName = name.replace('_', ' ')
    const [, , helpers] = useField(name)
    const labelCustom = nullable ? value : value ? getFraction(value) : `Custom ${labelName}`;


    function convert(input: HTMLInputElement): void {
        helpers.setValue(+input.value)
    }


    return (
        <div className={[className, styles.productRadio].join(' ')}>
            <Field
                onChange={(e: any) => convert(e.target)}
                type="radio" name={name}
                value={value}
                id={`${name}_${value}`}/>
            <label htmlFor={`${name}_${value}`}
                   className={styles.radioLabel}><span>{labelCustom}</span></label>
        </div>
    )
}


export const ProductRadioInput: FC<ProductRadioInterface> = ({name, value, className}) => {

    return (
        <div className={[className, styles.productRadio].join(' ')}>
            <Field
                type="radio" name={name} value={value}
                id={`${name}_${value}`}/>
            <label htmlFor={`${name}_${value}`}
                   className={styles.radioLabel}><span>{value}</span></label>
        </div>
    )
}

export const ProductRadioInputNumber: FC<ProductRadioInterfaceNumber> = ({name, value, className}) => {
    const [, , helpers] = useField(name)
    function convert(input: HTMLInputElement): void {
        helpers.setValue(+input.value)
    }
    return (
        <div className={[className, styles.productRadio].join(' ')}>
            <Field
                onChange={(e: any) => convert(e.target)}
                type="radio" name={name} value={value}
                id={`${name}_${value}`}/>
            <label htmlFor={`${name}_${value}`}
                   className={styles.radioLabel}><span>{value}</span></label>
        </div>
    )
}

type checkboxType = {
    name: string,
    value: string,
    className?: string,
    inputIndex: number
}
export const ProductCheckboxInput: FC<checkboxType> = ({name, value, className, inputIndex}) => {

    const [, meta,] = useField(name);
    return (
        <div className={[className, styles.productRadio].join(' ')}>
            <Field
                type="checkbox" name={name} value={value}
                id={`${name}_${value}`}/>
            <label htmlFor={`${name}_${value}`}
                   className={styles.radioLabel}><span>{value}</span></label>
            {inputIndex === 0 && meta.error && <div className={styles.error}>{meta.error}</div>}
        </div>
    )
}


export const ProductInputCustom: FC<{ name: string, label?: string }> = ({
                                                                             name,
                                                                             label
                                                                         }) => {
    const numberName = name.replace('_string', '')
    const [field] = useField(name);
    const [fieldNumber, , helpers] = useField(numberName);
    const result = numericQuantity(field.value) || '';

    useEffect(() => {
        if (fieldNumber.value !== result) helpers.setValue(result);
    }, [result])

    return (
        <div className={[styles.productText].join(' ')}>
            <label htmlFor={name}>
                <Field
                    type="text"
                    name={name}
                    id={name}
                    placeholder={label ?? `Example: 12 5/8″`}
                />
            </label>
            <Field
                className={'hidden'}
                type="number"
                name={numberName}
                id={numberName}
                readOnly={true}
            />
            <div className={styles.error}>
                <ErrorMessage name={name} component="span"/>
                <NestedErrorMessage name={fieldNumber.name}/>
            </div>
        </div>
    )
}

export const ProductOptionsInput: FC<ProductOptionsRadioInterface> = ({name, className, value}) => {

    return (
        <div className={[className, styles.productRadio].join(' ')}>
            <Field
                type="checkbox" name={name} value={value}
                id={value}/>
            <label htmlFor={value}
                   className={styles.radioLabel}><span>{value}</span></label>
        </div>
    )
}


export const CustomPartAttrCheckbox: FC<{ name: string, className?: MaybeUndefined<string>, label?: string }> = ({
                                                                                                                     label,
                                                                                                                     name,
                                                                                                                     className
                                                                                                                 }) => {
    return (
        <div className={[className, styles.productRadio].join(' ')}>
            <Field
                type="checkbox"
                name={name}
                id={name}
            />
            <label htmlFor={name}
                   className={styles.radioLabel}><span>{label ?? name}</span></label>
        </div>
    )
}


export const MyDatePicker: FC<{ name: string, label?: string, weeks: number }> = ({
                                                                                      label,
                                                                                      name,
                                                                                      weeks
                                                                                  }): JSX.Element => {

    const [field, meta, helpers] = useField(name);
    const {error, touched} = meta
    const isFilled = !!field.value;
    return (
        <div className={[styles.row, error && touched ? 'error' : null].join(' ')}>
            <DatePicker name={name}
                        id={name}
                        selected={field.value instanceof Date ? field.value : null}
                        onChange={(date: Date | null) => helpers.setValue(date)}
                        dateFormat="MM/dd/yyyy"
                        minDate={addWeeks(new Date(), weeks)}
                        maxDate={addMonths(new Date(), 12)}
                        className={[styles.input, isFilled ? `${styles.focused}` : null, error && touched ? styles.inputError : null].join(' ')}
                        wrapperClassName={[styles.input, isFilled ? `${styles.focused}` : null, error && touched ? styles.inputError : null].join(' ')}
                        autoComplete={'off'}
                        onFocus={() => helpers.setTouched(true)}

            />
            <label className={styles.label} htmlFor={name}>{label}</label>
            <span style={{fontSize: '12px'}}>{`Approximate delivery date (minimum ${weeks} weeks)`}</span>
            <ErrorMessage name={name} component="div" className={styles.error}/>
        </div>
    )
}


export const AdditionalEmailsArray: FC<{ additional_emails: string[], errors: MaybeUndefined<string | string[]> }> = ({
                                                                                                                          additional_emails,
                                                                                                                          errors

                                                                                                                      }): JSX.Element => {
    const myType = getVariableType(errors);
    const typeErrorIsString = myType === 'string'
    return (
        <FieldArray
            name="additional_emails"
            render={(arrayHelpers) => (
                <div>
                    {additional_emails && additional_emails.length > 0
                        ? <div className={s.additionalEmailsWrap}>
                            {additional_emails.map((el, index) => <AdditionalEmailInput
                                    key={index}
                                    index={index}
                                    typeErrorIsString={typeErrorIsString}
                                    arrayHelpers={arrayHelpers}
                                />
                            )}
                            {typeErrorIsString &&
                            <ErrorMessage name="additional_emails" component="div" className={styles.error}/>}
                        </div>
                        : null
                    }
                    {additional_emails?.length < 5 ?
                        <button type="button" className="button yellow small"
                                onClick={() => arrayHelpers.push('')}>+ Additional E-mail
                        </button>
                        : null
                    }
                </div>
            )}
        />
    )
}

const AdditionalEmailInput: FC<{ index: number, typeErrorIsString: boolean, arrayHelpers: FieldArrayRenderProps }> = ({
                                                                                                                          index,
                                                                                                                          typeErrorIsString,
                                                                                                                          arrayHelpers
                                                                                                                      }) => {
    const name = `additional_emails[${index}]`;
    const [field, meta, helpers] = useField(name);
    const {error, touched} = meta;
    const length = field?.value?.length ?? 0;
    return (
        <div className={s.additionalInputWrap}>
            <button
                className={s.close}
                type="button"
                onClick={() => {
                    arrayHelpers.remove(index)
                }}>×
            </button>
            <div className={[styles.row, error && touched ? 'error' : null].join(' ')}>
                <Field
                    className={[styles.input, length ? `${styles.focused}` : null, error && touched ? styles.inputError : null,].join(' ')}
                    type="email"
                    name={name}
                    id={name}
                    onFocus={(e: any) => handleFocus(e.target)}
                    onBlur={(e: any) => handleBlur(e.target, helpers.setTouched)}
                />
                <label className={styles.label} htmlFor={name}>{`Additional Email #${index + 1}`}</label>
                {!typeErrorIsString && <ErrorMessage name={name} component="div" className={styles.error}/>}
            </div>
        </div>
    )
}