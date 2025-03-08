import React, {FC} from 'react';
import s from "../OrderForm/Sidebar/sidebar.module.sass";
import {MaybeUndefined, priceStandardPanel} from "../../helpers/productTypes";
import {PanelsFormAPIType} from "../../api/apiFunctions";
import standardProductsPrices from "../../api/standartProductsPrices.json";
import {getDimentionsRow} from "../../helpers/helpers";


const CartItemPanel: FC<{ standard_panels: MaybeUndefined<PanelsFormAPIType>, prod_id: number }> = ({
                                                                                                        standard_panels,
                                                                                                        prod_id
                                                                                                    }) => {
    const apiPanelData = standardProductsPrices.find(el => el.id === prod_id) as priceStandardPanel;
    if (!standard_panels || !apiPanelData) return null;
    const {standard_panel, shape_panel, wtk} = standard_panels;
    const {standard_panel: standard_panelAPI, shape_panel: shape_panelAPI, wtk: wtkAPI} = apiPanelData
    return (
        <>
            {standard_panel.length ?
                <>
                    <div>Standard Panel:</div>
                    {standard_panel.map((el, index) => {
                        const item = standard_panelAPI.find(apiEL => apiEL.name === el.name);
                        if (!item) return null;
                        const dimentions = getDimentionsRow(item.width, item.height, item.depth);
                        return (
                            <div key={index}><span className={s.itemOption}>
                    <span>{item.name}</span>
                    <span>Size: {dimentions}. Amount: {el.qty}</span>
                    </span></div>)
                    })
                    }
                </> : null
            }
            {shape_panel.length ?
                <>
                    <div>L-Shape Panel:</div>
                    {shape_panel.map((el, index) => {
                        const item = shape_panelAPI.find(apiEL => apiEL.name === el.name);
                        if (!item) return null;
                        const dimentions = getDimentionsRow(item.width, item.height, item.depth);
                        return (
                            <div key={index}><span className={s.itemOption}>
                    <span>{item.name}</span>
                    <span>Size: {dimentions}. Amount: {el.qty}</span>
                    </span></div>)
                    })
                    }
                </> : null
            }
            {wtk.length ?
                <>
                    <div>WTK:</div>
                    {wtk.map((el, index) => {
                        const item = wtkAPI.find(apiEL => apiEL.name === el.name);
                        if (!item) return null;
                        const dimentions = getDimentionsRow(item.width, item.height, item.depth);
                        return (
                            <div key={index}><span className={s.itemOption}>
                    <span>{item.name}</span>
                    <span>Size: {dimentions}. Amount: {el.qty}</span>
                    </span></div>)
                    })
                    }
                </> : null
            }
        </>
    );
};

export default CartItemPanel