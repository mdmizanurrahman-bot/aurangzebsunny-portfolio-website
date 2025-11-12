// Hybrid storage: Uses API when available, falls back to localStorage for development

const API_BASE_URL = typeof window !== 'undefined' 
  ? (import.meta.env?.VITE_API_URL || '/api')
  : '/api';

// Check if API is available
let isApiAvailable: boolean | null = null;
let apiCheckPromise: Promise<boolean> | null = null;

async function checkApiAvailability() {
  if (isApiAvailable !== null) return isApiAvailable;
  
  // Prevent multiple simultaneous checks
  if (apiCheckPromise) return apiCheckPromise;
  
  apiCheckPromise = (async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000); // 2 second timeout
      
      const response = await fetch(`${API_BASE_URL}/settings`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      isApiAvailable = response.ok || response.status === 404 || response.status === 500;
      
      if (!isApiAvailable) {
        console.info('💾 Using localStorage for data storage (API not available)');
      }
    } catch (error) {
      console.info('💾 Using localStorage for data storage (development mode)');
      isApiAvailable = false;
    }
    
    return isApiAvailable!;
  })();
  
  return apiCheckPromise;
}

// Helper function to make API calls with localStorage fallback
async function apiCall(endpoint: string, options?: RequestInit) {
  const available = await checkApiAvailability();
  
  if (!available) {
    throw new Error('API_NOT_AVAILABLE');
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    // If we get a 404 on GET, return empty array/object instead of throwing
    if (options?.method === 'GET' || !options?.method) {
      if (response.status === 404) {
        return [];
      }
    }
    throw new Error(`API call failed: ${response.statusText}`);
  }

  return response.json();
}

// LocalStorage fallback functions
const localStorageAdapter = {
  get: (key: string) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  },
  set: (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  add: (key: string, item: any) => {
    const items = localStorageAdapter.get(key);
    const newItem = { ...item, id: item.id || `${Date.now()}-${Math.random().toString(36).substr(2, 9)}` };
    items.push(newItem);
    localStorageAdapter.set(key, items);
    return newItem;
  },
  update: (key: string, id: string, updates: any) => {
    const items = localStorageAdapter.get(key);
    const index = items.findIndex((item: any) => item.id === id);
    if (index !== -1) {
      items[index] = { ...items[index], ...updates };
      localStorageAdapter.set(key, items);
    }
    return { success: true };
  },
  delete: (key: string, id: string) => {
    const items = localStorageAdapter.get(key);
    const filtered = items.filter((item: any) => item.id !== id);
    localStorageAdapter.set(key, filtered);
    return { success: true };
  },
};

// Hybrid call wrapper
async function hybridCall<T>(
  apiFunction: () => Promise<T>,
  localStorageFunction: () => T,
): Promise<T> {
  try {
    return await apiFunction();
  } catch (error) {
    if ((error as Error).message === 'API_NOT_AVAILABLE') {
      console.warn('API not available, using localStorage fallback');
      return localStorageFunction();
    }
    throw error;
  }
}

