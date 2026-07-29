export type Result = {
  originalAmount: number;
  discountAmount: number;
  finalAmount: number;
};

export class DiscountService {
  applyCoupon(
    amount: number,
    couponCode: string
  ): Result {

    if (amount <= 0) {
      throw new Error("Order amount must be greater than zero");
    }

    const coupons: Record<string, number> = {
      PROMO10: 0.10,
      PROMO20: 0.20,
    };

    const discountRate = coupons[couponCode];

    if (!discountRate) {
      throw new Error("Invalid coupon");
    }

    let discount = amount * discountRate;

    if (discount > 100) {
      discount = 100;
    }

    const finalAmount = Math.max(0, amount - discount);

    return {
      originalAmount: amount,
      discountAmount: discount,
      finalAmount,
    };
  }
}