import { useEffect } from "react";
import { Webhook } from "../types/Webhook";
import { WebhookRequest } from "../types/WebhookRequest";
import RequestList from "./RequestList";
import RequestDetails from "./RequestDetails";

interface TabPanelProps {
  tabs: Webhook[];
  activeTab: number;
  requests: WebhookRequest[];
  fetchRequests: (webhookId: number) => void;
  selectedRequest: WebhookRequest | null;
  onRequestClick: (webhookId: number, request: WebhookRequest) => void;
}

export default function TabPanel({ activeTab, requests, fetchRequests, selectedRequest, onRequestClick }: TabPanelProps) {

  useEffect(() => {
    if (activeTab) {
      fetchRequests(activeTab);
    }
  }, [activeTab, fetchRequests]);

  return (
    <div className="p-4 border rounded-lg flex flex-grow h-full overflow-hidden">
      <RequestList 
        requests={requests} 
        selectedRequest={selectedRequest} 
        onRequestClick={(request) => onRequestClick(activeTab, request)} 
      />
      <RequestDetails selectedRequest={selectedRequest} />
    </div>
  );
}