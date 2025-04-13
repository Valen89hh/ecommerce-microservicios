export type ServerResponse<T> =
    | { success: true; data: T }
    | { success: false; error: string}