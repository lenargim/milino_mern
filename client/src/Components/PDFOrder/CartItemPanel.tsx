import React, {FC} from 'react';
import {priceStandardPanel} from "../../helpers/productTypes";
import standardProductsPrices from "../../api/standartProductsPrices.json";
import {getdimensionsRow} from "../../helpers/helpers";
import {View, Text} from "@react-pdf/renderer";
import {s} from './PDFOrder'
import {PanelsFormAPIType} from "../../helpers/cartTypes";


const CartItemPanel: FC<{ standard_panels: PanelsFormAPIType, prod_id: number }> = ({
                                                                                                        standard_panels,
                                                                                                        prod_id
                                                                                                    }) => {
        const apiPanelData = standardProductsPrices.find(el => el.id === prod_id) as priceStandardPanel;
        if (!apiPanelData) return null;
        const {standard_panel, shape_panel, wtk, crown_molding} = standard_panels;
        const {standard_panel: standard_panelAPI, shape_panel: shape_panelAPI, wtk: wtkAPI} = apiPanelData
        return (
            <View style={s.blocks}>
                <View>
                    {standard_panel.length ?
                        <View>
                            <Text style={s.itemOptionBold}>Standard Panel:</Text>
                            {standard_panel.map((el, index) => {
                                const item = standard_panelAPI.find(apiEL => apiEL.name === el.name);
                                if (!item) return null;
                                const dimensions = getdimensionsRow(item.width, item.height, item.depth);
                                return (
                                    <View key={index} style={s.itemOption}>
                                        <Text>{item.name}</Text>
                                        <Text>Size: {dimensions}. Amount: {el.qty}</Text>
                                    </View>)
                            })
                            }
                        </View> : null
                    }
                </View>
                <View>
                    {shape_panel.length ?
                        <View>
                            <Text style={s.itemOptionBold}>L-Shape Panel:</Text>
                            {shape_panel.map((el, index) => {
                                const item = shape_panelAPI.find(apiEL => apiEL.name === el.name);
                                if (!item) return null;
                                const dimensions = getdimensionsRow(item.width, item.height, item.depth);
                                return (
                                    <View key={index} style={s.itemOption}>
                                        <Text>{item.name}</Text>
                                        <Text>Size: {dimensions}. Amount: {el.qty}</Text>
                                    </View>)
                            })
                            }
                        </View> : null
                    }
                </View>
                <View>
                    {wtk.length ?
                        <View>
                            <Text style={s.itemOptionBold}>WTK:</Text>
                            {wtk.map((el, index) => {
                                const item = wtkAPI.find(apiEL => apiEL.name === el.name);
                                if (!item) return null;
                                const dimensions = getdimensionsRow(item.width, item.height, item.depth);
                                return (
                                    <View key={index} style={s.itemOption}>
                                        <Text>{item.name}</Text>
                                        <Text>Size: {dimensions}. Amount: {el.qty}</Text>
                                    </View>)
                            })
                            }
                        </View> : null
                    }
                </View>
                <View>
                    {crown_molding ?
                        <View>
                            <Text style={s.itemOptionBold}>Crown Molding:</Text>
                            <Text style={s.itemOption}>Amount: {crown_molding}</Text>
                        </View> : null
                    }
                </View>
            </View>
        );
    }
;

export default CartItemPanel