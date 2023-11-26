import CommonRepository from '../utils/common.repository';
import Invest from '../models/invest.model';
class InvestMentRepository extends CommonRepository {
    async createInvestment(data: any) {
        const result = await Invest.create(data);
        return result;
    }

    async getAll(data) {
        const result = await Invest.findAll({
            where: {
                ...data
            }
        });

        return result;
    }
}

export default new InvestMentRepository();
