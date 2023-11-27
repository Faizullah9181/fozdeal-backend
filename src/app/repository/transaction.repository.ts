import CommonRepository from '../utils/common.repository';
import Transaction from '../models/transactions';
class TransactionRepository extends CommonRepository {
    async createTransaction(data: any) {
        const result = await Transaction.create(data);
        return result;
    }

    async updateTransaction(data: any, filter: any) {
        const result = await Transaction.update(data, {
            where: {
                ...filter
            }
        });
        return result;
    }

    async getAll(filter: any) {
        const result = await Transaction.findAll({
            where: {
                ...filter
            }
        });
        return result;
    }

    async getOne(filter: any) {
        const result = await Transaction.findOne({
            where: {
                ...filter
            }
        });
        return result;
    }
}

export default new TransactionRepository();
