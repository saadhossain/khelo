const getApiUrl = (): string => {
  let api_url: string;
  if (import.meta.env.MODE === "development") {
    api_url = import.meta.env.VITE_REACT_APP_API_URL;
  } else {
    api_url = `${window.location.origin}/api`;
  }
  return api_url;
};

export const API = getApiUrl();
