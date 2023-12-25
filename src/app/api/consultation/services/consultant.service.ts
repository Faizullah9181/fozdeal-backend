import consultantRepository from '../../../repository/consultant.repository';

class ConsultantService {
    // update is isTeam to false for all the consultants
    async updateAllIsTeamTofalse(data: any) {
        let result = {};
        if (data.isTeam) {
            result = await consultantRepository.updateAllIsTeamTofalse();
        }
        return result;
    }
    // create consultant
    async createConsultant(data: any) {
        const result = await consultantRepository.createConsultant(data);
        return result;
    }
    // get consultant by user id
    async getConsultant(filter: {}) {
        const result = await consultantRepository.getConsultant(filter);
        return result;
    }
    // update consultant by id
    async updateConsultant(data: any) {
        const result = await consultantRepository.updateConsultant(data);
        return result;
    }
}

export default new ConsultantService();
