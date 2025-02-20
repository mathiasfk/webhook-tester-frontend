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
  displayField: string;
  setDisplayField: (field: string) => void;
}

export default function TabPanel({
  activeTab, requests, fetchRequests, selectedRequest, onRequestClick, displayField, setDisplayField
}: TabPanelProps) {

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
        displayField={displayField}
      />
      <RequestDetails
        selectedRequest={selectedRequest}
        setDisplayField={setDisplayField}
      />
    </div>
  );
}