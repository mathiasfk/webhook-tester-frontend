import { useState } from "react";
import TabList from "./TabList";
import TabPanel from "./TabPanel";

export default function TabsContainer() {
  const [tabs, setTabs] = useState([{ id: 1, label: "Tab 1" }]);
  const [activeTab, setActiveTab] = useState(1);

  const addTab = () => {
    const newId = tabs.length ? Math.max(...tabs.map(t => t.id)) + 1 : 1;
    setTabs([...tabs, { id: newId, label: `Tab ${newId}` }]);
    setActiveTab(newId);
  };

  const removeTab = (id: number) => {
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
        activeTab={activeTab} 
        onTabSelect={setActiveTab} 
        onTabClose={removeTab} 
        onAddTab={addTab} 
      />
      <TabPanel tabs={tabs} activeTab={activeTab} />
    </div>
  );
}
