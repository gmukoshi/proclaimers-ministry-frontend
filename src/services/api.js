import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor for Auth Token
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('proclaimers_token');
    if (token) {
        config.headers['x-access-token'] = token;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const authService = {
    login: async (credentials) => {
        const response = await apiClient.post('/auth/login', credentials);
        if (response.data.token) {
            localStorage.setItem('proclaimers_token', response.data.token);
        }
        return response.data;
    },
    register: async (userData) => {
        const response = await apiClient.post('/auth/register', userData);
        return response.data;
    },
    logout: () => {
        localStorage.removeItem('proclaimers_token');
    }
};

export const rosterService = {
    generate: async (month, year) => {
        const response = await apiClient.post('/roster/generate', { month, year });
        return response.data;
    },
    getMonthly: async (year, month) => {
        const response = await apiClient.get(`/roster/${year}/${month}`);
        return response.data;
    }
};

export const assignmentService = {
    updateStatus: async (id, status) => {
        const response = await apiClient.patch(`/assignments/${id}/status`, { status });
        return response.data;
    },
    override: async (id, proclaimer_id) => {
        const response = await apiClient.patch(`/assignments/${id}/override`, { proclaimer_id });
        return response.data;
    }
};

export const analyticsService = {
    getCoverage: async () => {
        const response = await apiClient.get('/analytics/coverage');
        return response.data;
    },
    getParticipation: async () => {
        const response = await apiClient.get('/analytics/scc-participation');
        return response.data;
    },
    getReliability: async () => {
        const response = await apiClient.get('/analytics/reliability');
        return response.data;
    }
};

export const notificationService = {
    notifyProclaimer: async (proclaimerId) => {
        const response = await apiClient.post(`/notifications/notify/${proclaimerId}`);
        return response.data;
    },
    bulkNotify: async (month, year) => {
        const response = await apiClient.post('/notifications/bulk-notify', { month, year });
        return response.data;
    },
    shareRoster: async (month, year, phoneNumber = null) => {
        const response = await apiClient.post('/notifications/share-roster', { month, year, phone_number: phoneNumber });
        return response.data;
    }
};

export default apiClient;

