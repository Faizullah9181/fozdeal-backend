import {
    TechnologyStatus,
    HealthcareStatus,
    FinanceAndFintechStatus,
    EcommerceStatus,
    EnergyAndCleanTechStatus,
    EducationTechStatus,
    ConsumerGoodsStatus,
    RealEstateStatus,
    ManufacturingStatus,
    EntertainmentAndMediaStatus,
    TravelAndHospitalityStatus,
    SocialImpactAndNonprofitStatus,
    TelecommunicationsStatus,
    AgricultureAndFoodTechStatus,
    SpaceAndAerospaceStatus
} from '../../../enums/Category';
import { GeoStatus } from '../../../enums/GeoStatus';
import { ProjectSizeStatus } from '../../../enums/ProjectSizeStatus';
import { ProjectLevel } from '../../../enums/ProjectLevel';

class categoyService {
    async getCategories() {
        const categoryresponse = {
            Technology: TechnologyStatus,
            Healthcare: HealthcareStatus,
            FinanceAndFintech: FinanceAndFintechStatus,
            Ecommerce: EcommerceStatus,
            EnergyAndCleanTech: EnergyAndCleanTechStatus,
            EducationTech: EducationTechStatus,
            ConsumerGoods: ConsumerGoodsStatus,
            RealEstate: RealEstateStatus,
            Manufacturing: ManufacturingStatus,
            EntertainmentAndMedia: EntertainmentAndMediaStatus,
            TravelAndHospitality: TravelAndHospitalityStatus,
            SocialImpactAndNonprofit: SocialImpactAndNonprofitStatus,
            Telecommunications: TelecommunicationsStatus,
            AgricultureAndFoodTech: AgricultureAndFoodTechStatus,
            SpaceAndAerospace: SpaceAndAerospaceStatus
        };

        const response = {
            categoryresponse,
            GeoStatus,
            ProjectLevel,
            ProjectSizeStatus
        };

        return response;
    }
}

export default new categoyService();
