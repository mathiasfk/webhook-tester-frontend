import { useState, useEffect } from "react";
import { Webhook } from "../types/Webhook";
import { WebhookRequest } from "../types/WebhookRequest";
import { apiService } from "../services/apiService";

interface TabPanelProps {
  tabs: Webhook[];
  activeTab: number;
}

export default function TabPanel({ tabs, activeTab }: TabPanelProps) {
  const [requests, setRequests] = useState<WebhookRequest[]>([]);
  const [loadedTabs, setLoadedTabs] = useState<Set<number>>(new Set());

  const activeTabData = tabs.find(tab => tab.id === activeTab);

  useEffect(() => {
    const fetchRequests = async () => {
      if (activeTab && !loadedTabs.has(activeTab)) {
        try {
          const data = await apiService.fetchRequests(activeTab.toString());
          setRequests(data.sort((a, b) => b.receivedAt.getTime() - a.receivedAt.getTime()));
          setLoadedTabs(prev => new Set(prev).add(activeTab));
        } catch (error) {
          console.error("Failed to fetch requests:", error);
        }
      }
    };

    fetchRequests();
  }, [activeTab, loadedTabs]);

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
