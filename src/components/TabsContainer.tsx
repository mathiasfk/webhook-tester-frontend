import { useState, useEffect } from "react";
import TabList from "./TabList";
import TabPanel from "./TabPanel";
import { apiService } from "../services/apiService";
import { Webhook } from "../types/Webhook";
import { WebhookRequest } from "../types/WebhookRequest";

export default function TabsContainer() {
  const [tabs, setTabs] = useState<Webhook[]>([]);
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const [requests, setRequests] = useState<{ [key: number]: WebhookRequest[] }>({});
  const [eventSources, setEventSources] = useState<{ [key: number]: EventSource }>({});
  const [selectedRequests, setSelectedRequests] = useState<{ [key: number]: WebhookRequest | null }>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTabs() {
      try {
        const data = await apiService.fetchTabs();
        setTabs(data);
        if (data.length > 0) {
          setActiveTab(data[0].id);
        }
      } catch (error) {
        console.error("Failed to fetch tabs:", error);
      }
    }

    fetchTabs();
  }, []);

  useEffect(() => {
    if (activeTab !== null && !eventSources[activeTab]) {
      const newEventSource = apiService.openSSEConnection(activeTab, (newRequest) => {
        setRequests(prevRequests => ({
          ...prevRequests,
          [activeTab]: [newRequest, ...(prevRequests[activeTab] || [])]
        }));
      });

      setEventSources(prevEventSources => ({
        ...prevEventSources,
        [activeTab]: newEventSource
      }));
    }
  }, [activeTab, eventSources]);

  const addTab = async () => {
    if (tabs.length >= 3) {
      setError("You can only have a maximum of 3 tabs active at a time.");
      return;
    }

    try {
      const newTab = await apiService.createTab();
      setTabs(prevTabs => [...prevTabs, newTab]);
      setActiveTab(newTab.id);
      setError(null); // Clear any previous error
    } catch (error) {
      console.error("Failed to create tab:", error);
    }
  };

  const removeTab = async (id: number) => {
    try {
      if (eventSources[id]) {
        eventSources[id].close();
        setEventSources(prevEventSources => {
          const newEventSources = { ...prevEventSources };
          delete newEventSources[id];
          return newEventSources;
        });
      }

      await apiService.deleteTab(id);
      setTabs(prevTabs => {
        const newTabs = prevTabs.filter(tab => tab.id !== id);
        if (newTabs.length > 0) {
          if (activeTab === id) {
            setActiveTab(newTabs[0].id);
          }
        } else {
          setActiveTab(null);
        }
        return newTabs;
      });
      setRequests(prevRequests => {
        const newRequests = { ...prevRequests };
        delete newRequests[id];
        return newRequests;
      });
      setSelectedRequests(prevSelectedRequests => {
        const newSelectedRequests = { ...prevSelectedRequests };
        delete newSelectedRequests[id];
        return newSelectedRequests;
      });
    } catch (error) {
      console.error("Failed to delete tab:", error);
    }
  };

  const fetchRequests = async (webhookId: number) => {
    if (!requests[webhookId]) {
      try {
        const data = await apiService.fetchRequests(webhookId.toString());
        setRequests(prevRequests => ({
          ...prevRequests,
          [webhookId]: data.sort((a, b) => b.receivedAt.getTime() - a.receivedAt.getTime())
        }));
      } catch (error) {
        console.error("Failed to fetch requests:", error);
      }
    }
  };

  const handleRequestClick = (webhookId: number, request: WebhookRequest) => {
    setSelectedRequests(prevSelectedRequests => ({
      ...prevSelectedRequests,
      [webhookId]: request
    }));
  };

  return (
    <div className="p-4">
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <TabList 
        tabs={tabs} 
        activeTab={activeTab || 0} 
        onTabSelect={setActiveTab} 
        onTabClose={removeTab} 
        onAddTab={addTab} 
      />
      <TabPanel 
        tabs={tabs} 
        activeTab={activeTab || 0} 
        requests={requests[activeTab || 0] || []} 
        fetchRequests={fetchRequests} 
        selectedRequest={selectedRequests[activeTab || 0] || null}
        onRequestClick={handleRequestClick}
      />
    </div>
  );
}
