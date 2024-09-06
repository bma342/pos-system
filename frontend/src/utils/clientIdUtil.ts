export const getClientIdFromSubdomain = (): string => {
  const subdomain = window.location.hostname.split('.')[0];
  // Implement your logic to map subdomain to clientId
  return subdomain; // Assuming subdomain is the clientId
};