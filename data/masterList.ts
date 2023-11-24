import Bill from "./bills";

export default interface MasterList {
    [key: string]: Bill;
}