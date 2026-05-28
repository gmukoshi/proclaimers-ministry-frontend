import React from 'react';
import { Download, Share2, Filter, Printer } from 'lucide-react';

const MonthlyRoster = () => {
    const rosterData = [
        {
            date: 'Sun 05 July', masses: [
                { time: '7:00 AM', proclaimer: 'James Otieno', group: 'St. Jude SCC', status: 'Confirmed' },
                { time: '9:00 AM', proclaimer: 'Mary Akinyi', group: 'St. Monica SCC', status: 'Pending' },
                { time: '11:00 AM', proclaimer: 'Peter Kamau', group: 'Youth', status: 'Confirmed' }
            ]
        },
        {
            date: 'Sun 12 July', masses: [
                { time: '7:00 AM', proclaimer: 'Ann Wanjiru', group: 'St. Jude SCC', status: 'Confirmed' },
                { time: '9:00 AM', proclaimer: 'John Musyoka', group: 'St. Monica SCC', status: 'Confirmed' },
                { time: '11:00 AM', proclaimer: 'Lucy Kwamboka', group: 'Youth', status: 'Pending' }
            ]
        }
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="card glass" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h3>Published July 2026 Roster</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Finalized on June 28, 2026</p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button className="btn" style={{ background: 'white', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Filter size={18} />
                        <span>Filter</span>
                    </button>
                    <button className="btn" style={{ background: 'white', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Printer size={18} />
                        <span>Print PDF</span>
                    </button>
                    <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Share2 size={18} />
                        <span>Share to WhatsApp</span>
                    </button>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {rosterData.map((day, idx) => (
                    <div key={idx} className="card">
                        <h4 style={{ marginBottom: '1rem', color: 'var(--primary)', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
                            {day.date}
                        </h4>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                            {day.masses.map((mass, mIdx) => (
                                <div key={mIdx} style={{ padding: '1rem', background: 'var(--bg-app)', borderRadius: 'var(--radius-md)', borderLeft: `4px solid ${mass.status === 'Confirmed' ? 'var(--success)' : 'var(--warning)'}` }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                        <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{mass.time}</span>
                                        <span className={`badge ${mass.status === 'Confirmed' ? 'badge-success' : 'badge-warning'}`}>{mass.status}</span>
                                    </div>
                                    <p style={{ margin: '0.25rem 0', fontWeight: 600 }}>{mass.proclaimer}</p>
                                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>{mass.group}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MonthlyRoster;
