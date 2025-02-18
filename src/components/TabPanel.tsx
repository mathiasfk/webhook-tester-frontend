import { useEffect } from "react";
import { Webhook } from "../types/Webhook";
import { WebhookRequest } from "../types/WebhookRequest";

interface TabPanelProps {
  tabs: Webhook[];
  activeTab: number;
  requests: WebhookRequest[];
  fetchRequests: (webhookId: number) => void;
  selectedRequest: WebhookRequest | null;
  onRequestClick: (webhookId: number, request: WebhookRequest) => void;
}

export default function TabPanel({ tabs, activeTab, requests, fetchRequests, selectedRequest, onRequestClick }: TabPanelProps) {
  const activeTabData = tabs.find(tab => tab.id === activeTab);

  useEffect(() => {
    if (activeTab) {
      fetchRequests(activeTab);
    }
  }, [activeTab, fetchRequests]);

  return (
    <div className="p-4 border rounded-lg flex flex-grow h-full overflow-hidden">
      <div className="w-1/3 border-r pr-4 overflow-y-auto">
        <p className="mb-2">Requests for {activeTabData?.url}</p>
        <ul>
          {requests.map(request => (
            <li 
              key={request.id} 
              className={`border-1 mb-2 p-2 cursor-pointer ${selectedRequest?.id === request.id ? 'bg-amber-300' : 'bg-amber-200'}`}
              onClick={() => onRequestClick(activeTab, request)}
            >
              <p><span>Method: </span><span className="font-bold">{request.httpMethod}</span></p>
              <p>Received At: <span className="font-bold">{new Date(request.receivedAt).toLocaleString()}</span></p>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-2/3 pl-4 overflow-y-auto">
        {selectedRequest ? (
          <div>
            <h2 className="text-xl font-bold mb-2">Request Details</h2>
            <p><span className="font-bold">Method: </span>{selectedRequest.httpMethod}</p>
            <p><span className="font-bold">Received At: </span>{new Date(selectedRequest.receivedAt).toLocaleString()}</p>
            <p><span className="font-bold">Headers: </span>{selectedRequest.headers}</p>
            <p><span className="font-bold">Body: </span>{selectedRequest.body}</p>
          </div>
        ) : (
          <p>Select a request to see details</p>
        )}
      </div>
    </div>
  );
}
