import { WebhookRequest } from "../types/WebhookRequest";

interface RequestDetailsProps {
  selectedRequest: WebhookRequest | null;
}

export default function RequestDetails({ selectedRequest }: RequestDetailsProps) {
  const formatBody = (body: string) => {
    try {
      const json = JSON.parse(body);
      return <pre>{JSON.stringify(json, null, 2)}</pre>;
    } catch (error) {
      return <pre>{body}</pre>;
    }
  };

  return (
    <div className="w-2/3 pl-4 overflow-y-auto">
      {selectedRequest ? (
        <div>
          <h2 className="text-xl font-bold mb-2">Request Details</h2>
          <p><span className="font-bold">Method: </span>{selectedRequest.httpMethod}</p>
          <p><span className="font-bold">Received At: </span>{new Date(selectedRequest.receivedAt).toLocaleString()}</p>
          <p><span className="font-bold">Headers: </span></p>
          <ul>
            {Object.entries(selectedRequest.headers).map(([key, values]) => (
              <li key={key}>
                <span className="font-bold">{key}: </span>{values.join(", ")}
              </li>
            ))}
          </ul>
          <p><span className="font-bold">Body: </span></p>
          {formatBody(selectedRequest.body)}
        </div>
      ) : (
        <p>Select a request to see details</p>
      )}
    </div>
  );
}