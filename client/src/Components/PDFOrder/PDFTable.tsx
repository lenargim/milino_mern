import React, {FC, ReactNode} from 'react';
import {s} from "./PDFOrder";
import {Image, Text, View} from "@react-pdf/renderer";
import {getProductById, getProductOrCustomPartImage} from "../../helpers/helpers";
import CartItemOptions from "./CartItemOptions";
import {CartItemFrontType} from "../../helpers/cartTypes";

const PdfTable:FC<{cart: CartItemFrontType[], children?: ReactNode;}> = ({cart}) => {
    return (
        <View style={s.table}>
            <View style={s.cartItem}>
                <View style={s.th0}><Text>#</Text></View>
                <View style={s.th1}><Text>Img</Text></View>
                <View style={s.th2}><Text>Description</Text></View>
                <View style={s.th3}><Text>Price</Text></View>
                <View style={s.th4}><Text>Product total</Text></View>
            </View>
            {cart.map((el, index) => {
                const {product_id, product_type, isStandard} = el;
                const product = getProductById(product_id, product_type === 'standard');
                if (!product) return;
                const {name} = product;
                const img = getProductOrCustomPartImage(product, el);
                const anyNotStandard = Object.values(isStandard).some(value => !value) || Object.values(isStandard.dimensions).some(value => !value);
                return (
                    <View wrap={false} style={s.cartItem} key={index}>
                        <View style={s.th0}><Text>{++index}</Text></View>
                        <View style={s.img}>
                            <Image src={img}/>
                        </View>
                        <View style={s.data}>
                            <Text style={s.itemName}>
                                <Text>{name}</Text> {anyNotStandard && <Text style={s.non}>Custom</Text>}
                            </Text>
                            <CartItemOptions item={el}/>
                            {el.note ? <Text style={s.note}>*{el.note}</Text> : null}
                        </View>
                        <View style={s.itemPrice}>
                            <Text>{el.price}$ x {el.amount}</Text>
                        </View>
                        <View style={s.sum}>
                            <Text>{(el.price * el.amount).toFixed(1)}$</Text>
                        </View>
                    </View>
                )
            })}
        </View>
    );
};

export default PdfTable;