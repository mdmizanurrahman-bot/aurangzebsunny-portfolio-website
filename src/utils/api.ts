import { storage } from './api-storage';

// Lightweight adapter to provide the `api` shape some components expect.
// This avoids changing many components and centralizes mappings.
export const api = {
  // submitContact used by Hero and other components
  submitContact: async (payload: any) => {
    // Map to the messages endpoint
    const message = {
      name: payload.name || payload.fullName || 'Anonymous',
      email: payload.email || '',
      subject: payload.subject || payload.source || 'Contact Form',
      message: payload.message || payload.body || '',
      source: payload.source || 'website',
      createdAt: new Date().toISOString(),
    };

    // Use the storage layer which will call the API or fallback to localStorage
    if ((storage as any).addMessage) {
      return (storage as any).addMessage(message);
    }

    // Fallback: try messages API via generic endpoint
    // eslint-disable-next-line no-undef
    return fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message),
    }).then((r) => r.json());
  },

  // Expose storage for convenience
  storage,
};

export default api;