// Export storage API
export const storage = {
  // Projects
  getProjects: async () => {
    return hybridCall(
      () => apiCall('/projects'),
      () => localStorageAdapter.get('projects')
    );
  },
  addProject: async (project: any) => {
    return hybridCall(
      () => apiCall('/projects', { method: 'POST', body: JSON.stringify(project) }),
      () => localStorageAdapter.add('projects', project)
    );
  },
  updateProject: async (id: string, updates: any) => {
    return hybridCall(
      () => apiCall('/projects', { method: 'PUT', body: JSON.stringify({ id, ...updates }) }),
      () => localStorageAdapter.update('projects', id, updates)
    );
  },
  deleteProject: async (id: string) => {
    return hybridCall(
      () => apiCall(`/projects?id=${id}`, { method: 'DELETE' }),
      () => localStorageAdapter.delete('projects', id)
    );
  },

  // Posts
  getPosts: async () => {
    return hybridCall(
      () => apiCall('/posts'),
      () => localStorageAdapter.get('posts')
    );
  },
  addPost: async (post: any) => {
    return hybridCall(
      () => apiCall('/posts', { method: 'POST', body: JSON.stringify(post) }),
      () => localStorageAdapter.add('posts', post)
    );
  },
  updatePost: async (id: string, updates: any) => {
    return hybridCall(
      () => apiCall('/posts', { method: 'PUT', body: JSON.stringify({ id, ...updates }) }),
      () => localStorageAdapter.update('posts', id, updates)
    );
  },
  deletePost: async (id: string) => {
    return hybridCall(
      () => apiCall(`/posts?id=${id}`, { method: 'DELETE' }),
      () => localStorageAdapter.delete('posts', id)
    );
  },

  // Videos
  getVideos: async () => {
    return hybridCall(
      () => apiCall('/videos'),
      () => localStorageAdapter.get('videos')
    );
  },
  addVideo: async (video: any) => {
    return hybridCall(
      () => apiCall('/videos', { method: 'POST', body: JSON.stringify(video) }),
      () => localStorageAdapter.add('videos', video)
    );
  },
  updateVideo: async (id: string, updates: any) => {
    return hybridCall(
      () => apiCall('/videos', { method: 'PUT', body: JSON.stringify({ id, ...updates }) }),
      () => localStorageAdapter.update('videos', id, updates)
    );
  },
  deleteVideo: async (id: string) => {
    return hybridCall(
      () => apiCall(`/videos?id=${id}`, { method: 'DELETE' }),
      () => localStorageAdapter.delete('videos', id)
    );
  },

  // Certificates
  getCertificates: async () => {
    return hybridCall(
      () => apiCall('/certificates'),
      () => localStorageAdapter.get('certificates')
    );
  },
  addCertificate: async (cert: any) => {
    return hybridCall(
      () => apiCall('/certificates', { method: 'POST', body: JSON.stringify(cert) }),
      () => localStorageAdapter.add('certificates', cert)
    );
  },
  deleteCertificate: async (id: string) => {
    return hybridCall(
      () => apiCall(`/certificates?id=${id}`, { method: 'DELETE' }),
      () => localStorageAdapter.delete('certificates', id)
    );
  },

  // Jobs
  getJobs: async () => {
    return hybridCall(
      () => apiCall('/jobs'),
      () => localStorageAdapter.get('jobs')
    );
  },
  addJob: async (job: any) => {
    return hybridCall(
      () => apiCall('/jobs', { method: 'POST', body: JSON.stringify(job) }),
      () => localStorageAdapter.add('jobs', job)
    );
  },
  updateJob: async (id: string, updates: any) => {
    return hybridCall(
      () => apiCall('/jobs', { method: 'PUT', body: JSON.stringify({ id, ...updates }) }),
      () => localStorageAdapter.update('jobs', id, updates)
    );
  },
  deleteJob: async (id: string) => {
    return hybridCall(
      () => apiCall(`/jobs?id=${id}`, { method: 'DELETE' }),
      () => localStorageAdapter.delete('jobs', id)
    );
  },

  // Reviews
  getReviews: async () => {
    return hybridCall(
      () => apiCall('/reviews'),
      () => localStorageAdapter.get('reviews')
    );
  },
  addReview: async (review: any) => {
    return hybridCall(
      () => apiCall('/reviews', { method: 'POST', body: JSON.stringify(review) }),
      () => localStorageAdapter.add('reviews', review)
    );
  },
  deleteReview: async (id: string) => {
    return hybridCall(
      () => apiCall(`/reviews?id=${id}`, { method: 'DELETE' }),
      () => localStorageAdapter.delete('reviews', id)
    );
  },

  // Q&A
  getQAs: async () => {
    return hybridCall(
      () => apiCall('/qas'),
      () => localStorageAdapter.get('qas')
    );
  },
  addQA: async (qa: any) => {
    return hybridCall(
      () => apiCall('/qas', { method: 'POST', body: JSON.stringify(qa) }),
      () => localStorageAdapter.add('qas', qa)
    );
  },
  updateQA: async (id: string, updates: any) => {
    return hybridCall(
      () => apiCall('/qas', { method: 'PUT', body: JSON.stringify({ id, ...updates }) }),
      () => localStorageAdapter.update('qas', id, updates)
    );
  },
  deleteQA: async (id: string) => {
    return hybridCall(
      () => apiCall(`/qas?id=${id}`, { method: 'DELETE' }),
      () => localStorageAdapter.delete('qas', id)
    );
  },

  // Messages
  getMessages: async () => {
    return hybridCall(
      () => apiCall('/messages'),
      () => localStorageAdapter.get('messages')
    );
  },
  addMessage: async (message: any) => {
    return hybridCall(
      () => apiCall('/messages', { method: 'POST', body: JSON.stringify(message) }),
      () => localStorageAdapter.add('messages', message)
    );
  },
  updateMessage: async (id: string, updates: any) => {
    return hybridCall(
      () => apiCall('/messages', { method: 'PUT', body: JSON.stringify({ id, ...updates }) }),
      () => localStorageAdapter.update('messages', id, updates)
    );
  },
  deleteMessage: async (id: string) => {
    return hybridCall(
      () => apiCall(`/messages?id=${id}`, { method: 'DELETE' }),
      () => localStorageAdapter.delete('messages', id)
    );
  },

  // Settings
  getSettings: async () => {
    return hybridCall(
      () => apiCall('/settings'),
      () => {
        const settings = localStorage.getItem('settings');
        return settings ? JSON.parse(settings) : {
          siteName: 'Aurangzeb Sunny Portfolio',
          siteDescription: 'Professional Portfolio',
          contactEmail: 'contact@example.com',
        };
      }
    );
  },
  updateSettings: async (settings: any) => {
    return hybridCall(
      () => apiCall('/settings', { method: 'PUT', body: JSON.stringify(settings) }),
      () => {
        localStorage.setItem('settings', JSON.stringify(settings));
        return { success: true };
      }
    );
  },

  // Analytics
  getAnalytics: async () => {
    return hybridCall(
      () => apiCall('/analytics'),
      () => ({
        totalProjects: localStorageAdapter.get('projects').length,
        totalPosts: localStorageAdapter.get('posts').length,
        totalVideos: localStorageAdapter.get('videos').length,
        totalMessages: localStorageAdapter.get('messages').length,
        recentActivity: [],
      })
    );
  },

  // Aura Assistant - Save lead info
  auraSubmitInfo: async (info: any) => {
    const message = {
      name: info.name,
      email: info.email,
      phone: info.phone || '',
      subject: 'Aura Assistant Lead',
      message: info.message || 'Lead captured from Aura Assistant',
      source: 'aura-assistant',
    };
    return hybridCall(
      () => apiCall('/messages', { method: 'POST', body: JSON.stringify(message) }),
      () => localStorageAdapter.add('messages', message)
    );
  },

  // Newsletter Subscriptions
  getNewsletterSubscriptions: async () => {
    return hybridCall(
      () => apiCall('/newsletter'),
      () => localStorageAdapter.get('newsletter')
    );
  },
  addNewsletterSubscription: async (email: string) => {
    return hybridCall(
      () => apiCall('/newsletter', { method: 'POST', body: JSON.stringify({ email }) }),
      () => localStorageAdapter.add('newsletter', { email, subscribedAt: new Date().toISOString() })
    );
  },
  deleteNewsletterSubscription: async (id: string) => {
    return hybridCall(
      () => apiCall(`/newsletter?id=${id}`, { method: 'DELETE' }),
      () => localStorageAdapter.delete('newsletter', id)
    );
  },
};