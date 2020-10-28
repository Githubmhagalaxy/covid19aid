import {gql} from "@apollo/client";

export const QUERY_ME = gql`
    query queryMe {
        me {
            _id
            email
            statistics {
                _id
                Country
                CountryCode
                Slug
                NewConfirmed
                TotalConfirmed
                NewDeaths
                TotalDeaths
                NewRecovered
                TotalRecovered
                Date
            }
            food_camps {
                _id
                food_resource_type
                agency
                location
                operational_status
                operational_notes
                current_process_for
                who_they_serve
                address
                latitude
                longitude
                phone_number
                website
                days_hours
                date_updated
            }
            savedHospitals {
                _id
                Zip
                Name
                Address
                City
                State
                telephone
                latitude
                longitude
                website
                beds
                naics_desc
                helipad
                population
                county
                distance
            }
        }
    }
`;

export const QUERY_SAVED_STATISTICS = gql`
    query queryStatistics {
        savedStatistics {
            _id
            Country
            CountryCode
            Slug
            NewConfirmed
            TotalConfirmed
            NewDeaths
            TotalDeaths
            NewRecovered
            TotalRecovered
            Date
        }
    }
`;

export const QUERY_SAVED_FOOD_CAMPS = gql`
    query queryFoodCamps {
        savedFoodCamps {
            _id
            food_resource_type
            agency
            location
            operational_status
            operational_notes
            current_process_for
            who_they_serve
            address
            latitude
            longitude
            phone_number
            website {
                url
            }
            days_hours
            date_updated
        }
    }
`;

export const QUERY_SAVED_HOSPITALS = gql`
    query queryHospitals {
        savedHospitals {
            _id
            Zip
            Name
            Address
            City
            State
            telephone
            latitude
            longitude
            website
            beds
            naics_desc
            helipad
            population
            county
            distance
        }
    }
`;

// export const QUERY_NEAR_HOSPITALS = gql`
//     query getHospitals($city: String!, $state: String!) {
//         getHospitals(city: $city, state: $state) {
//             Zip
//             Name
//             Address
//             City
//             State
//             telephone
//             latitude
//             longitude
//             website
//             beds
//             naics_desc
//             helipad
//             population
//             county
//             distance
//         }
//     }
// `