import React from 'react';
import { View } from '../types';
import { LayoutGrid, Users, PlusCircle, FileText, User } from 'lucide-react';

interface BottomNavProps {
  currentView: View;
  onNavigate: (view: View) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentView, onNavigate }) => {
  const navItems = [
    { view: View.WORKBENCH, label: '工作台', icon: LayoutGrid },
    { view: View.CUSTOMER_LIST, label: '客户', icon: Users },
    { view: View.WIZARD, label: '报单', icon: PlusCircle, isMain: true },
    { view: View.ORDER_LIST, label: '订单', icon: FileText },
    { view: View.TOOLS, label: '我的', icon: User }, // Using TOOLS as placeholder for 'Mine'
  ];

  return (
    <div className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-100 flex justify-around items-end pb-4 pt-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-30">
      {navItems.map((item) => {
        const isActive = currentView === item.view || (item.view === View.ORDER_LIST && currentView === View.ORDER_DETAIL) || (item.view === View.CUSTOMER_LIST && currentView === View.CUSTOMER_DETAIL);
        const Icon = item.icon;

        if (item.isMain) {
          return (
            <button 
              key={item.label}
              onClick={() => onNavigate(item.view)}
              className="relative -top-5"
            >
              <div className="w-14 h-14 rounded-full bg-pingan shadow-lg shadow-pingan/40 flex items-center justify-center text-white transition-transform active:scale-95">
                <Icon className="w-7 h-7" />
              </div>
              <span className="text-[10px] text-gray-500 font-medium absolute -bottom-5 w-full text-center left-0">
                {item.label}
              </span>
            </button>
          );
        }

        return (
          <button 
            key={item.label}
            onClick={() => onNavigate(item.view)}
            className={`flex flex-col items-center gap-1 w-12 transition-colors ${isActive ? 'text-pingan' : 'text-gray-400'}`}
          >
            <Icon className={`w-6 h-6 ${isActive ? 'fill-pingan/10' : ''}`} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default BottomNav;
