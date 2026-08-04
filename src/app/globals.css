@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --accent: #8b5cf6;
  --accent-light: #a78bfa;
  --accent-glow: rgba(139, 92, 246, 0.3);
  --surface: rgba(255, 255, 255, 0.04);
  --surface-hover: rgba(255, 255, 255, 0.08);
  --border: rgba(255, 255, 255, 0.06);
}

* { box-sizing: border-box; }

body {
  background: #09090b;
  color: #e4e4e7;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
}

/* Scrollbar */
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }

/* Glass card */
.glass {
  background: var(--surface);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--border);
}

.glass-hover {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.glass-hover:hover {
  background: var(--surface-hover);
  border-color: rgba(139, 92, 246, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.4), 0 0 20px var(--accent-glow);
}

/* Poster card */
.poster-card {
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 12px;
  overflow: hidden;
  background: var(--surface);
  border: 1px solid var(--border);
}
.poster-card:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px var(--accent-glow);
  border-color: rgba(139, 92, 246, 0.3);
}

/* Card gradient overlay */
.card-overlay {
  background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 40%, transparent 70%);
}

/* Glow button */
.btn-glow {
  position: relative;
  background: linear-gradient(135deg, #8b5cf6, #6d28d9);
  color: white;
  border: none;
  border-radius: 10px;
  padding: 10px 24px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
}
.btn-glow:hover {
  box-shadow: 0 8px 30px rgba(139, 92, 246, 0.5);
  transform: translateY(-1px);
}

/* Server button */
.server-btn {
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  color: #a1a1aa;
  border-radius: 8px;
  padding: 8px 18px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.25s;
}
.server-btn:hover {
  background: rgba(139, 92, 246, 0.1);
  border-color: rgba(139, 92, 246, 0.3);
  color: #e4e4e7;
}
.server-btn.active {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  border-color: transparent;
  color: white;
  box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
}

/* Video container 16:9 */
.video-container {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  border-radius: 12px;
  background: #000;
  border: 1px solid rgba(255,255,255,0.06);
}
.video-container iframe,
.video-container video {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  border: 0;
}

/* Skeleton loading */
@keyframes shimmer {
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
}
.skeleton {
  background: linear-gradient(90deg, #18181b 25%, #27272a 50%, #18181b 75%);
  background-size: 800px 100%;
  animation: shimmer 1.8s infinite;
  border-radius: 8px;
}

/* Fade in animation */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.fade-up {
  animation: fadeUp 0.5s ease-out forwards;
}
.fade-up-delay-1 { animation-delay: 0.1s; opacity: 0; }
.fade-up-delay-2 { animation-delay: 0.2s; opacity: 0; }
.fade-up-delay-3 { animation-delay: 0.3s; opacity: 0; }

/* Gradient text */
.gradient-text {
  background: linear-gradient(135deg, #8b5cf6, #ec4899, #f59e0b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Accent line */
.accent-line {
  height: 3px;
  background: linear-gradient(90deg, #8b5cf6, #ec4899, transparent);
  border-radius: 2px;
}

/* Tag/badge */
.tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 500;
  background: rgba(139, 92, 246, 0.1);
  color: #a78bfa;
  border: 1px solid rgba(139, 92, 246, 0.2);
}
.tag-blue {
  background: rgba(59, 130, 246, 0.1);
  color: #60a5fa;
  border-color: rgba(59, 130, 246, 0.2);
}

/* Section title */
.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #fafafa;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 1.25rem;
}
.section-title::after {
  content: '';
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, rgba(139,92,246,0.3), transparent);
}

/* Input */
.input-glass {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 10px;
  padding: 10px 16px;
  color: #e4e4e7;
  font-size: 14px;
  transition: all 0.25s;
  outline: none;
  width: 100%;
}
.input-glass:focus {
  border-color: rgba(139, 92, 246, 0.5);
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
  background: rgba(255,255,255,0.08);
}
.input-glass::placeholder { color: #52525b; }
