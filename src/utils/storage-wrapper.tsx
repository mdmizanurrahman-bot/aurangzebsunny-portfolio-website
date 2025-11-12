// Storage wrapper - Easy switch between localStorage and API
// Change this import to switch storage backends

// For MongoDB/API (production):
export { storage } from './api-storage';

// For localStorage (development/backup):
// export { storage } from './storage';
