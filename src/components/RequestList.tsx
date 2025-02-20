import { WebhookRequest } from "../types/WebhookRequest";

interface RequestListProps {
  requests: WebhookRequest[];
  selectedRequest: WebhookRequest | null;
  onRequestClick: (request: WebhookRequest) => void;
  displayField: string;
}

const getValueByPath = (obj: any, path: string): any => {
  return path.split('.').reduce((acc, part) => {
    if (acc && part === 'body' && typeof acc[part] === 'string') {
      try {
        return JSON.parse(acc[part]);
      } catch (e) {
        return undefined;
      }
    }
    return acc && acc[part];
  }, obj);
};

export default function RequestList({ requests, selectedRequest, onRequestClick, displayField }: RequestListProps) {
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
            <p>
              {displayField === "receivedAt" ? (
                <>
                  <span>Received At: </span>
                  <span className="font-bold">{new Date(request.receivedAt).toLocaleString()}</span>
                </>
              ) : (
                <>
                  <span>{displayField}: </span>
                  <span className="font-bold">{getValueByPath(request, displayField) || ""}</span>
                </>
              )}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}