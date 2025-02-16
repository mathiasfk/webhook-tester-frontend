interface TabPanelProps {
    tabs: { id: number; url: string }[]; //TODO: extract to a shared type
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
  