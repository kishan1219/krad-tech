import { NextRequest, NextResponse } from 'next/server';
import {
  getContactInquiries,
  getResourceHires,
  getProjectRequirements,
  getLeadStats,
  updateLeadStatus,
} from '@/lib/db';
import { verifyAdminToken } from '@/lib/auth';
import { sanitizeString } from '@/lib/sanitize';

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

    return NextResponse.json(
      {
        contacts,
        hires,
        projects,
        stats,
      },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (err: unknown) {
    console.error('Leads GET error:', err);
    return NextResponse.json({ error: 'Failed to retrieve leads' }, { status: 500 });
  }
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

    const safeStatus = sanitizeString(status);
    const safeNotes = notes ? sanitizeString(notes) : undefined;

    const updated = await updateLeadStatus(type, id, safeStatus, safeNotes);
    return NextResponse.json({ success: true, updated });
  } catch (err: unknown) {
    console.error('Leads PATCH error:', err);
    const message = err instanceof Error ? err.message : 'Failed to update lead';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
