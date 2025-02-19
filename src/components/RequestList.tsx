import { WebhookRequest } from "../types/WebhookRequest";

interface RequestListProps {
  requests: WebhookRequest[];
  selectedRequest: WebhookRequest | null;
  onRequestClick: (request: WebhookRequest) => void;
}

export default function RequestList({ requests, selectedRequest, onRequestClick }: RequestListProps) {
  return (
    <div className="w-1/3 border-r pr-4 overflow-y-auto">
      <p className="text-xl font-bold mb-2">Requests</p>
      <ul>
        {requests.map(request => (
          <li 
            key={request.id} 
            className={`border-1 mb-2 p-2 cursor-pointer ${selectedRequest?.id === request.id ? 'bg-amber-300' : 'bg-amber-200'}`}
            onClick={() => onRequestClick(request)}
          >
            <p><span>Method: </span><span className="font-bold">{request.httpMethod}</span></p>
            <p>Received At: <span className="font-bold">{new Date(request.receivedAt).toLocaleString()}</span></p>
          </li>
        ))}
      </ul>
    </div>
  );
}