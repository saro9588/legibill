import ApiResponse from "@/data/apiResponse";
import Bill from "@/data/bills";

export default function transformData(data: ApiResponse): Bill[] {
    const masterlist = data.masterlist;
    let billsArray: Bill[] = [];

    for (let key in masterlist) {
        if (masterlist.hasOwnProperty(key)) {
            billsArray.push(masterlist[key]);
        }
    }

    return billsArray;
}