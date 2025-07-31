import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global.less'
import App from './App'
import 'virtual:uno.css'
import 'uno.css';
/**
 * 管理启动和挂载
 */
const rootElement = document.getElementById('root');
document.title = '建业管理平台';

if (rootElement) {
  // 确保DOM完全加载后再渲染React应用，避免loading闪烁
  const renderApp = () => {
    requestAnimationFrame(() => {
      createRoot(rootElement).render(
        <StrictMode>
          <App />
        </StrictMode>,
      );
    });
  };
  renderApp();
}
