export interface WebhookRequest {
    id: string;
    httpMethod: string;
    headers: string;
    body: string;
    receivedAt: Date;
}