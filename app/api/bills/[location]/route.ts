// app/api/bills/[location].ts
import { NextResponse } from 'next/server';
import transformData from '@/utilities/transformMasterList';

export async function GET(request: Request, context: any) {
    const { params } = context
    const location = params?.location

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
