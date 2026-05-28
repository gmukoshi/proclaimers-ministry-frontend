import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { TrendingUp, Users, AlertCircle, Award } from 'lucide-react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement
);

const MinistryIntelligence = () => {
    const coverageData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Coverage Rate (%)',
                data: [95, 98, 97, 99, 94, 98.5],
                borderColor: '#4a148c',
                backgroundColor: 'rgba(74, 20, 140, 0.1)',
                tension: 0.4,
                fill: true,
            },
        ],
    };

    const sccParticipationData = {
        labels: ['St. Jude', 'St. Monica', 'Youth', 'Legion of Mary', 'Others'],
        datasets: [
            {
                label: 'Participation',
                data: [35, 25, 20, 15, 5],
                backgroundColor: [
                    '#4a148c',
                    '#7c43bd',
                    '#ffd700',
                    '#c7a500',
                    '#e0e0e0',
                ],
            },
        ],
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Top Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
                <div className="card" style={{ borderTop: '4px solid var(--primary)' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <div style={{ background: 'var(--bg-app)', padding: '0.75rem', borderRadius: '50%' }}><TrendingUp size={24} color="var(--primary)" /></div>
                        <div>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>Coverage Rate</p>
                            <h3 style={{ margin: 0 }}>98.5%</h3>
                        </div>
                    </div>
                </div>
                <div className="card" style={{ borderTop: '4px solid var(--accent)' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <div style={{ background: 'var(--bg-app)', padding: '0.75rem', borderRadius: '50%' }}><AlertCircle size={24} color="var(--warning)" /></div>
                        <div>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>Fallback Rate</p>
                            <h3 style={{ margin: 0 }}>4.2%</h3>
                        </div>
                    </div>
                </div>
                <div className="card" style={{ borderTop: '4px solid var(--success)' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <div style={{ background: 'var(--bg-app)', padding: '0.75rem', borderRadius: '50%' }}><Users size={24} color="var(--success)" /></div>
                        <div>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>Active Members</p>
                            <h3 style={{ margin: 0 }}>142</h3>
                        </div>
                    </div>
                </div>
                <div className="card" style={{ borderTop: '4px solid var(--info)' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <div style={{ background: 'var(--bg-app)', padding: '0.75rem', borderRadius: '50%' }}><Award size={24} color="var(--info)" /></div>
                        <div>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>Avg. Reliability</p>
                            <h3 style={{ margin: 0 }}>92%</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Charts */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
                <div className="card">
                    <h4>Coverage Trend (Last 6 Months)</h4>
                    <div style={{ height: '300px', marginTop: '1.5rem' }}>
                        <Line
                            data={coverageData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                scales: {
                                    y: { beginAtZero: false, min: 90 },
                                    x: { grid: { display: false } }
                                }
                            }}
                        />
                    </div>
                </div>
                <div className="card">
                    <h4>SCC Participation Distribution</h4>
                    <div style={{ height: '300px', marginTop: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                        <Pie
                            data={sccParticipationData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: { position: 'bottom' }
                                }
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Bottom Insights */}
            <div className="card" style={{ background: 'linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%)', color: 'white' }}>
                <h4 style={{ color: 'white', marginBottom: '1rem' }}>Ministry Intelligence Insights</h4>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', fontSize: '0.9rem' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)' }}></div>
                        St. Monica SCC participation has increased by 15% since fairness rotation was enabled.
                    </li>
                    <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', fontSize: '0.9rem' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)' }}></div>
                        Fallback assignments are most frequent for late-night or holiday Masses.
                    </li>
                    <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', fontSize: '0.9rem' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)' }}></div>
                        Youth members show the highest confirmation speed (avg. 4 hours).
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default MinistryIntelligence;
