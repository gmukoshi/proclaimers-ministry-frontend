import React, { useState, useEffect } from 'react';
import { rosterService } from '../../services/api';
import { Download, Share2, Filter, Printer } from 'lucide-react';

const MonthlyRoster = () => {
    const [rosterData, setRosterData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentMonth, setCurrentMonth] = useState({ month: 6, year: 2026 });

    useEffect(() => {
        const fetchRoster = async () => {
            try {
                const data = await rosterService.getMonthly(currentMonth.year, currentMonth.month);

                // Group by date
                const grouped = data.reduce((acc, curr) => {
                    const date = curr.mass.date;
                    if (!acc[date]) acc[date] = { date, masses: [] };

                    // Group assignments for the same mass
                    const massIdx = acc[date].masses.findIndex(m => m.id === curr.mass.id);
                    if (massIdx > -1) {
                        acc[date].masses[massIdx].proclaimers.push({
                            name: curr.proclaimer?.name || "Unassigned",
                            status: curr.status,
                            is_fallback: curr.is_fallback
                        });
                    } else {
                        acc[date].masses.push({
                            id: curr.mass.id,
                            time: curr.mass.time,
                            language: curr.mass.language,
                            proclaimers: [{
                                name: curr.proclaimer?.name || "Unassigned",
                                status: curr.status,
                                is_fallback: curr.is_fallback
                            }]
                        });
                    }
                    return acc;
                }, {});

                setRosterData(Object.values(grouped));
            } catch (error) {
                console.error("Error fetching roster:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRoster();
    }, [currentMonth]);

    if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading Roster...</div>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="card glass" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h3>Published {currentMonth.month}/{currentMonth.year} Roster</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Dynamic Roster from Auto-Fill Engine</p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button className="btn" onClick={() => setCurrentMonth({ month: (currentMonth.month % 12) + 1, year: 2026 })} style={{ background: 'white', border: '1px solid var(--border)' }}>Next Month</button>
                    <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Share2 size={18} />
                        <span>Share to WhatsApp</span>
                    </button>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {rosterData.length === 0 ? <p>No assignments found for this month.</p> : rosterData.map((day, idx) => (
                    <div key={idx} className="card">
                        <h4 style={{ marginBottom: '1rem', color: 'var(--primary)', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
                            {new Date(day.date).toDateString()}
                        </h4>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                            {day.masses.map((mass, mIdx) => (
                                <div key={mIdx} style={{ padding: '1rem', background: 'var(--bg-app)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--primary)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                        <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{mass.time}</span>
                                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{mass.language}</span>
                                    </div>
                                    {mass.proclaimers.map((p, pIdx) => (
                                        <div key={pIdx} style={{ marginBottom: '0.5rem' }}>
                                            <p style={{ margin: '0.25rem 0', fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}>
                                                {p.name}
                                                <span className={`badge ${p.status === 'Confirmed' ? 'badge-success' : 'badge-warning'}`} style={{ fontSize: '0.6rem' }}>{p.status}</span>
                                            </p>
                                            {p.is_fallback && <p style={{ margin: 0, fontSize: '0.65rem', color: 'var(--warning)' }}>⚠️ Fallback Selection</p>}
                                        </div>
                                    ))}
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
