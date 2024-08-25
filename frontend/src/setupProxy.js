import { createProxyMiddleware } from 'http-proxy-middleware';

export default function setupProxy(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://localhost:5000',
      changeOrigin: true,
      secure: false, // Accept self-signed certificates
    })
  );
}
