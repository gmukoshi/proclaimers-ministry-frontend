import React, { useState, useEffect, useRef } from 'react';
import { rosterService, notificationService } from '../../services/api';
import { Download, Share2, Filter, MessageCircle, Send, FileText, Loader2 } from 'lucide-react';

const MonthlyRoster = () => {
    const [rosterData, setRosterData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentMonth, setCurrentMonth] = useState({ month: 6, year: 2026 });
    const [isNotifying, setIsNotifying] = useState(null);
    const [isBulkNotifying, setIsBulkNotifying] = useState(false);
    const [bulkStatus, setBulkStatus] = useState(null); // { success, count }
    const printRef = useRef(null);

    useEffect(() => {
        const fetchRoster = async () => {
            setLoading(true);
            try {
                const data = await rosterService.getMonthly(currentMonth.year, currentMonth.month);

                // Group by date
                const grouped = data.reduce((acc, curr) => {
                    const date = curr.mass.date;
                    if (!acc[date]) acc[date] = { date, masses: [] };

                    const massIdx = acc[date].masses.findIndex(m => m.id === curr.mass.id);
                    if (massIdx > -1) {
                        acc[date].masses[massIdx].proclaimers.push({
                            id: curr.proclaimer?.id,
                            name: curr.proclaimer?.name || 'Unassigned',
                            status: curr.status,
                            is_fallback: curr.is_fallback,
                            assignment_id: curr.id,
                        });
                    } else {
                        acc[date].masses.push({
                            id: curr.mass.id,
                            time: curr.mass.time,
                            language: curr.mass.language,
                            proclaimers: [{
                                id: curr.proclaimer?.id,
                                name: curr.proclaimer?.name || 'Unassigned',
                                status: curr.status,
                                is_fallback: curr.is_fallback,
                                assignment_id: curr.id,
                            }]
                        });
                    }
                    return acc;
                }, {});

                setRosterData(Object.values(grouped));
            } catch (error) {
                console.error('Error fetching roster:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRoster();
    }, [currentMonth]);

    // ── BULK NOTIFY: opens exactly ONE tab ──
    const handleBulkNotify = async () => {
        setIsBulkNotifying(true);
        setBulkStatus(null);
        try {
            const response = await notificationService.bulkNotify(currentMonth.month, currentMonth.year);
            // Single tab — the combined link covers all proclaimers
            window.open(response.whatsapp_link, '_blank');
            setBulkStatus({ success: true, count: response.count });
        } catch (error) {
            console.error('Bulk notify error:', error);
            setBulkStatus({ success: false });
        } finally {
            setIsBulkNotifying(false);
        }
    };

    // ── INDIVIDUAL NOTIFY ──
    const handleNotifyIndividual = async (proclaimerId) => {
        if (!proclaimerId) return;
        setIsNotifying(proclaimerId);
        try {
            const response = await notificationService.notifyProclaimer(proclaimerId);
            window.open(response.whatsapp_link, '_blank');
        } catch (error) {
            console.error('Error notifying proclaimer:', error);
            alert('Failed to send notification.');
        } finally {
            setIsNotifying(null);
        }
    };

    // ── PDF EXPORT via browser print ──
    const handleDownloadPdf = () => {
        window.print();
    };

    const monthName = new Date(currentMonth.year, currentMonth.month - 1, 1)
        .toLocaleString('default', { month: 'long' });

    if (loading) return (
        <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            <Loader2 size={32} style={{ animation: 'spin 1s linear infinite' }} />
            <p style={{ marginTop: '1rem' }}>Loading Roster…</p>
        </div>
    );

    return (
        <>
            {/* ── Print-only header (hidden on screen) ── */}
            <div className="print-only" style={{ display: 'none' }}>
                <div style={{ textAlign: 'center', marginBottom: '1.5rem', borderBottom: '2px solid #333', paddingBottom: '1rem' }}>
                    <h1 style={{ margin: 0, fontSize: '1.4rem' }}>SMACC Proclaimers Ministry</h1>
                    <p style={{ margin: '0.25rem 0 0', fontSize: '0.9rem', color: '#555' }}>
                        Monthly Roster — {monthName} {currentMonth.year}
                    </p>
                </div>
            </div>

            <div id="roster-content" ref={printRef} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                {/* ── Screen-only header toolbar ── */}
                <div className="card glass no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <h3 style={{ margin: 0 }}>{monthName} {currentMonth.year} Roster</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', margin: '0.25rem 0 0' }}>
                            SMACC Proclaimers Ministry
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
                        {/* Month nav */}
                        <button
                            className="btn"
                            onClick={() => setCurrentMonth(m => ({
                                month: m.month === 1 ? 12 : m.month - 1,
                                year: m.month === 1 ? m.year - 1 : m.year
                            }))}
                            style={{ background: 'white', border: '1px solid var(--border)' }}
                        >← Prev</button>
                        <button
                            className="btn"
                            onClick={() => setCurrentMonth(m => ({
                                month: m.month === 12 ? 1 : m.month + 1,
                                year: m.month === 12 ? m.year + 1 : m.year
                            }))}
                            style={{ background: 'white', border: '1px solid var(--border)' }}
                        >Next →</button>

                        {/* PDF Export */}
                        <button
                            className="btn"
                            onClick={handleDownloadPdf}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'white', border: '1px solid var(--border)' }}
                            title="Download as PDF"
                        >
                            <FileText size={16} />
                            <span>Download PDF</span>
                        </button>

                        {/* Bulk WhatsApp — single tab */}
                        <button
                            className="btn btn-primary"
                            onClick={handleBulkNotify}
                            disabled={isBulkNotifying}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: isBulkNotifying ? 0.7 : 1 }}
                            title="Send bulk WhatsApp notification (opens one tab)"
                        >
                            {isBulkNotifying
                                ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
                                : <Share2 size={16} />
                            }
                            <span>{isBulkNotifying ? 'Preparing…' : 'Notify All (WhatsApp)'}</span>
                        </button>
                    </div>
                </div>

                {/* Bulk status feedback */}
                {bulkStatus && (
                    <div className="no-print" style={{
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--radius-md)',
                        background: bulkStatus.success ? '#e6f9ed' : '#fff0f0',
                        border: `1px solid ${bulkStatus.success ? '#34c759' : '#ff3b30'}`,
                        color: bulkStatus.success ? '#1a7a3a' : '#c0392b',
                        fontSize: '0.875rem'
                    }}>
                        {bulkStatus.success
                            ? `✅ WhatsApp opened with ${bulkStatus.count} assignments — one tab only!`
                            : '❌ Failed to prepare bulk notification. Please try again.'}
                    </div>
                )}

                {/* ── Roster body ── */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {rosterData.length === 0
                        ? <p style={{ color: 'var(--text-muted)', padding: '1rem' }}>No assignments found for this month.</p>
                        : rosterData.map((day, idx) => (
                            <div key={idx} className="card">
                                <h4 style={{ marginBottom: '1rem', color: 'var(--primary)', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
                                    {new Date(day.date).toDateString()}
                                </h4>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}>
                                    {day.masses.map((mass, mIdx) => (
                                        <div key={mIdx} style={{ padding: '1rem', background: 'var(--bg-app)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--primary)' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                                <span style={{ fontWeight: 700, fontSize: '1.05rem' }}>{mass.time}</span>
                                                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{mass.language}</span>
                                            </div>
                                            {mass.proclaimers.map((p, pIdx) => (
                                                <div key={pIdx} style={{ marginBottom: '0.75rem', paddingBottom: '0.5rem', borderBottom: '1px solid #f0f0f0' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0.25rem 0' }}>
                                                        <p style={{ margin: 0, fontWeight: 600, fontSize: '0.9rem' }}>{p.name}</p>
                                                        <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                                                            <span className={`badge ${p.status === 'Confirmed' ? 'badge-success' : 'badge-warning'}`} style={{ fontSize: '0.6rem' }}>{p.status}</span>
                                                            {p.id && (
                                                                <button
                                                                    className="no-print"
                                                                    onClick={() => handleNotifyIndividual(p.id)}
                                                                    disabled={isNotifying === p.id}
                                                                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, lineHeight: 1 }}
                                                                    title={`Notify ${p.name} via WhatsApp`}
                                                                >
                                                                    <MessageCircle size={14} color={isNotifying === p.id ? '#ccc' : '#25D366'} />
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                    {p.is_fallback && (
                                                        <p style={{ margin: 0, fontSize: '0.65rem', color: 'var(--warning)' }}>⚠️ Fallback Selection</p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                </div>
            </div>

            {/* ── Styles ── */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @media print {
                    .no-print { display: none !important; }
                    .print-only { display: block !important; }
                    body { background: white !important; color: black !important; }
                    .card, .card.glass {
                        box-shadow: none !important;
                        border: 1px solid #ddd !important;
                        break-inside: avoid;
                    }
                    #roster-content {
                        padding: 0 !important;
                    }
                    h4 { color: #1a1a2e !important; }
                    .badge { border: 1px solid #999 !important; }
                }
            `}} />
        </>
    );
};

export default MonthlyRoster;
