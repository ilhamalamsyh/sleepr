import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { CreateChargeDto } from '../../../libs/common/src/dto/create-charge.dto';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY'),
    {
      apiVersion: '2024-09-30.acacia',
    },
  );

  constructor(private readonly configService: ConfigService) {}

  async createCharge({ card, amount }: CreateChargeDto) {
    // const token = await this.stripe.tokens.create({
    //   card: {
    //     number: '4242424242424242',
    //     exp_month: '5',
    //     exp_year: '2026',
    //     cvc: '314',
    //   },
    // });

    // console.log('token:', token);
    // const paymentMethod = await this.stripe.paymentMethods.create({
    //   type: 'card',
    //   card,
    // });

    // console.log('paymentMethod: ', paymentMethod);

    const paymentIntent = await this.stripe.paymentIntents.create({
      payment_method: 'pm_card_visa',
      amount: amount * 100,
      confirm: true,
      // payment_method_types: ['card'],
      currency: 'usd',
      automatic_payment_methods: {
        allow_redirects: 'never',
        enabled: true,
      },
    });

    console.log('paymentIntent: ', paymentIntent);

    return paymentIntent;
  }
}
