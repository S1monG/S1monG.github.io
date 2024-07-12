export type RESTMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface Parameter {
    key: string,
    value: string
}

export interface RequestData {
    method: RESTMethod,
    url: string,
    headers: Parameter[],
    queries: Parameter[],
    body: string
}