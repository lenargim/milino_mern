import React, {FC} from 'react';
import s from "../OrderForm/OrderForm.module.sass";
import {RadioInput} from "../../common/Form";
import {getImg} from "../../helpers/helpers";
import {materialsData, OrderFormSelectType} from "../../helpers/materialsTypes";
import SelectFieldWithImg from "../../common/SelectFieldWithImg";


const DataType: FC<OrderFormSelectType> = ({data, value, name, label, small}) => {
    return (
        <div className={s.orderBlock}>
            <h2>{label ?? name}:</h2>
            {value
                ? <SelectedField value={value} data={data} name={name}/>
                : <UnSelectedField value={value} data={data} name={name} small={!!small}/>
            }
        </div>
    );
};

export default DataType;


const SelectedField: FC<OrderFormSelectType> = ({value, data, name}) => {
    const dataWithImgPath:materialsData[] = data.map(material => ({value: material.value.toString(),  img: getImg(`materials/${name}`, `${material.img}`)}))
    const curValue = dataWithImgPath.find(el => el.value === value) ?? {value: '', img: ''};

    return (
        <SelectFieldWithImg
            name={name}
            val={curValue}
            options={dataWithImgPath}/>
    )
}

const UnSelectedField: FC<OrderFormSelectType> = ({data, name, small}) => {
    return (
        <div className={s.type} role="group">
            {data.map((el, key) => <RadioInput
                img={getImg(`materials/${name}`, el.img)}
                key={key}
                value={el.value}
                name={name}
                className={[s.typeItem, small ? s.typeItemSmall : ''].join(' ')}
                />)}
        </div>
    )
}