import React, { useState } from 'react';
import { View } from './types';
import Login from './components/Login';
import Workbench from './components/Workbench';
import CustomerProfile from './components/CustomerProfile';
import CustomerList from './components/CustomerList';
import ApplicationWizard from './components/ApplicationWizard';
import OrderCenter from './components/OrderCenter';
import Mine from './components/Mine';
import BottomNav from './components/BottomNav';
import { Users, LayoutGrid, FileText, Settings, CreditCard, ChevronLeft } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.LOGIN);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);

  const handleLogin = () => {
    setCurrentView(View.WORKBENCH);
  };

  const navigateTo = (view: View, params?: any) => {
    if (params?.customerId) {
      setSelectedCustomerId(params.customerId);
    }
    setCurrentView(view);
  };

  const renderContent = () => {
    switch (currentView) {
      case View.LOGIN:
        return <Login onLogin={handleLogin} />;
      case View.WORKBENCH:
        return <Workbench onNavigate={navigateTo} />;
      case View.CUSTOMER_LIST:
        return <CustomerList onNavigate={navigateTo} />;
      case View.CUSTOMER_DETAIL:
        return <CustomerProfile customerId={selectedCustomerId} onNavigate={navigateTo} onBack={() => navigateTo(View.CUSTOMER_LIST)} />;
      case View.WIZARD:
        return <ApplicationWizard onNavigate={navigateTo} onCancel={() => navigateTo(View.WORKBENCH)} />;
      case View.ORDER_LIST:
        return <OrderCenter onNavigate={navigateTo} />;
      case View.TOOLS: // "Mine" Tab
        return <Mine onNavigate={navigateTo} onLogout={() => setCurrentView(View.LOGIN)} />;
      default:
        return <Workbench onNavigate={navigateTo} />;
    }
  };

  const showBottomNav = currentView !== View.LOGIN && currentView !== View.WIZARD;

  return (
    <div className="min-h-screen bg-pingan-bg text-gray-800 font-sans max-w-md mx-auto relative shadow-2xl overflow-hidden">
      <main className={`h-full overflow-y-auto no-scrollbar ${showBottomNav ? 'pb-20' : ''}`}>
        {renderContent()}
      </main>
      
      {showBottomNav && (
        <BottomNav currentView={currentView} onNavigate={navigateTo} />
      )}
    </div>
  );
};

export default App;