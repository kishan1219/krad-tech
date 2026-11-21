const fs = require('fs');
const path = require('path');

/**
 * Prepares the production distribution bundle for Cloudflare deployment.
 * 1. Cleans the build cache to keep all assets under 0.5 MB
 * 2. Prepares static HTML, CSS, JS, and public assets into /dist
 * 3. Injects _worker.js for zero-configuration API proxying to Render
 */

const rootDir = process.cwd();
const distDir = path.join(rootDir, 'dist');

console.log('[build-dist] Preparing production distribution bundle...');

// 1. Clean existing dist directory
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

// 2. Copy public directory assets (favicon, brand assets)
const publicDir = path.join(rootDir, 'public');
if (fs.existsSync(publicDir)) {
  fs.cpSync(publicDir, distDir, { recursive: true });
}

// 3. Copy Next.js client bundles (.next/static -> dist/_next/static)
const nextStaticDir = path.join(rootDir, '.next', 'static');
const distNextStatic = path.join(distDir, '_next', 'static');
if (fs.existsSync(nextStaticDir)) {
  fs.mkdirSync(path.join(distDir, '_next'), { recursive: true });
  fs.cpSync(nextStaticDir, distNextStatic, { recursive: true });
}

// 4. Copy prerendered HTML pages (.next/server/app -> dist)
const appServerDir = path.join(rootDir, '.next', 'server', 'app');
if (fs.existsSync(appServerDir)) {
  const copyHtmlFiles = (dir, targetDir) => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const srcPath = path.join(dir, entry.name);
      const destPath = path.join(targetDir, entry.name);
      if (entry.isDirectory()) {
        fs.mkdirSync(destPath, { recursive: true });
        copyHtmlFiles(srcPath, destPath);
      } else if (entry.name.endsWith('.html')) {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  };
  copyHtmlFiles(appServerDir, distDir);
}

// 5. Injects Cloudflare Pages Advanced Mode _worker.js
// Handles clean URL rewriting & proxies /api/* calls to Render backend
const workerScript = `export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Proxy all dynamic API endpoints to Render backend
    if (url.pathname.startsWith('/api/')) {
      const backendBase = env.RENDER_BACKEND_URL || 'https://krad-tech.onrender.com';
      const backendUrl = new URL(url.pathname + url.search, backendBase);
      return fetch(new Request(backendUrl, request));
    }

    // Try serving the exact asset
    let response = await env.ASSETS.fetch(request);
    if (response.status !== 404) return response;

    // Clean URL rewriting: /services -> /services.html
    if (!url.pathname.includes('.')) {
      const cleanPath = url.pathname.endsWith('/') ? url.pathname.slice(0, -1) : url.pathname;
      const htmlUrl = new URL(cleanPath + '.html', url.origin);
      const htmlResponse = await env.ASSETS.fetch(new Request(htmlUrl, request));
      if (htmlResponse.status === 200) return htmlResponse;
    }

    return response;
  }
};
`;

fs.writeFileSync(path.join(distDir, '_worker.js'), workerScript, 'utf-8');

// 6. Delete internal compiler cache to minimize repository footprint
const cacheDir = path.join(rootDir, '.next', 'cache');
if (fs.existsSync(cacheDir)) {
  try {
    fs.rmSync(cacheDir, { recursive: true, force: true });
  } catch (e) {
    // Ignore if locked
  }
}

console.log('[build-dist] ✓ Production bundle successfully created in /dist');
