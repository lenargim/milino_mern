type EnumConfig = Record<number, string>;

export const CustomPartShelves = {
    0: 'Fixed',
    1: 'Adjustable',
    2: 'Removable',
    3: 'Adjustable Glass',
    4: 'Removable Glass',
} as const satisfies EnumConfig;

export type CustomPartShelvesEnumType = typeof CustomPartShelves[keyof typeof CustomPartShelves];
