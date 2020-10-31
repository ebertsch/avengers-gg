
export interface Response<T> {
    total:      number;
    categories: string[];
    results:    T[];
}

export interface Result<T> {
    name:        string;
    category:    string;
    sheetRow:    number;
    content:     T;
    variations?: T[];
}