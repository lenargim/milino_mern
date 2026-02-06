import {
    AngleType,
    AttrItemType, CartExtrasType, cornerTypes,
    hingeTypes, ProductOptionsType,
    productTypings
} from "../../helpers/productTypes";
import {CartItemFrontType, CartLEDAPI} from "../../helpers/cartTypes";

export type glassDoorExtraType = {
    material?: string,
    Profile?: string,
    Type?: string,
    Color?: string
}

export type PVCExtraType = {
    pvcFeet: number,
    material: string,
}


export type productExtraType = {
    width: number,
    height: number,
    depth: number,
    type: productTypings,
    isStandardSize: boolean,
    blindWidth?: number,
    hinge: hingeTypes,
    corner?: cornerTypes,
    legsHeight: number,
    options: string[],
    doorProfile?: string,
    doorGlassType?: string,
    doorGlassColor?: string,
    shelfProfile?: string,
    shelfGlassType?: string,
    shelfGlassColor?: string,
    middleSection?: number,
    led?: CartLEDAPI,
    leather?: string,
    cartExtras: CartExtrasType
}

export type customPartExtraType = {
    width: number,
    height: number,
    depth: number,
    material?: string,
}

export interface productChangeMaterialType extends CartItemFrontType {
    width: number,
    height: number,
    depth: number,
    image_active_number: productTypings,
    attributes: AttrItemType[],
    options: ProductOptionsType[],
    isBlind: boolean,
    isAngle: AngleType,
    customHeight?: number,
    customDepth?: number,
}