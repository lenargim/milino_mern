import React, {FC} from 'react';
import {CartItemType} from "../../api/apiFunctions";
import CartItemProduct from "./CartItemProduct";
import CartItemCustom from "./CartItemCustom";
// import CartItemProductExtra from "./CartItemProductExtra";
// import CartItemCustomExtra from "./CartItemCustomExtra";
// import CartItemGlassDoorExtra from "./CartItemGlassDoorExtra";
// import CartItemPVCExtra from "./CartItemPVCExtra";
// import CartItemLEDExtra from "./CartItemLEDExtra";
// import CartItemDoorExtra from "./CartItemDoorExtra";
// import CartItemShelfExtra from "./CartItemShelfExtra";
// import CartItemDoor from "./CartItemDoor";
// import {CartItemType} from "../../api/apiFunctions"

const CartItemOptions:FC<{item: CartItemType}> = ({item}) => {
    const {
        product_type
    } = item;

    switch (product_type) {
        case "cabinet":
        case "standard":
            return <CartItemProduct product={item}/>
        default:
            return <CartItemCustom product={item}/>
    }

    // return (
    //     <>
             {/*{productExtra && <CartItemProductExtra productExtra={productExtra}/>}*/}
             {/*{customPartExtra && <CartItemCustomExtra productExtra={customPartExtra}/>}*/}
             {/*{glassDoorExtra && <CartItemGlassDoorExtra glassDoorExtra={glassDoorExtra}/>}*/}
             {/*{PVCExtra && <CartItemPVCExtra productExtra={PVCExtra}/>}*/}
             {/*{LEDAccessories && <CartItemLEDExtra productExtra={LEDAccessories}/>}*/}
             {/*{DoorAccessories && <CartItemDoorExtra productExtra={DoorAccessories} />}*/}
             {/*{glassShelfExtra && <CartItemShelfExtra productExtra={glassShelfExtra} />}*/}
             {/*{DoorExtra && <CartItemDoor productExtra={DoorExtra?? ''} />}*/}
        // </>
     // );
};

export default CartItemOptions;