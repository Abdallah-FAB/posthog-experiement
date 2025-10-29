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

export const clarityClient = {
  identify: (
    customerId: string,
    sessionId: string,
    pageId: string,
    friendlyName: string
  ) => {
    clarity.identify(customerId, sessionId, pageId, friendlyName);
  },
  track: (event: string) => {
    clarity.event(event);
  },
  consent: (consent: boolean) => {
    clarity.consent(consent);
  },
  upgrade: (reason: string) => {
    clarity.upgrade(reason);
  },
  setTag: (key: string, value: string) => {
    clarity.setTag(key, value);
  },
};
