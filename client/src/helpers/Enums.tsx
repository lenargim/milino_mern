type EnumConfig = Record<number, string>;

export const CustomPartShelves = {
    0: 'Fixed',
    1: 'Adjustable',
    2: 'Glass'
} as const satisfies EnumConfig;

export type CustomPartShelvesEnumType = typeof CustomPartShelves[keyof typeof CustomPartShelves];
