import clarity from '@microsoft/clarity';

const CLARITY_PROJECT_ID = 'txmekqvjoe';

export function initClarity(): void {
  if (typeof window === 'undefined') return;
  if (import.meta.env.MODE === 'test') return;

  const w = window as unknown as { __CLARITY_INITIALIZED__?: boolean };
  if (w.__CLARITY_INITIALIZED__) return;

  try {
    clarity.init(CLARITY_PROJECT_ID);
    w.__CLARITY_INITIALIZED__ = true;
  } catch {
    // no-op
  }
}

export function trackEvent(
  event: string,
  properties?: Record<string, any>
): void {
  if (typeof window === 'undefined') return;
  if (import.meta.env.MODE === 'test') return;

  clarity.track(event, properties);
}
