export interface StatisticalMeasure {
    wineProperty: string;
    wineData: WineProp[];
}

export interface WineProp {
    Alcohol: number | string;
    "Malic Acid": number | string;
    Ash: number | string;
    "Alcalinity of ash": number | string;
    Magnesium: number | string;
    "Total phenols": number | string;
    Flavanoids: number | string;
    "Nonflavanoid phenols": number | string;
    Proanthocyanins: number | string;
    "Color intensity": number | string;
    Hue: number | string;
    Gamma?: number | string;
    "OD280/OD315 of diluted wines": number | string;
    Unknown: number | string;
}

export interface ItemCount {
    [key: string]: {
        frequency: number;
        list: number[];
    };
}

export interface FrequencyProps {
    [key: string]: number;
}

export interface GenerateRowOfMeanMedianModeProps {
    wineProperty: string;
    alcoholClass: string[];
    alocholDataByClass: ItemCount;
}