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

interface ItemCount {
    [key: string]: {
        frequency: number;
        list: number[];
    };
}
/**
 *
 * @param data of type WineProp[] and wine property
 * @returns object which contains the frequency and passed wine property list of each class alcohol
 */
export function structureWineClass(
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

export function sortData(data: number[]): number[] {
    data.sort((a, b) => a - b); // minus when used with string, first convert it to number and then operation
    return data;
}

interface FrequencyProps {
    [key: string]: number;
}
export function getFrequency(data: number[]): FrequencyProps {
    const frequency: FrequencyProps = {};
    data.forEach((element) => {
        frequency[element] ? frequency[element]++ : (frequency[element] = 1);
    });
    return frequency;
}

export function getMean(data: number[]): number {
    const sum = data.reduce((acc, current) => acc + current, 0);
    const mean = sum / data.length;
    return mean;
}

export function getMedian(data: number[]): number {
    const length = data.length;
    const sortedData = sortData(data);
    let median = 0;
    const mid = (length / 2) - 1; // since array index starts from 0
    if (length % 2 === 0) {
        const first = sortedData[mid];
        const second = sortedData[mid + 1];
        median = (first + second) / 2;
    } else {
        median = sortedData[Math.ceil(mid)];
    }
    return median;
}

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

interface GenerateRowOfMeanMedianModeProps {
    wineProperty: string;
    alcoholClass: string[];
    alocholStructedData: ItemCount;
}
export function generateRowsData({
    alcoholClass,
    alocholStructedData,
    wineProperty,
}: GenerateRowOfMeanMedianModeProps): string[][] {
    return [
        [
            `${wineProperty} Mean`,
            ...alcoholClass.map((item) =>
                getMean(alocholStructedData[item].list).toFixed(3)
            ),
        ],
        [
            `${wineProperty} Median`,
            ...alcoholClass.map((item) =>
                getMedian(alocholStructedData[item].list).toFixed(3)
            ),
        ],
        [
            `${wineProperty} Mode`,
            ...alcoholClass.map((item) => getMode(alocholStructedData[item].list)),
        ],
    ];
}
