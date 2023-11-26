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
        const categoryResponse = {
            SpaceAndAerospace: SpaceAndAerospaceStatus,
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
            AgricultureAndFoodTech: AgricultureAndFoodTechStatus
        };

        const projectCategories = Object.entries(categoryResponse).map(
            ([key, value]) => ({
                name: key,
                value: CategoryStatus[key],

                project_sub_categories: Object.entries(value).map(
                    ([subKey, subValue]) => ({
                        name: subKey,
                        value: subValue
                    })
                )
            })
        );

        const geoResponse = {
            INTERNATIONAL: GeoStatus.INTERNATIONAL,
            LOCAL: GeoStatus.LOCAL,
            REGIONAL: GeoStatus.REGIONAL
        };

        const geoCategories = Object.entries(geoResponse).map(
            ([key, value]) => ({
                name: key,
                value
            })
        );

        const sizeResponse = {
            LARGE: ProjectSizeStatus.LARGE,
            MEDIUM: ProjectSizeStatus.MEDIUM,
            SMALL: ProjectSizeStatus.SMALL
        };

        const sizeCategories = Object.entries(sizeResponse).map(
            ([key, value]) => ({
                name: key,
                value
            })
        );

        const levelResponse = {
            EARLY: ProjectLevel.EARLY,
            GROWTH: ProjectLevel.GROWTH,
            LATEORPRIVATE: ProjectLevel.LATEORPRIVATE,
            PRESEED: ProjectLevel.PRESEED,
            SEED: ProjectLevel.SEED
        };

        const levelCategories = Object.entries(levelResponse).map(
            ([key, value]) => ({
                name: key,
                value
            })
        );

        const response = {
            categories: projectCategories,
            project_geo_locations: geoCategories,
            project_size: sizeCategories,
            project_level: levelCategories
        };

        return response;
    }
}

export default new categoyService();
