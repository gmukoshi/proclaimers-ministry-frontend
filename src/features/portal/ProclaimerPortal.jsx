import React from 'react';
import { Calendar, CheckCircle2, XCircle, RefreshCw, MessageSquare } from 'lucide-react';

const ProclaimerPortal = () => {
    const myAssignments = [
        { id: 1, date: 'Sunday, July 12, 2026', time: '9:00 AM Mass', role: '1st Reading', status: 'Pending', massDetails: 'St. Monica SCC Animation' },
        { id: 2, date: 'Sunday, July 26, 2026', time: '11:00 AM Mass', role: '2nd Reading', status: 'Confirmed', massDetails: 'Youth Animation' },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px' }}>
            <div className="card glass" style={{ borderLeft: '5px solid var(--primary)' }}>
                <h3>Welcome, Mary Akinyi</h3>
                <p style={{ color: 'var(--text-muted)' }}>You have 1 pending assignment requiring confirmation.</p>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <div className="card" style={{ flex: 1, padding: '1rem', textAlign: 'center', background: 'var(--bg-app)' }}>
                        <h4 style={{ margin: 0 }}>85</h4>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Reliability Score</span>
                    </div>
                    <div className="card" style={{ flex: 1, padding: '1rem', textAlign: 'center', background: 'var(--bg-app)' }}>
                        <h4 style={{ margin: 0 }}>12</h4>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total Readings</span>
                    </div>
                    <div className="card" style={{ flex: 1, padding: '1rem', textAlign: 'center', background: 'var(--bg-app)' }}>
                        <h4 style={{ margin: 0 }}>July</h4>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Next Month</span>
                    </div>
                </div>
            </div>

            <div>
                <h4 style={{ marginBottom: '1rem' }}>My Assignments</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {myAssignments.map((job) => (
                        <div key={job.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                <div style={{ padding: '0.75rem', background: 'var(--bg-app)', borderRadius: 'var(--radius-md)', color: 'var(--primary)', textAlign: 'center', minWidth: '60px' }}>
                                    <Calendar size={20} style={{ margin: '0 auto' }} />
                                    <p style={{ fontSize: '0.7rem', fontWeight: 700, margin: '0.25rem 0 0 0' }}>JULY</p>
                                </div>
                                <div>
                                    <h4 style={{ margin: 0 }}>{job.date}</h4>
                                    <p style={{ margin: 0, fontWeight: 600, color: 'var(--primary)' }}>{job.time} — {job.role}</p>
                                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>{job.massDetails}</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                {job.status === 'Pending' ? (
                                    <>
                                        <button className="btn" style={{ background: '#ffebee', color: 'var(--error)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                            <XCircle size={18} />
                                            <span>Decline</span>
                                        </button>
                                        <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                            <CheckCircle2 size={18} />
                                            <span>Confirm</span>
                                        </button>
                                    </>
                                ) : (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <span className="badge badge-success">Confirmed</span>
                                        <button className="btn" style={{ background: 'var(--bg-app)', border: '1px solid var(--border)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                            <RefreshCw size={16} />
                                            <span>Request Swap</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="card" style={{ background: 'var(--primary-dark)', color: 'white' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h4 style={{ color: 'white' }}>Need Help?</h4>
                        <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)', margin: 0 }}>Contact the Proclaimers Secretary for manual changes.</p>
                    </div>
                    <button className="btn btn-accent">
                        <MessageSquare size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProclaimerPortal;
