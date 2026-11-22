import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken } from '@/lib/auth';
import fs from 'fs';
import path from 'path';

export interface SystemLogEntry {
  id: string;
  timestamp: string;
  level: 'ERROR' | 'WARN' | 'INFO';
  source: string;
  message: string;
  details?: Record<string, unknown> | string;
  ip?: string;
  path?: string;
}

const LOG_STORAGE_DIR = path.join(process.cwd(), '.data');
const LOG_FILE = path.join(LOG_STORAGE_DIR, 'system_logs.json');

// In-memory fallback ring buffer (holds up to 100 recent entries)
let inMemoryLogs: SystemLogEntry[] = [
  {
    id: 'log_init',
    timestamp: new Date().toISOString(),
    level: 'INFO',
    source: 'System Runtime',
    message: 'Logging subsystem initialized and operational.',
    path: '/api/admin/logs',
  },
];

function readLogs(): SystemLogEntry[] {
  try {
    if (fs.existsSync(LOG_FILE)) {
      const raw = fs.readFileSync(LOG_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // Non-blocking fallback to inMemoryLogs
  }
  return inMemoryLogs;
}

function writeLog(entry: SystemLogEntry) {
  try {
    if (!fs.existsSync(LOG_STORAGE_DIR)) {
      fs.mkdirSync(LOG_STORAGE_DIR, { recursive: true });
    }
    const current = readLogs();
    current.unshift(entry);
    // Keep last 200 logs
    const trimmed = current.slice(0, 200);
    fs.writeFileSync(LOG_FILE, JSON.stringify(trimmed, null, 2), 'utf-8');
    inMemoryLogs = trimmed;
  } catch {
    inMemoryLogs.unshift(entry);
    inMemoryLogs = inMemoryLogs.slice(0, 200);
  }
}

function isAuthorized(req: NextRequest): boolean {
  const adminToken = req.cookies.get('krad_admin_token')?.value;
  const authHeader = req.headers.get('authorization')?.replace('Bearer ', '');
  return verifyAdminToken(adminToken) || verifyAdminToken(authHeader);
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
  }

  try {
    const logs = readLogs();
    return NextResponse.json({
      success: true,
      total: logs.length,
      logs,
    });
  } catch (err) {
    console.error('Error fetching logs:', err);
    return NextResponse.json({ error: 'Failed to retrieve logs' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const entry: SystemLogEntry = {
      id: 'log_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      timestamp: new Date().toISOString(),
      level: body.level || 'ERROR',
      source: body.source || 'Client Runtime',
      message: body.message || 'Unknown error occurred',
      details: body.details,
      path: body.path || req.nextUrl.pathname,
      ip: req.headers.get('cf-connecting-ip') || req.headers.get('x-forwarded-for') || '127.0.0.1',
    };

    writeLog(entry);
    return NextResponse.json({ success: true, logId: entry.id });
  } catch {
    return NextResponse.json({ error: 'Failed to record log' }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
  }

  try {
    inMemoryLogs = [
      {
        id: 'log_cleared_' + Date.now(),
        timestamp: new Date().toISOString(),
        level: 'INFO',
        source: 'Admin Action',
        message: 'System error logs were cleared by administrator.',
      },
    ];
    if (fs.existsSync(LOG_FILE)) {
      fs.writeFileSync(LOG_FILE, JSON.stringify(inMemoryLogs, null, 2), 'utf-8');
    }
    return NextResponse.json({ success: true, message: 'Logs cleared successfully' });
  } catch {
    return NextResponse.json({ error: 'Failed to clear logs' }, { status: 500 });
  }
}
