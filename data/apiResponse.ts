import MasterList from "./MasterList";

export default interface ApiResponse {
    status: string;
    masterlist: MasterList;
}