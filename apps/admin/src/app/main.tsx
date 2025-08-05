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

  console.log(12);

  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
