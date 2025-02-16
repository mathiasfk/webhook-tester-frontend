interface TabPanelProps {
    tabs: { id: number; label: string }[];
    activeTab: number;
  }
  
  export default function TabPanel({ tabs, activeTab }: TabPanelProps) {
    const activeTabData = tabs.find(tab => tab.id === activeTab);
  
    return (
      <div className="p-4 border rounded-lg">
        <h2 className="text-lg font-semibold">{activeTabData?.label}</h2>
        <p>Conteúdo para {activeTabData?.label}</p>
      </div>
    );
  }
  