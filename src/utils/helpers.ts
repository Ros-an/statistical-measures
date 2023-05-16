import {
    WineProp,
    ItemCount,
    FrequencyProps,
    GenerateRowOfMeanMedianModeProps,
} from "../interface/global";

/**
 *
 * @param data of type `WineProp[]` and `wineProperty`
 * @returns an object of objects where each object is an alcohol class with property `frequency` and `list: `
 */
export function getAlcoholDataByClass(
    data: WineProp[],
    wineProperty: string
): ItemCount {
    const wineCountWithData: ItemCount = {};
    data.forEach((item: any) => {
        const winePropValue = Number(item[wineProperty]);

        if (wineCountWithData[item.Alcohol]) {
            wineCountWithData[item.Alcohol] = {
                ...wineCountWithData[item.Alcohol],
                frequency: wineCountWithData[item.Alcohol].frequency + 1,
                list: [...wineCountWithData[item.Alcohol].list, winePropValue],
            };
        } else {
            wineCountWithData[item.Alcohol] = {
                frequency: 1,
                list: [winePropValue],
            };
        }
    });

    return wineCountWithData;
}

/**
 *
 * @param data : array of number
 * @returns : sorted data in ascending order
 */
export function sortData(data: number[]): number[] {
    data.sort((a, b) => a - b);
    return data;
}

/**
 *
 * @param data : array of number
 * @returns : object of frequency of repetitive data
 */
export function getFrequency(data: number[]): FrequencyProps {
    const frequency: FrequencyProps = {};
    data.forEach((element) => {
        frequency[element] ? frequency[element]++ : (frequency[element] = 1);
    });
    return frequency;
}
/**
 *
 * @param data : array of number
 * @returns : mean value of passed array
 */
export function getMean(data: number[]): number {
    const sum = data.reduce((acc, current) => acc + current, 0);
    const mean = sum / data.length;
    return mean;
}

/**
 *
 * @param data : array of number
 * @returns : median of list of numbers
 */
export function getMedian(data: number[]): number {
    const length = data.length;
    const sortedData = sortData(data);
    let median = 0;
    const mid = length / 2 - 1; // since array index starts from 0
    if (length % 2 === 0) {
        const first = sortedData[mid];
        const second = sortedData[mid + 1];
        median = (first + second) / 2;
    } else {
        median = sortedData[Math.ceil(mid)];
    }
    return median;
}

/**
 *
 * @param data : array of number
 * @returns : stringified number with highest count/frequency
 */
export function getMode(data: number[]): string {
    const mode: string[] = [];

    const frequencyData = getFrequency(data);
    const frequencyValues = Object.values(frequencyData);
    const frequencyKeys = Object.keys(frequencyData);

    const max = Math.max(...frequencyValues); // returns max value, if such data eg: "1.23" is passed, it converts to number and then calculates max

    frequencyKeys.forEach((element) => {
        if (frequencyData[element] === max) {
            mode.push(Number(element).toFixed(3));
        }
    });
    return mode.toString();
}

/**
 *
 * @param { alcoholClass, alocholDataByClass, wineProperty}
 * @returns : structured data for tablular format
 */
export function generateRowsData({
    alcoholClass,
    alocholDataByClass,
    wineProperty,
}: GenerateRowOfMeanMedianModeProps): string[][] {
    return [
        [
            `${wineProperty} Mean`,
            ...alcoholClass.map((item) =>
                getMean(alocholDataByClass[item].list).toFixed(3)
            ),
        ],
        [
            `${wineProperty} Median`,
            ...alcoholClass.map((item) =>
                getMedian(alocholDataByClass[item].list).toFixed(3)
            ),
        ],
        [
            `${wineProperty} Mode`,
            ...alcoholClass.map((item) => getMode(alocholDataByClass[item].list)),
        ],
    ];
}

/**
 *
 * @param wineData
 * @returns update WineData with Gamma property
 */
export function addGamma(wineData: WineProp[]): WineProp[] {
    const updatedData = wineData.map((wineItem) => {
        const { Ash, Hue, Magnesium } = wineItem;
        const gamma = (Number(Ash) * Number(Hue)) / Number(Magnesium);
        return {
            ...wineItem,
            Gamma: Number(gamma.toFixed(2)),
        };
    });
    return updatedData;
}
