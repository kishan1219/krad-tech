import { NextRequest, NextResponse } from 'next/server';
import {
  getContactInquiries,
  getResourceHires,
  getProjectRequirements,
  getLeadStats,
  updateLeadStatus,
} from '@/lib/db';

function isAuthorized(req: NextRequest): boolean {
  const adminToken = req.cookies.get('krad_admin_token')?.value;
  const authHeader = req.headers.get('authorization')?.replace('Bearer ', '');
  const validSecret = process.env.ADMIN_SECRET_KEY || 'krad_admin_secure_key_2026';
  return adminToken === validSecret || authHeader === validSecret;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type') || 'all';
  const status = searchParams.get('status') || 'ALL';

  if (type === 'stats') {
    const stats = await getLeadStats();
    return NextResponse.json(stats);
  }

  const [contacts, hires, projects, stats] = await Promise.all([
    getContactInquiries(status),
    getResourceHires(status),
    getProjectRequirements(status),
    getLeadStats(),
  ]);

  return NextResponse.json({
    contacts,
    hires,
    projects,
    stats,
  });
}

export async function PATCH(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { type, id, status, notes } = body;

    if (!type || !id || !status) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    const updated = await updateLeadStatus(type, id, status, notes);
    return NextResponse.json({ success: true, updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to update lead' }, { status: 500 });
  }
}
