interface WineProp {
    Alcohol: number;
    "Malic Acid": number;
    Ash: number;
    "Alcalinity of ash": number;
    Magnesium: number;
    "Total phenols": number;
    Flavanoids: number;
    "Nonflavanoid phenols": number;
    Proanthocyanins: number;
    "Color intensity": number;
    Hue: number;
    "OD280/OD315 of diluted wines": number;
    Unknown: 3.92;
}

interface ItemCount {
    [key: string]: any;
}
/**
 * 
 * @param data of type WineProp[] and wine property
 * @returns object which contains the frequency and passed wine property list of each class alcohol
 */
export function structureWineClass(data: any, wineProperty: string) {
    const wineCountWithData: ItemCount = {};
    data.forEach((item:any) => {
        if (wineCountWithData[item.Alcohol]) {
            wineCountWithData[item.Alcohol] = {
                ...wineCountWithData[item.Alcohol],
                frequency: wineCountWithData[item.Alcohol].frequency + 1,
                list: [...wineCountWithData[item.Alcohol].list, item[wineProperty]],
            };
        } else {
            wineCountWithData[item.Alcohol] = {
                frequency: 1,
                list: [item[wineProperty]],
            };
        }
    });
    return wineCountWithData;
}



export function sortData(data: number[]) {
    data.sort((a,b)=> a - b);
    return data;
}

export function getFrequency(data: number[]) {
    const frequency: ItemCount = {};
    data.forEach(element => {
        frequency[element] ? frequency[element]++ : frequency[element] = 1;
    });
    return frequency;
}

export function getMean(data: number[]) {
    const sum = data.reduce((acc, current) => acc + Number(current),0);
    const mean = sum/data.length;
    return mean;
}

export function getMedian(data: number[]){
    const length = data.length;
    const sortedData = sortData(data);
    let median = 0;
    const mid = (length / 2) - 1; // since array index starts from 0
    if(length % 2 === 0) {
        const first = sortedData[mid];
        const second = sortedData[mid + 1];
        median = (Number(first) + Number(second))/2;
    }else {
        median = sortedData[Math.ceil(mid)];
    }
    return median;
}

export function getMode(data:number[]){
    const mode: number[] = []
    const frequencyData = getFrequency(data);
    const frequencyValues = Object.values(frequencyData);
    const frequencyKeys = Object.keys(frequencyData);
    const max = Math.max(...frequencyValues); // returns max value.

    frequencyKeys.forEach(element => {
        if(frequencyData[element] === max){
            mode.push(Number(element));
        }
    });
    return mode.toString()
}