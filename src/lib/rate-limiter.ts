import { supabaseAdmin } from './supabase';

interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetInSeconds: number;
}

// In-memory sliding window cache for instant local checking
const memoryStore = new Map<string, { count: number; firstRequestTime: number }>();

export async function checkRateLimit(
  identifier: string,
  maxRequests: number = 8,
  windowMs: number = 300000 // 5 minutes
): Promise<RateLimitResult> {
  const now = Date.now();
  const safeId = identifier.replace(/[^a-zA-Z0-9_.-]/g, '_');

  try {
    // Attempt Supabase PostgreSQL distributed rate limiting
    const { data, error } = await supabaseAdmin
      .from('rate_limits')
      .select('*')
      .eq('identifier', safeId)
      .single();

    if (!error && data) {
      const lastTime = new Date(data.last_request_at).getTime();
      const elapsed = now - lastTime;

      if (elapsed > windowMs) {
        // Reset window
        await supabaseAdmin
          .from('rate_limits')
          .update({ requests_count: 1, last_request_at: new Date().toISOString() })
          .eq('identifier', safeId);

        return { success: true, remaining: maxRequests - 1, resetInSeconds: Math.ceil(windowMs / 1000) };
      }

      if (data.requests_count >= maxRequests) {
        const resetIn = Math.ceil((windowMs - elapsed) / 1000);
        return { success: false, remaining: 0, resetInSeconds: resetIn > 0 ? resetIn : 1 };
      }

      // Increment
      await supabaseAdmin
        .from('rate_limits')
        .update({ requests_count: data.requests_count + 1 })
        .eq('identifier', safeId);

      return {
        success: true,
        remaining: maxRequests - (data.requests_count + 1),
        resetInSeconds: Math.ceil((windowMs - elapsed) / 1000),
      };
    } else {
      // First time insert into Supabase
      await supabaseAdmin.from('rate_limits').upsert({
        identifier: safeId,
        requests_count: 1,
        last_request_at: new Date().toISOString(),
      });
      return { success: true, remaining: maxRequests - 1, resetInSeconds: Math.ceil(windowMs / 1000) };
    }
  } catch {
    // Resilient fallback to memory store
    const record = memoryStore.get(safeId);
    if (!record || now - record.firstRequestTime > windowMs) {
      memoryStore.set(safeId, { count: 1, firstRequestTime: now });
      return { success: true, remaining: maxRequests - 1, resetInSeconds: Math.ceil(windowMs / 1000) };
    }

    if (record.count >= maxRequests) {
      const elapsed = now - record.firstRequestTime;
      return { success: false, remaining: 0, resetInSeconds: Math.ceil((windowMs - elapsed) / 1000) };
    }

    record.count += 1;
    memoryStore.set(safeId, record);
    const elapsed = now - record.firstRequestTime;
    return { success: true, remaining: maxRequests - record.count, resetInSeconds: Math.ceil((windowMs - elapsed) / 1000) };
  }
}
