// app/api/bills/[location].ts

import { NextResponse } from 'next/server';

interface Bill {
    bill_id: number;
    number: string;
    change_hash: string;
    url: string;
    status_date: string;
    status: number;
    last_action_date: string;
    last_action: string;
    title: string;
    description: string;
}

interface MasterList {
    [key: string]: Bill;
}

interface ApiResponse {
    status: string;
    masterlist: MasterList;
}

function transformData(data: ApiResponse): Bill[] {
    const masterlist = data.masterlist;
    let billsArray: Bill[] = [];

    for (let key in masterlist) {
        if (masterlist.hasOwnProperty(key)) {
            billsArray.push(masterlist[key]);
        }
    }

    return billsArray;
}

export async function GET(request: Request, context: any) {
    const { params } = context
    const location = params?.location
    console.log("params: ", params)
    const year = new Date().getFullYear(); // Getting the current year

    if (!location) {
        return NextResponse.json({ error: 'Location parameter is required' }, { status: 400 });
    }

    try {
        const legiscanApiKey = process.env.LEGI_KEY; // Your LegiScan API key

        const response = await fetch(`https://api.legiscan.com/?key=${legiscanApiKey}&op=getMasterList&state=${location}&year=${year}`);
        const data = await response.json();
      
        const transformedData = transformData(data);
        return NextResponse.json({
            count: transformedData.length,
            transformedData
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error fetching data from LegiScan' }, { status: 500 });
    }
}
