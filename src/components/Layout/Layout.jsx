import React from 'react';
import {
    Calendar,
    Users,
    CheckCircle,
    BarChart3,
    Settings,
    Bell,
    Menu,
    ShieldCheck,
    LayoutDashboard
} from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
    <div
        onClick={onClick}
        className={`flex items-center gap-3 p-3 cursor-pointer rounded-lg transition-all ${active ? 'bg-primary text-white' : 'text-gray-500 hover:bg-gray-100'
            }`}
        style={{
            backgroundColor: active ? 'var(--primary)' : 'transparent',
            color: active ? 'white' : 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem',
            cursor: 'pointer',
            borderRadius: 'var(--radius-md)',
            transition: 'all 0.2s ease',
            marginBottom: '0.5rem'
        }}
    >
        <Icon size={20} />
        <span style={{ fontWeight: 500 }}>{label}</span>
    </div>
);

const Layout = ({ children, activeTab, setActiveTab }) => {
    const menuItems = [
        { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { id: 'mass-animation', icon: Calendar, label: 'Mass Animation' },
        { id: 'auto-fill', icon: CheckCircle, label: 'Auto-Fill Engine' },
        { id: 'roster', icon: Users, label: 'Monthly Roster' },
        { id: 'analytics', icon: BarChart3, label: 'Intelligence' },
        { id: 'portal', icon: ShieldCheck, label: 'Proclaimer Portal' },
    ];

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-app)' }}>
            {/* Sidebar */}
            <aside style={{
                width: '280px',
                backgroundColor: 'white',
                borderRight: '1px solid var(--border)',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                position: 'fixed',
                height: '100vh'
            }}>
                <div style={{ marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: 'var(--primary)',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                    }}>
                        <ShieldCheck size={24} />
                    </div>
                    <div>
                        <h1 style={{ fontSize: '1.2rem', lineHeight: '1.1', margin: 0 }}>Proclaimers</h1>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>ST. MICHAEL LANGATA</span>
                    </div>
                </div>

                <nav style={{ flex: 1 }}>
                    {menuItems.map((item) => (
                        <SidebarItem
                            key={item.id}
                            icon={item.icon}
                            label={item.label}
                            active={activeTab === item.id}
                            onClick={() => setActiveTab(item.id)}
                        />
                    ))}
                </nav>

                <div style={{ padding: '1rem', background: 'var(--bg-app)', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary-light)' }}></div>
                        <div>
                            <p style={{ fontSize: '0.875rem', fontWeight: 600, margin: 0 }}>Secretary</p>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>Admin Role</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{ marginLeft: '280px', flex: 1, padding: '2rem' }}>
                <header style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '2rem'
                }}>
                    <div>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '0.25rem' }}>
                            {menuItems.find(i => i.id === activeTab)?.label}
                        </h2>
                        <p style={{ color: 'var(--text-muted)' }}>Welcome back, Proclaimers Ministry Dashboard</p>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <button className="btn" style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Bell size={20} color="var(--text-muted)" />
                        </button>
                        <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Calendar size={18} />
                            <span>July 2026</span>
                        </button>
                    </div>
                </header>

                <div style={{ animation: 'fadeIn 0.5s ease' }}>
                    {children}
                </div>
            </main>

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
        </div>
    );
};

export default Layout;
