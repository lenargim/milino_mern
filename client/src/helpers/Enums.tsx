type EnumConfig = Record<number, string>;

export const getKeyByValue = <
    T extends Record<string, string | number>
>(
    obj: T,
    value: T[keyof T]
): number | undefined => {
    const key = Object.keys(obj).find(key => obj[key] === value);
    return key === undefined ? undefined : Number(key);
};

export const getValueByKey = <T extends object>(
    obj: T,
    key: number,
): T[keyof T] | undefined => {
    return (obj as Record<number, T[keyof T]>)[key];
};

export const CustomPartShelves = {
    0: 'Fixed',
    1: 'Adjustable',
    2: 'Removable',
    3: 'Adjustable Glass',
    4: 'Removable Glass',
} as const satisfies EnumConfig;

export type CustomPartShelvesEnumType = typeof CustomPartShelves[keyof typeof CustomPartShelves];


export const CustomPartDoublePanel = {
    0: 'Full Panel',
    1: '6” Return'
} as const satisfies EnumConfig;

export type CustomPartDoublePanelType = typeof CustomPartDoublePanel[keyof typeof CustomPartDoublePanel];
export type CustomPartDoublePanelKeyType = keyof typeof CustomPartDoublePanel;
