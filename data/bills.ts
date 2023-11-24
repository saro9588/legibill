export default interface Bill {
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