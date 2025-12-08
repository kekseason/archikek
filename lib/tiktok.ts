// TikTok Pixel Event Tracking
// Pixel ID: D4RI2DRC77UET7S4GB5G

declare global {
  interface Window {
    ttq: {
      track: (event: string, params?: Record<string, any>) => void
      page: () => void
      identify: (params: Record<string, any>) => void
    }
  }
}

// Track ViewContent - when user visits /create page
export function trackViewContent(contentName?: string) {
  if (typeof window !== 'undefined' && window.ttq) {
    window.ttq.track('ViewContent', {
      content_id: 'map_creator',
      content_name: contentName || 'Map Creator',
      content_type: 'product'
    })
  }
}

// Track InitiateCheckout - when user clicks checkout button
export function trackInitiateCheckout(value: number, currency: string = 'USD', planType?: string) {
  if (typeof window !== 'undefined' && window.ttq) {
    window.ttq.track('InitiateCheckout', {
      content_id: planType === 'subscription' ? 'pro_plan' : 'credits_pack',
      content_name: planType === 'subscription' ? 'ArchiKEK Pro' : 'ArchiKEK Credits',
      value: value,
      currency: currency
    })
  }
}

// Track CompletePayment - after successful purchase
export function trackCompletePayment(value: number, currency: string = 'USD', contentName?: string) {
  if (typeof window !== 'undefined' && window.ttq) {
    window.ttq.track('CompletePayment', {
      content_id: contentName === 'ArchiKEK Pro' ? 'pro_plan' : 'credits_pack',
      content_name: contentName || 'ArchiKEK Credits',
      content_type: 'product',
      value: value,
      currency: currency
    })
  }
}

// Track custom events
export function trackCustomEvent(eventName: string, params?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.ttq) {
    window.ttq.track(eventName, params)
  }
}
