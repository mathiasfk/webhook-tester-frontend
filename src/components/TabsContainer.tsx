import { useState, useEffect } from "react";
import TabList from "./TabList";
import TabPanel from "./TabPanel";
import { apiService } from "../services/apiService";
import { Webhook } from "../types/Webhook";

export default function TabsContainer() {
  const [tabs, setTabs] = useState<Webhook[]>([]);
  const [activeTab, setActiveTab] = useState<number | null>(null);

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

  const addTab = async () => {
    try {
      const newTab = await apiService.createTab();
      setTabs(prevTabs => [...prevTabs, newTab]);
      setActiveTab(newTab.id);
    } catch (error) {
      console.error("Failed to create tab:", error);
    }
  };

  const removeTab = async (id: number) => {
    try {
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
    } catch (error) {
      console.error("Failed to delete tab:", error);
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
