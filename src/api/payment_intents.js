import Stripe from 'stripe';

const stripe = new Stripe('sk_test_gvfmtOJVlOFbhP5YX7xAa3pU');

export default async (req, res) => {
    const { id, amount } = req.body;
    if (req.method === 'POST') {
        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount,
                currency: 'USD',
                payment_method: id,
                confirm: true,
            });
            console.log('Payment Intent:', paymentIntent);
            res.status(200).json({ confirm: 'YAY!' });
        } catch (err) {
            res.status(500).json({ statusCode: 500, message: err.message });
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
};
