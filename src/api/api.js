const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

export const fetchData = async (endpoint) => {
    try {
        const token = localStorage.getItem('access_token');
        const headers = {
            'Content-Type': 'application/json',
        };
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        const response = await fetch(`${apiUrl}/${endpoint}`, { headers });
        if (!response.ok) {
            if (response.status === 401) {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                window.location.href = '/login';
            }
            const errorData = await response.json().catch(() => ({}));
            
            let errorMessage = errorData.detail || errorData.message;
            if (!errorMessage && errorData.non_field_errors) {
                errorMessage = Array.isArray(errorData.non_field_errors) ? errorData.non_field_errors.join(' ') : errorData.non_field_errors;
            }
            if (!errorMessage) {
                const parts = [];
                for (const [key, value] of Object.entries(errorData)) {
                    if (key === 'non_field_errors') continue;
                    parts.push(`${key}: ${Array.isArray(value) ? value.join(' ') : value}`);
                }
                if (parts.length > 0) errorMessage = parts.join(' | ');
            }
            throw new Error(errorMessage || `Error fetching data: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const postData = async (endpoint, data) => {
    try {
        const token = localStorage.getItem('access_token');
        const headers = {
            'Content-Type': 'application/json',
        };
        // Don't send token for auth endpoints to avoid stale token issues
        if (token && !endpoint.includes('auth/login') && !endpoint.includes('auth/register')) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        const response = await fetch(`${apiUrl}/${endpoint}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            if (response.status === 401 && !endpoint.includes('auth/login')) {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                window.location.href = '/login';
            }
            const errorData = await response.json().catch(() => ({}));
            
            let errorMessage = errorData.detail || errorData.message;
            if (!errorMessage && errorData.non_field_errors) {
                errorMessage = Array.isArray(errorData.non_field_errors) ? errorData.non_field_errors.join(' ') : errorData.non_field_errors;
            }
            if (!errorMessage) {
                const parts = [];
                for (const [key, value] of Object.entries(errorData)) {
                    if (key === 'non_field_errors') continue;
                    parts.push(`${key}: ${Array.isArray(value) ? value.join(' ') : value}`);
                }
                if (parts.length > 0) errorMessage = parts.join(' | ');
            }
            throw new Error(errorMessage || `Error posting data: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const updateData = async (endpoint, data) => {
    try {
        const token = localStorage.getItem('access_token');
        const headers = {
            'Content-Type': 'application/json',
        };
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        const response = await fetch(`${apiUrl}/${endpoint}`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            if (response.status === 401) {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                window.location.href = '/login';
            }
            const errorData = await response.json().catch(() => ({}));
            const errorMessage = errorData.detail || errorData.message || `Error updating data: ${response.statusText}`;
            throw new Error(errorMessage);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Auth helpers
export const login = async (credentials) => {
    const response = await postData('auth/login/', credentials);
    if (response.access) {
        localStorage.setItem('access_token', response.access);
        localStorage.setItem('refresh_token', response.refresh);
    } else if (response.key) {
        localStorage.setItem('access_token', response.key);
    }
    return response;
};

export const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.href = '/login';
};

export const register = async (credentials) => {
    const response = await postData('auth/register/', credentials);
    if (response.access) {  // Assuming registration also returns tokens
        localStorage.setItem('access_token', response.access);
        localStorage.setItem('refresh_token', response.refresh);
    }
    return response;
};
