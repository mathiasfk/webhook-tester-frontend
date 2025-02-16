import { Webhook } from "../types/Webhook";

interface TabPanelProps {
    tabs: Webhook[];
    activeTab: number;
  }
  
  export default function TabPanel({ tabs, activeTab }: TabPanelProps) {
    const activeTabData = tabs.find(tab => tab.id === activeTab);
  
    return (
      <div className="p-4 border rounded-lg">
        <p>Here we'll show the requests for {activeTabData?.url}</p>
      </div>
    );
  }
  