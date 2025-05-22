import React, {FC} from 'react';
import s from "./sidebar.module.sass";
import {MaybeUndefined, priceStandardPanel} from "../../helpers/productTypes";
import {PanelsFormAPIType} from "../../api/apiFunctions";
import standardProductsPrices from "../../api/standartProductsPrices.json";
import {getdimensionsRow} from "../../helpers/helpers";

const CartItemPanel: FC<{ standard_panels: MaybeUndefined<PanelsFormAPIType>, prod_id: number }> = ({
                                                                                                        standard_panels,
                                                                                                        prod_id
                                                                                                    }) => {
    const apiPanelData = standardProductsPrices.find(el => el.id === prod_id) as priceStandardPanel;
    if (!standard_panels || !apiPanelData) return null;
    const {standard_panel, shape_panel, wtk, crown_molding} = standard_panels;
    const {standard_panel: standard_panelAPI, shape_panel: shape_panelAPI, wtk: wtkAPI} = apiPanelData
    return (
        <div className={s.blocks}>
            {standard_panel.length ?
                <div>
                    <div>Standard Panel:</div>
                    {standard_panel.map((el, index) => {
                        const item = standard_panelAPI.find(apiEL => apiEL.name === el.name);
                        if (!item) return null;
                        const dimensions = getdimensionsRow(item.width, item.height, item.depth);
                        return (
                            <div key={index}><span className={s.itemOption}>
                    <span>{item.name}</span>
                    <span>Size: {dimensions}. Amount: {el.qty}</span>
                    </span></div>)
                    })
                    }
                </div> : null
            }
            {shape_panel.length ?
                <div>
                    <div>L-Shape Panel:</div>
                    {shape_panel.map((el, index) => {
                        const item = shape_panelAPI.find(apiEL => apiEL.name === el.name);
                        if (!item) return null;
                        const dimensions = getdimensionsRow(item.width, item.height, item.depth);
                        return (
                            <div key={index}><span className={s.itemOption}>
                    <span>{item.name}</span>
                    <span>Size: {dimensions}. Amount: {el.qty}</span>
                    </span></div>)
                    })
                    }
                </div> : null
            }
            {wtk.length ?
                <div>
                    <div>WTK:</div>
                    {wtk.map((el, index) => {
                        const item = wtkAPI.find(apiEL => apiEL.name === el.name);
                        if (!item) return null;
                        const dimensions = getdimensionsRow(item.width, item.height, item.depth);
                        return (
                            <div key={index}><span className={s.itemOption}>
                    <span>{item.name}</span>
                    <span>Size: {dimensions}. Amount: {el.qty}</span>
                    </span></div>)
                    })
                    }
                </div> : null
            }
            {
                crown_molding ?
                    <div>
                        <div>Crown Molding:</div>
                        <span className={s.itemOption}>
                            <span>Amount: {crown_molding}</span>
                        </span>
                    </div> : null
            }
        </div>
    );
};

export default CartItemPanel