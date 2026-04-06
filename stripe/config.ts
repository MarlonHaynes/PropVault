// TODO: Replace mock Stripe confirmation with a real server-side PaymentIntent route
export const STRIPE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '';
export const isDemoStripe = !STRIPE_KEY;

export const TEST_CARD = '4242 4242 4242 4242';

export async function mockPaymentIntent(amount: number): Promise<{ success: boolean; transactionId: string }> {
  await new Promise(r => setTimeout(r, 1500)); // simulate network
  return { success: true, transactionId: `pi_demo_${Date.now()}` };
}
