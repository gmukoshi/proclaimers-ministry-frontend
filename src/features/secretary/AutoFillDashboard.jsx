import React, { useState } from 'react';
import { Sparkles, CheckCircle2, AlertTriangle, UserPlus, RefreshCcw, Send } from 'lucide-react';

const AutoFillDashboard = () => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [generationComplete, setGenerationComplete] = useState(false);

    const [fallbacks, setFallbacks] = useState([
        { id: 1, mass: 'Sunday 9AM', originalGroup: 'St. Monica SCC', assignedProclaimer: 'James Otieno', reason: 'No certified members available in St. Monica SCC', status: 'Pending Review' }
    ]);

    const handleGenerate = () => {
        setIsGenerating(true);
        setTimeout(() => {
            setIsGenerating(false);
            setGenerationComplete(true);
        }, 2500);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Top Action Bar */}
            <div className="card glass" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h3>July 2026 Roster Engine</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Status: {generationComplete ? 'Generated' : 'Ready to generate'}</p>
                </div>
                <button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="btn btn-primary"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.8rem 1.5rem', opacity: isGenerating ? 0.7 : 1 }}
                >
                    {isGenerating ? <RefreshCcw size={18} className="animate-spin" /> : <Sparkles size={18} />}
                    <span>{isGenerating ? 'Analyzing Eligibility...' : 'Auto-Generate Monthly Roster'}</span>
                </button>
            </div>

            {/* Stats and Info */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem' }}>
                <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <h4>Rules & Intelligence</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <CheckCircle2 size={20} color="var(--success)" />
                            <div>
                                <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>Fair Rotation Enabled</p>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Prioritizing proclaimers with lower monthly loads.</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <CheckCircle2 size={20} color="var(--success)" />
                            <div>
                                <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>Certification Guard</p>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Only active, certified members are eligible.</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <AlertTriangle size={20} color="var(--warning)" />
                            <div>
                                <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>Fallback Protocol</p>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Cross-parish assignment if SCC representation fails.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h4>Fallback Assignments (Attention Required)</h4>
                        <span className="badge badge-error">{fallbacks.length} Issues Found</span>
                    </div>
                    {fallbacks.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {fallbacks.map(fallback => (
                                <div key={fallback.id} style={{ padding: '1rem', border: '1px solid #ffebee', background: '#fff9f9', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                            <span style={{ fontWeight: 700, color: 'var(--error)' }}>FALLBACK</span>
                                            <span style={{ fontWeight: 500 }}>{fallback.mass} Mass</span>
                                        </div>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                            <strong>{fallback.originalGroup}</strong> representation failed. Assigned <strong>{fallback.assignedProclaimer}</strong> (Parish-wide pool).
                                        </p>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>Reason: {fallback.reason}</p>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button className="btn" style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem', background: 'white', border: '1px solid var(--border)' }}>Swap</button>
                                        <button className="btn btn-primary" style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem' }}>Approve</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>No fallback assignments detected for this month.</p>
                    )}
                </div>
            </div>

            {/* Generation History / Preview */}
            <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3>Draft Monthly Preview</h3>
                    <button className="btn btn-accent" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Send size={18} />
                        <span>Publish Monthly Roster</span>
                    </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} style={{ padding: '1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                                <div>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>Sunday 12 July</p>
                                    <p style={{ fontWeight: 700, margin: 0 }}>9:00 AM Mass</p>
                                </div>
                                <span className="badge badge-info" style={{ fontSize: '0.6rem' }}>St. Monica</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--primary-light)' }}></div>
                                <p style={{ fontWeight: 600, margin: 0, fontSize: '0.9rem' }}>Mary Akinyi</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}} />
        </div>
    );
};

export default AutoFillDashboard;
