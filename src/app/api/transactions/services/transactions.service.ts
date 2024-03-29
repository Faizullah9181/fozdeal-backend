import transactionRepository from '../../../repository/transaction.repository';
import emalService from '../../../common/email.service';
import userRepository from '../../../repository/user.repository';

class TransactionsService {
    async updateTransaction(data) {
        let { ORDERID, RESPCODE, transaction_number } = data;

        const firstChar = ORDERID.charAt(0);

        const secondChar = ORDERID.charAt(1);
        ORDERID = ORDERID.slice(2);

        const language = secondChar === 'A' ? 'ar' : 'en';

        let status = 'pending';

        if (RESPCODE === '1' && firstChar === 'O') {
            status = 'paid';
        } else if (RESPCODE === '400' && firstChar === 'O') {
            status = 'pending';
        } else if (RESPCODE === '402' && firstChar === 'O') {
            status = 'pending';
        } else if (RESPCODE === '810' && firstChar === 'O') {
            status = 'failed';
        } else if (RESPCODE === '1' && firstChar === 'S') {
            status = 'subscription paid';
        } else if (RESPCODE === '400' && firstChar === 'S') {
            status = 'subscription pending';
        } else if (RESPCODE === '402' && firstChar === 'S') {
            status = 'subscription pending';
        } else if (RESPCODE === '810' && firstChar === 'S') {
            status = 'subscription failed';
        }

        const getUser = await transactionRepository.getOne({
            order_id: ORDERID
        });

        const user = getUser.user_id;

        const getUserEmail = await userRepository.findUser({ id: user });

        await emalService.sendPaymentEmail({
            status,
            transaction_number,
            email: getUserEmail.email,
            name: getUserEmail.first_name,
            language: language
        });

        if (status === 'paid') {
            const emailData = {
                name: getUserEmail.first_name,
                email: getUserEmail.email,
                language: language
            };

            await emalService.sendProductUploadEmail(emailData);
        }

        await transactionRepository.updateTransaction(
            {
                status: status
            },
            { order_id: ORDERID }
        );

        if (status === 'subscription paid') {
            await userRepository.updateUser(
                {
                    is_subscribe: 1,
                    subscription_started_at: new Date().toString()
                },
                user
            );
        }
    }

    async createSubscription(user_id) {
        const data = {
            user_id: user_id,
            order_id: Math.floor(100000 + Math.random() * 900000),
            status: 'subscription_pending'
        };

        await transactionRepository.createTransaction(data);

        return { order_id: data.order_id };
    }
}

export default new TransactionsService();
