import MasterList from "./masterList";

export default interface ApiResponse {
    status: string;
    masterlist: MasterList;
}