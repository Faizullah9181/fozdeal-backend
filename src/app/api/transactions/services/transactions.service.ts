import transactionRepository from '../../../repository/transaction.repository';
import emalService from '../../../common/emal.service';
import userRepository from '../../../repository/user.repository';

class TransactionsService {
    async updateTransaction(data) {
        const { ORDERID, RESPCODE, transaction_number } = data;

        let status = 'pending';

        if (RESPCODE === '1') {
            status = 'paid';
        } else if (RESPCODE === '400') {
            status = 'pending';
        } else if (RESPCODE === '402') {
            status = 'pending';
        } else if (RESPCODE === '810') {
            status = 'failed';
        }

        const getUser = await transactionRepository.getOne({
            order_id: ORDERID
        });

        const user = getUser.user_id;

        const getUserEmail = await userRepository.findUser({ id: user });

        await emalService.sendPaymentEmail({
            status,
            transaction_number,
            email: getUserEmail.email
        });

        await transactionRepository.updateTransaction(
            {
                status: status
            },
            { order_id: ORDERID }
        );
    }
}

export default new TransactionsService();
