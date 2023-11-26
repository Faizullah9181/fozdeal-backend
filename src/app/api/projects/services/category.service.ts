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
    SpaceAndAerospaceStatus,
    CategoryStatus
} from '../../../enums/Category';
import { GeoStatus } from '../../../enums/GeoStatus';
import { ProjectSizeStatus } from '../../../enums/ProjectSizeStatus';
import { ProjectLevel } from '../../../enums/ProjectLevel';

class categoyService {
    async getCategories() {
        const categoryresponse = {
            [CategoryStatus.SpaceAndAerospace]: SpaceAndAerospaceStatus,
            [CategoryStatus.Technology]: TechnologyStatus,
            [CategoryStatus.Healthcare]: HealthcareStatus,
            [CategoryStatus.FinanceAndFintech]: FinanceAndFintechStatus,
            [CategoryStatus.Ecommerce]: EcommerceStatus,
            [CategoryStatus.EnergyAndCleanTech]: EnergyAndCleanTechStatus,
            [CategoryStatus.EducationTech]: EducationTechStatus,
            [CategoryStatus.ConsumerGoods]: ConsumerGoodsStatus,
            [CategoryStatus.RealEstate]: RealEstateStatus,
            [CategoryStatus.Manufacturing]: ManufacturingStatus,
            [CategoryStatus.EntertainmentAndMedia]: EntertainmentAndMediaStatus,
            [CategoryStatus.TravelAndHospitality]: TravelAndHospitalityStatus,
            [CategoryStatus.SocialImpactAndNonprofit]:
                SocialImpactAndNonprofitStatus,
            [CategoryStatus.Telecommunications]: TelecommunicationsStatus,
            [CategoryStatus.AgricultureAndFoodTech]:
                AgricultureAndFoodTechStatus
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
