export interface WebhookRequest {
    id: string;
    httpMethod: string;
    headers: { [key: string]: string[] };
    body: string;
    receivedAt: Date;
}