import transactionRepository from '../../../repository/transaction.repository';

class TransactionsService {
    async updateTransaction(data) {
        const { ORDERID, RESPCODE } = data;

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

        await transactionRepository.updateTransaction(
            {
                status: status
            },
            { order_id: ORDERID }
        );
    }
}

export default new TransactionsService();
