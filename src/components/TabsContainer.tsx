import { useState, useEffect } from "react";
import TabList from "./TabList";
import TabPanel from "./TabPanel";
import { apiService } from "../services/apiService";

export default function TabsContainer() {
  const [tabs, setTabs] = useState<{ id: number; url: string }[]>([]);
  const [activeTab, setActiveTab] = useState<number | null>(null);

  useEffect(() => {
    async function fetchTabs() {
      try {
        const data = await apiService.fetchWithAuth("/webhooks");
        setTabs(data);
        if (data.length > 0) {
          setActiveTab(data[0].id); // TODO: type safety
        }
      } catch (error) {
        console.error("Failed to fetch tabs:", error);
      }
    }

    fetchTabs();
  }, []);

  const addTab = () => {
    const newId = tabs.length ? Math.max(...tabs.map(t => t.id)) + 1 : 1;
    // setTabs([...tabs, { id: newId, label: `Tab ${newId}` }]);
    setActiveTab(newId);
  };

  const removeTab = (id: number) => {
    if (tabs.length === 1) return;
    const newTabs = tabs.filter(tab => tab.id !== id);
    setTabs(newTabs);
    if (activeTab === id) {
      setActiveTab(newTabs[0].id);
    }
  };

  return (
    <div className="p-4">
      <TabList 
        tabs={tabs} 
        activeTab={activeTab || 0} //TODO: when no page exists, create a new one
        onTabSelect={setActiveTab} 
        onTabClose={removeTab} 
        onAddTab={addTab} 
      />
      <TabPanel tabs={tabs} activeTab={activeTab || 0} />
    </div>
  );
}
