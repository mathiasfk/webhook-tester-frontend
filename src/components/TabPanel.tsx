import { useEffect } from "react";
import { Webhook } from "../types/Webhook";
import { WebhookRequest } from "../types/WebhookRequest";

interface TabPanelProps {
  tabs: Webhook[];
  activeTab: number;
  requests: WebhookRequest[];
  fetchRequests: (webhookId: number) => void;
}

export default function TabPanel({ tabs, activeTab, requests, fetchRequests }: TabPanelProps) {
  const activeTabData = tabs.find(tab => tab.id === activeTab);

  useEffect(() => {
    if (activeTab) {
      fetchRequests(activeTab);
    }
  }, [activeTab, fetchRequests]);

  return (
    <div className="p-4 border rounded-lg">
      <p className="mb-2">Here we'll show the requests for {activeTabData?.url}</p>
      <ul>
        {requests.map(request => (
          <li className="border-1 bg-amber-200 mb-5" key={request.id}>
            <p><span>Method: </span><span className="font-bold">{request.httpMethod}</span></p>
            <p>Received At: <span className="font-bold">{request.receivedAt.toISOString()}</span></p>
            <p>Headers: {request.headers}</p>
            <p>Body: {request.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
