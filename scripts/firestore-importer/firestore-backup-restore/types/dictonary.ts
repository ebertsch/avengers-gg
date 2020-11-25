import { inherits } from "util";

interface IndexedDictionary<T> {
    [key: number]: T
}
export class Dictionary<T> implements IndexedDictionary<T> {
    [key: string]: T
}
