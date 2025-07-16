import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global.less'
import App from './App'

/**
 * 管理启动和挂载
 */
const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
