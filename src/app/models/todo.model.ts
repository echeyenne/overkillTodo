export interface TodoModel {
    id: number;
    title: string;
    isClosed: boolean;
    lastUpdateTimestamp: number;
    description?: string;
}
