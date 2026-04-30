import 'dotenv/config';

import Stripe from 'stripe';
import * as Yup from 'yup';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Função para calcular o valor total do pedido
const calculateOrderAmount = (items) => {
const total = items.reduce((acc, current) => {
return current.price * current.quantity + acc
}, 0)
return total * 100;
};

// Controller para criar um intento de pagamento com o Stripe
class CreatePaymentIntentController {
async store(request, response) {


    const schema = Yup.object().shape({
        products: Yup.array().required().of(
            Yup.object({
                id: Yup.number().required(),
                quantity: Yup.number().required(),
                price: Yup.number().required(),
            })
        )
    });

// Validação dos dados recebidos na requisição
    try {
        schema.validateSync(request.body, { abortEarly: false, strict: true });
    } catch (err) {
        return response.status(400).json({ error: err.errors });
    }


    const { products } = request.body;

// Calcula o valor total do pedido
    const amount = calculateOrderAmount(products);

// Cria um intento de pagamento com o Stripe
    const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'brl',
        automatic_payment_methods: {
            enabled: true, 
        }, 
    });

// Retorna o client secret do intento de pagamento para o frontend, além de um link para o dashboard do Stripe para verificar o status do pagamento
    response.json({
        clientSecret: paymentIntent.client_secret,
        dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`,
    });
}

}


export default new CreatePaymentIntentController();