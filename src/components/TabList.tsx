import { XMarkIcon, PlusIcon } from "@heroicons/react/16/solid";
import { Webhook } from "../types/Webhook";

interface TabListProps {
  tabs: Webhook[];
  activeTab: number;
  onTabSelect: (id: number) => void;
  onTabClose: (id: number) => void;
  onAddTab: () => void;
}

export default function TabList({ tabs, activeTab, onTabSelect, onTabClose, onAddTab }: TabListProps) {
  return (
    <div className="flex items-center">
      {tabs.map(tab => (
        <div 
          key={tab.id} 
          className={`flex items-center justify-between min-w-[100px] px-4 py-2 border rounded-t-md cursor-pointer ${
            activeTab === tab.id ? "bg-gray-300" : "bg-gray-100"
          }`}
          onClick={() => onTabSelect(tab.id)}
        >
          <span className="truncate">{tab.id}</span>
          <XMarkIcon 
            className="w-4 h-4 ml-2 cursor-pointer text-gray-600 hover:text-gray-800"
            onClick={(e) => { e.stopPropagation(); onTabClose(tab.id); }} 
          />
        </div>
      ))}
      <button 
        onClick={onAddTab} 
        className="ml-2 p-1 border rounded bg-gray-100 hover:bg-gray-200"
      >
        <PlusIcon className="w-6 h-6 text-gray-600" />
      </button>
    </div>
  );
}
