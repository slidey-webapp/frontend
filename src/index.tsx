import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

const root = createRoot(document.getElementById('root') as HTMLElement);
// @ts-ignore
root.render(<App />);

reportWebVitals();
