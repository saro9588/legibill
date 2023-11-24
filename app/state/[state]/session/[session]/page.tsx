import { NextResponse } from 'next/server';
import transformData from "@/utilities/transformMasterList";
import Bill from '@/data/bills';

async function getSessionBills(sessionID: number): Promise<Bill[]> {
    try {
        const legiscanApiKey = process.env.LEGI_KEY; 
        const res = await fetch(`https://api.legiscan.com/?key=${legiscanApiKey}&op=getMasterList&id=${sessionID}`);
        const data = await res.json();
    
        const transformedData = transformData(data);
        return transformedData; // Return the transformed data directly
    } catch (error) {
        console.error(error);
        return []; // Return an empty array in case of error
    }
}


export default async function Page({ params }: { params: { session: number, state: string } }) {
    const billList: any = await getSessionBills(params.session)
    const session = billList.pop()
    return(
        <>
            <div className="border rounded-lg p-4 shadow-sm bg-gray-900 text-gray-200 transition-colors">
                <h2 className="text-lg font-semibold">{session.session_title}</h2>
                <p><strong>Session Name:</strong> {session.session_name}</p>
                <p><strong>Years:</strong> {session.year_start} - {session.year_end}</p>
                <p><strong>Session Tag:</strong> {session.session_tag}</p>
                <p><strong>Special Session:</strong> {session.special ? 'Yes' : 'No'}</p>
                <p><strong>Prefile:</strong> {session.prefile ? 'Yes' : 'No'}</p>
                <p><strong>Sine Die:</strong> {session.sine_die ? 'Yes' : 'No'}</p>
                <p><strong>Prior:</strong> {session.prior ? 'Yes' : 'No'}</p>
              </div>
            <ul role="list" className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
                {billList.map((bill: Bill) => (
                <li key={bill.bill_id} className="py-4">
                    <div className="border rounded-lg p-4 shadow-sm bg-white">
                        <div className="border-b min-h-[4.5em] border-gray-200 py-2">
                            <h3 className="line-clamp-2 text-base font-semibold leading-6 text-gray-900">{bill.title}</h3>
                        </div>
                        <p className='line-clamp-1'><strong>Bill Number:</strong> {bill.number}</p>
                        <p className='line-clamp-1'><strong>Last Action:</strong> {bill.last_action}</p>
                        <p className='line-clamp-1'><strong>Last Action Date:</strong> {bill.last_action_date}</p>
                        <p className='line-clamp-1'><strong>Status Date:</strong> {bill.status_date}</p>
                        <p className="line-clamp-2 min-h-[3em]">{bill.description}</p> {/* Updated line */}
                        <div className="mt-6 border-t border-gray-900/5 px-3 py-3">
                            <a  className="text-sm font-semibold leading-6 text-gray-900" href={bill.url} target="_blank" rel="noopener noreferrer">View Bill <span aria-hidden="true">&rarr;</span></a>
                        </div>
                    </div>
                </li>
                ))}
            </ul>
        </>
    )
}