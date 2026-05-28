import React from 'react';
import MassAnimationSchedule from '../features/admin/MassAnimationSchedule';
import AutoFillDashboard from '../features/secretary/AutoFillDashboard';
import MonthlyRoster from '../features/secretary/MonthlyRoster';
import ProclaimerPortal from '../features/portal/ProclaimerPortal';
import MinistryIntelligence from '../features/analytics/MinistryIntelligence';

// Common Dashboard Card Component
export const DashboardCard = ({ title, value, icon: Icon, trend, color }) => (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 500 }}>{title}</span>
            <div style={{ padding: '0.5rem', borderRadius: '8px', backgroundColor: `${color}15`, color: color }}>
                <Icon size={20} />
            </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
            <h3 style={{ fontSize: '1.5rem', margin: 0 }}>{value}</h3>
            {trend && <span style={{ fontSize: '0.75rem', color: 'var(--success)', fontWeight: 600 }}>{trend}</span>}
        </div>
    </div>
);

// Feature Exports
export {
    MassAnimationSchedule,
    AutoFillDashboard,
    MonthlyRoster,
    ProclaimerPortal,
    MinistryIntelligence
};

export const Dashboard = () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
        <DashboardCard title="Active Proclaimers" value="124" icon={() => <span>👥</span>} trend="+5.2%" color="#4a148c" />
        <DashboardCard title="Masses This Month" value="48" icon={() => <span>⛪</span>} color="#ffd700" />
        <DashboardCard title="Coverage Rate" value="98.5%" icon={() => <span>✅</span>} color="#2e7d32" />
        <DashboardCard title="Pending Swaps" value="3" icon={() => <span>🔄</span>} color="#f57c00" />
    </div>
);
