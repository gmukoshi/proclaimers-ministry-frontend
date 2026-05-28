import React, { useState } from 'react';
import { Plus, Calendar, Save, Trash2, Clock } from 'lucide-react';

const MassAnimationSchedule = () => {
    const [schedule, setSchedule] = useState([
        { id: 1, occasion: 'Sunday 7AM', group: 'St. Jude SCC', languange: 'English', notes: 'Standard Mass' },
        { id: 2, occasion: 'Sunday 9AM', group: 'St. Monica SCC', languange: 'Swahili', notes: 'Choir Animation' },
        { id: 3, occasion: 'Sunday 11AM', group: 'Youth', languange: 'English', notes: 'Youth Mass' },
    ]);

    const [newEntry, setNewEntry] = useState({ occasion: '', group: '', languange: 'English', notes: '' });

    const addEntry = () => {
        if (newEntry.occasion && newEntry.group) {
            setSchedule([...schedule, { ...newEntry, id: Date.now() }]);
            setNewEntry({ occasion: '', group: '', languange: 'English', notes: '' });
        }
    };

    const removeEntry = (id) => {
        setSchedule(schedule.filter(item => item.id !== id));
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="card glass">
                <h3 style={{ marginBottom: '1.5rem' }}>Input Monthly Mass Animation</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr auto', gap: '1rem', alignItems: 'end' }}>
                    <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Mass / Occasion</label>
                        <input
                            type="text"
                            placeholder="e.g. Sunday 7AM"
                            value={newEntry.occasion}
                            onChange={(e) => setNewEntry({ ...newEntry, occasion: e.target.value })}
                            style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', marginTop: '0.4rem' }}
                        />
                    </div>
                    <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Animating SCC / Group</label>
                        <select
                            value={newEntry.group}
                            onChange={(e) => setNewEntry({ ...newEntry, group: e.target.value })}
                            style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', marginTop: '0.4rem' }}
                        >
                            <option value="">Select SCC</option>
                            <option value="St. Jude SCC">St. Jude SCC</option>
                            <option value="St. Monica SCC">St. Monica SCC</option>
                            <option value="Youth">Youth</option>
                            <option value="Legion of Mary">Legion of Mary</option>
                        </select>
                    </div>
                    <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Language</label>
                        <select
                            value={newEntry.languange}
                            onChange={(e) => setNewEntry({ ...newEntry, languange: e.target.value })}
                            style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', marginTop: '0.4rem' }}
                        >
                            <option value="English">English</option>
                            <option value="Swahili">Swahili</option>
                            <option value="Latin">Latin</option>
                        </select>
                    </div>
                    <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Notes</label>
                        <input
                            type="text"
                            placeholder="Special requirements"
                            value={newEntry.notes}
                            onChange={(e) => setNewEntry({ ...newEntry, notes: e.target.value })}
                            style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', marginTop: '0.4rem' }}
                        />
                    </div>
                    <button onClick={addEntry} className="btn btn-primary" style={{ padding: '0.75rem' }}>
                        <Plus size={20} />
                    </button>
                </div>
            </div>

            <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3>Preview July 2026 Schedule</h3>
                    <button className="btn btn-accent" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Save size={18} />
                        <span>Notify Proclaimers Secretary</span>
                    </button>
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--border)' }}>
                            <th style={{ padding: '1rem' }}>Mass Occasion</th>
                            <th style={{ padding: '1rem' }}>Animating Group</th>
                            <th style={{ padding: '1rem' }}>Language</th>
                            <th style={{ padding: '1rem' }}>Status</th>
                            <th style={{ padding: '1rem' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedule.map((item) => (
                            <tr key={item.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                <td style={{ padding: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Clock size={16} color="var(--primary)" />
                                        <strong>{item.occasion}</strong>
                                    </div>
                                </td>
                                <td style={{ padding: '1rem' }}><span className="badge badge-info">{item.group}</span></td>
                                <td style={{ padding: '1rem' }}>{item.languange}</td>
                                <td style={{ padding: '1rem' }}><span className="badge badge-warning">Draft</span></td>
                                <td style={{ padding: '1rem' }}>
                                    <button
                                        onClick={() => removeEntry(item.id)}
                                        style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--error)' }}
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MassAnimationSchedule;
