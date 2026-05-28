import React, { useState } from 'react';
import Layout from './components/Layout/Layout';
import {
  Dashboard,
  MassAnimationSchedule,
  AutoFillDashboard,
  MonthlyRoster,
  MinistryIntelligence,
  ProclaimerPortal
} from './components/Features';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'mass-animation':
        return <MassAnimationSchedule />;
      case 'auto-fill':
        return <AutoFillDashboard />;
      case 'roster':
        return <MonthlyRoster />;
      case 'analytics':
        return <MinistryIntelligence />;
      case 'portal':
        return <ProclaimerPortal />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      <div style={{ paddingBottom: '2rem' }}>
        {renderContent()}
      </div>
    </Layout>
  );
}

export default App;
