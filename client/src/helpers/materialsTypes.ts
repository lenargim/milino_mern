

export const boxMaterialNames = ['White Melamine', 'Gray Melamine', 'Gray Linen Melamine', 'Beige Linen Melamine', 'Ash Melamine', 'Walnut Melamine', 'Brown Oak', 'Ivory Woodline', 'Grey Woodline', 'Natural Plywood', 'White Plywood', 'Gray Plywood', 'Ultra Matte White', 'Ultra Matte Grey', 'Ultra Matte Cashmere', 'White Gloss'] as const;
export const leatherBoxMaterialNames = ['Milino', 'Syncron', 'Luxe', 'Ultrapan PET', 'Zenit', 'Ultrapan Acrylic'] as const;
export const totalBoxMaterialNames = [...boxMaterialNames, ...leatherBoxMaterialNames] as const;
export type BoxMaterialType = typeof totalBoxMaterialNames[number];
export type OrderFormSelectType = {
    data: materialsData[],
    value: string | number,
    name: string,
    label?: string
    small?: boolean
}

export type materialsData = {
    value: string,
    img?: string
}

export interface drawer extends materialsData {
    types: drawerType[]
}

export interface drawerType extends materialsData {
    colors: materialsData[]
}

export interface doorType extends materialsData {
    finish: finishType[]
    frame?: materialsData[],
}

export interface finishType extends materialsData {
    colors?: colorType[],
}

export interface colorType extends materialsData {
    isGrain?: boolean | number,
}

export type MaterialsType = {
    categories: materialsData[],
    gola: materialsData[],
    doors: doorType[],
    boxMaterial: materialsData[],
    drawers: drawer[],
    leatherBoxMaterial: materialsData[]
    leatherType: materialsData[],
    grain: materialsData[]
}