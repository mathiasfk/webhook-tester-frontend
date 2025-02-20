import { WebhookRequest } from "../types/WebhookRequest";
import JsonViewer from "./JsonViewer";

interface RequestDetailsProps {
  selectedRequest: WebhookRequest | null;
}

export default function RequestDetails({ selectedRequest }: RequestDetailsProps) {
  const handleFieldClick = (path: string, value: any) => {
    console.log(`Field clicked: ${path}`, value);
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
          <JsonViewer json={selectedRequest.body} onFieldClick={handleFieldClick} />
        </div>
      ) : (
        <p>Select a request to see details</p>
      )}
    </div>
  );
}