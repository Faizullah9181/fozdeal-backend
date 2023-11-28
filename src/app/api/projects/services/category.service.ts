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
import {
    InterNational,
    CountryRegion,
    Country
} from '../../../enums/GeoStatus';
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

        type Entry = {
            name: string;
            value: string;
            countries?: { name: string; value: string }[];
            regions?: { name: string; value: string }[];
        };

        const geoResponse = {
            INTERNATIONAL: InterNational,
            LOCAL: Country,
            REGIONAL: CountryRegion
        };

        const geoCategories: Record<string, Entry> = Object.entries(
            geoResponse
        ).reduce((acc, [key, value]) => {
            const entry: Entry = {
                name: key,
                value: key.toLowerCase()
            };

            if (value === Country) {
                entry.countries = Object.entries(Country).map(
                    ([countryKey, countryValue]) => ({
                        name: countryKey,
                        value: countryValue.toLowerCase()
                    })
                );
            } else if (value === CountryRegion) {
                entry.regions = Object.entries(CountryRegion).map(
                    ([regionKey, regionValue]) => ({
                        name: regionKey,
                        value: regionValue.toLowerCase()
                    })
                );
            }

            acc[key.toLowerCase()] = entry;
            return acc;
        }, {});

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
