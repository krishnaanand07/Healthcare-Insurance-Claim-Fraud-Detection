const PRIMARY_API_URL = import.meta.env?.VITE_API_BASE_URL || "http://localhost:8000";
const FALLBACK_API_URL = "https://healthcare-insurance-claim-fraud-detection-back-production.up.railway.app";

const formatUrl = (baseUrl, path) => `${baseUrl.replace(/\/+$/, '')}${path.startsWith('/') ? path : `/${path}`}`;

export const predictFraud = async (formData) => {
  const urlsToTry = [PRIMARY_API_URL, FALLBACK_API_URL].filter(Boolean);
  // Remove duplicates if primary matches fallback
  const uniqueUrls = [...new Set(urlsToTry)];
  
  let lastError = null;

  for (const baseUrl of uniqueUrls) {
    try {
      const response = await fetch(formatUrl(baseUrl, '/predict'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      return await response.json();
    } catch (err) {
      console.warn(`Failed reaching backend at ${baseUrl}:`, err.message);
      lastError = err;
    }
  }

  console.error("API Error: All backend endpoints unreachable.", lastError);
  throw lastError || new Error("Failed to connect to backend server.");
};
