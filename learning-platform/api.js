// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to get auth token
const getAuthToken = () => {
    return localStorage.getItem('token');
};

// Helper function to check if backend is running
const checkBackendHealth = async () => {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout
        
        const response = await fetch(`${API_BASE_URL}/health`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        return response.ok;
    } catch (error) {
        return false;
    }
};

// Helper function to make API requests
const apiRequest = async (endpoint, options = {}) => {
    const token = getAuthToken();
    
    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
        },
        ...options
    };

    if (options.body && typeof options.body === 'object') {
        config.body = JSON.stringify(options.body);
    }

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
        
        // Handle non-JSON responses
        let data;
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            data = await response.json();
        } else {
            const text = await response.text();
            throw new Error(text || 'Server returned non-JSON response');
        }
        
        if (!response.ok) {
            throw new Error(data.message || `API request failed with status ${response.status}`);
        }
        
        return data;
    } catch (error) {
        console.error('API Error:', error);
        
        // Check if it's a network error (backend not running)
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            const isBackendRunning = await checkBackendHealth();
            if (!isBackendRunning) {
                throw new Error('Backend server is not running. Please start the backend server first. Check the START_BACKEND.bat file in the project root.');
            }
        }
        
        // Provide user-friendly error messages
        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
            throw new Error('Unable to connect to the server. Please ensure the backend server is running on http://localhost:5000');
        }
        
        throw error;
    }
};

// Auth API
export const authAPI = {
    register: async (userData) => {
        return await apiRequest('/auth/register', {
            method: 'POST',
            body: userData
        });
    },
    
    login: async (email, password) => {
        return await apiRequest('/auth/login', {
            method: 'POST',
            body: { email, password }
        });
    },
    
    getMe: async () => {
        return await apiRequest('/auth/me', {
            method: 'GET'
        });
    }
};

// Progress API
export const progressAPI = {
    getProgress: async () => {
        return await apiRequest('/progress', { method: 'GET' });
    },
    
    updateProgress: async (progressData) => {
        return await apiRequest('/progress', {
            method: 'PUT',
            body: progressData
        });
    },
    
    identifyGaps: async () => {
        return await apiRequest('/progress/identify-gaps', {
            method: 'POST'
        });
    }
};

// Lessons API
export const lessonsAPI = {
    getLessons: async () => {
        return await apiRequest('/lessons', { method: 'GET' });
    },
    
    getLesson: async (id) => {
        return await apiRequest(`/lessons/${id}`, { method: 'GET' });
    },
    
    createLesson: async (lessonData) => {
        return await apiRequest('/lessons', {
            method: 'POST',
            body: lessonData
        });
    },
    
    updateDifficulty: async (id, difficulty, performance) => {
        return await apiRequest(`/lessons/${id}/difficulty`, {
            method: 'PUT',
            body: { difficulty, performance }
        });
    },
    
    completeLesson: async (id, performance) => {
        return await apiRequest(`/lessons/${id}/complete`, {
            method: 'PUT',
            body: performance ? { performance } : {}
        });
    }
};

// Analytics API
export const analyticsAPI = {
    getAnalytics: async () => {
        return await apiRequest('/analytics', { method: 'GET' });
    }
};

// Mock Tests API
export const mockTestsAPI = {
    getMockTests: async () => {
        return await apiRequest('/mock-tests', { method: 'GET' });
    },
    
    getMockTest: async (id) => {
        return await apiRequest(`/mock-tests/${id}`, { method: 'GET' });
    },
    
    createMockTest: async (testData) => {
        return await apiRequest('/mock-tests', {
            method: 'POST',
            body: testData
        });
    },
    
    submitTest: async (id, answers) => {
        return await apiRequest(`/mock-tests/${id}/submit`, {
            method: 'PUT',
            body: { answers }
        });
    }
};

// Study Path API
export const studyPathAPI = {
    getStudyPath: async (refresh = false) => {
        return await apiRequest(`/study-path${refresh ? '?refresh=1' : ''}`, { method: 'GET' });
    },
    
    updateStudyPath: async (pathData) => {
        return await apiRequest('/study-path', {
            method: 'PUT',
            body: pathData
        });
    }
};

// Dashboard API
export const dashboardAPI = {
    getStudentDashboard: async () => {
        return await apiRequest('/dashboard/student', { method: 'GET' });
    },
    
    getTeacherDashboard: async () => {
        return await apiRequest('/dashboard/teacher', { method: 'GET' });
    }
};

// Reports API
export const reportsAPI = {
    getReports: async () => {
        return await apiRequest('/reports', { method: 'GET' });
    },
    
    getReport: async (id) => {
        return await apiRequest(`/reports/${id}`, { method: 'GET' });
    },
    
    generateReport: async (reportType, period) => {
        return await apiRequest('/reports/generate', {
            method: 'POST',
            body: { reportType, period }
        });
    }
};

// Matches API
export const matchesAPI = {
    getMatches: async () => {
        return await apiRequest('/matches', { method: 'GET' });
    },
    
    connectMatch: async (matchId) => {
        return await apiRequest(`/matches/connect/${matchId}`, {
            method: 'PUT'
        });
    }
};
