export type OrderFormSelectType = {
    data: materialsData[]|materialsDataNumber[],
    value: string|number,
    name: string,
    label?: string
    small?: boolean
}

export type materialsData = {
    value: string,
    img?: string
}

export type materialsDataNumber = {
    value: number,
    img?: string
}

export interface drawer extends materialsData{
    types: drawerType[]
}

export interface drawerType extends materialsData{
    colors: materialsData[]
}

export interface doorType extends materialsData {
    finish: finishType[]
    frame?: materialsData[],
}

export interface finishType extends materialsData{
    colors?: colorType[],
}

export interface colorType extends materialsData{
    isGrain?: boolean|number,
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