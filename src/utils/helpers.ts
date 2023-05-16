import {
    WineProp,
    ItemCount,
    FrequencyProps,
    GenerateRowOfMeanMedianModeProps,
} from "../interface/global";

/**
 *
 * @param data (wine dataset)` and `wineProperty`(eg: Gamma/Flavanoids)
 * @returns an object of objects where each object is an alcohol class with property `frequency`
 * and `list: contains data of wineProperty(eg: Gamma/Flavanoids) passed `
 */
export function getAlcoholDataByClass(
    data: WineProp[],
    wineProperty: string
): ItemCount {
    const wineCountWithData: ItemCount = {};
    data.forEach((item: any) => {
        const winePropValue = Number(item[wineProperty]); // convert to number as some data may be string

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
 * @param data : array of number(eg: [1, 2, 1, 2, 3, 4])
 * @returns : object(eg: { 1: 2, 2: 2, 3:1, 4: 1})
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
        median = (first + second) / 2; // incase length is even
    } else {
        median = sortedData[Math.ceil(mid)]; //incase length is odd
    }
    return median;
}

/**
 *
 * @param data : array of number
 * @returns : stringified number with highest count/frequency
 */
export function getMode(data: number[]): string {
    const mode: number[] = [];

    const frequencyData = getFrequency(data);
    const frequencyValues = Object.values(frequencyData);
    const frequencyKeys = Object.keys(frequencyData);

    const max = Math.max(...frequencyValues); // returns max value

    frequencyKeys.forEach((element) => {
        if (frequencyData[element] === max) {
            const roundOffValue = roundOffNumber(Number(element), 1000);
            mode.push(roundOffValue);
        }
    });
    return mode.toString();
}

/**
 *
 * @param { alcoholClass, alocholDataByClass, wineProperty}
 * @returns : structured data for tablular format (eg: [["Mean", 13, 12, 11],["Median", 3, 4, 5],["Mode", 4, 3, 5]])
 */
export function generateRowsData({
    alcoholClass,
    alocholDataByClass,
    wineProperty,
}: GenerateRowOfMeanMedianModeProps): (string | number)[][] {
    return [
        [
            `${wineProperty} Mean`,
            ...alcoholClass.map((item) =>
                roundOffNumber(getMean(alocholDataByClass[item].list), 1000)
            ),
        ],
        [
            `${wineProperty} Median`,
            ...alcoholClass.map((item) =>
                roundOffNumber(getMedian(alocholDataByClass[item].list), 1000)
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
 * @returns update WineData set with Gamma property
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

/**
 * @param,
 * @return round off to 3 decimal places
 */

export function roundOffNumber(value: number, roundOffBy: number) {
    return Math.round(value * roundOffBy) / roundOffBy;
}
