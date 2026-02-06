import React, {FC} from 'react';
import s from "./room.module.sass";
import {RadioInput} from "../../common/Form";
import {getImg} from "../../helpers/helpers";
import {materialsData, OrderFormSelectType} from "../../helpers/roomTypes";
import SelectFieldWithImg from "../../common/SelectFieldWithImg";


const RoomMaterialsDataType: FC<OrderFormSelectType> = ({data, value, name, label, size}) => {
    return (
        <div className={s.orderBlock}>
            <h2>{label ?? name}:</h2>
            {value
                ? <SelectedField value={value} data={data} name={name}/>
                : <UnSelectedField value={value} data={data} name={name} size={size}/>
            }
        </div>
    );
};

export default RoomMaterialsDataType;


const SelectedField: FC<OrderFormSelectType> = ({value, data, name}) => {
    const dataWithImgPath: materialsData[] = data.map(el => (
        {
            value: el.value.toString(),
            img: getImg(`materials/${name}`, `${el.img}`),
            outOfStock: el.outOfStock,
            label: el.label
        }
    ))
    const curValue = dataWithImgPath.find(el => el.value === value) ?? {value: '', img: ''};
    return (
        <SelectFieldWithImg
            name={name}
            val={curValue}
            options={dataWithImgPath}/>
    )
}

const UnSelectedField: FC<OrderFormSelectType> = ({data, name, size}) => {
    return (
        <div className={s.type} role="group">
            {data.map((el, key) => <RadioInput
                img={getImg(`materials/${name}`, el.img)}
                key={key}
                outOfStock={el.outOfStock}
                value={el.value}
                label={el.label}
                name={name}
                className={`${s.typeItem} ${size ? s[`typeItem_${size}`] : ''}`}
            />)}
        </div>
    )
}