import {gql} from "@apollo/client";

const typeDefs = gql`
    input StatisticInput {
        Country: String
        CountryCode: String
        Slug: String
        NewConfirmed: Int
        TotalConfirmed: Int
        NewDeaths: Int
        TotalDeaths: Int
        NewRecovered: Int
        TotalRecovered: Int
        Date: String
    }
    input FoodCampInput {
        food_resource_type: String
        agency: String
        location: String
        operational_status: String
        operational_notes: String
        current_process_for: String
        who_they_serve: String
        address: String
        latitude: String
        longitude: String
        website: WebsiteInput
        phone_number: String
        days_hours: String
        date_updated: String
    }

    input WebsiteInput {
        url: String
    }

    input HospitalInput {
        Zip: String
        Name: String
        Address: String
        City: String
        State: String
        telephone: String
        latitude: String
        longitude: String
        website: String
        beds: String
        naics_desc: String
        helipad: String
        population: String
        county: String
        distance: String
    }
`

export const MUTATION_SIGNUP = gql`
    mutation signupUser($email: String!, $password: String!, $name: String!) {
        signup(email: $email, password: $password, name: $name) {
            token
            user {
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
                    website {
                        url
                    }
                    days_hours
                    date_updated
                }
                hospitals {
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
    }
`;

export const MUTATION_LOGIN = gql`
    mutation loginUser($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
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
                    website {
                        url
                    }
                    days_hours
                    date_updated
                }
                hospitals {
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
    }
`;

export const MUTATION_UPDATE_USER = gql`
    mutation updateUser($email: String!, $password: String, $name: String!) {
        updateUser(email: $email, password: $password, name: $name) {
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
                website {
                    url
                }
                days_hours
                date_updated
            }
            hospitals {
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

export const MUTATION_SAVE_STATISTIC = gql`
    mutation saveStatistic($statistic: StatisticInput!) {
        saveStatistic(statistic: $statistic) {
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
                website {
                    url
                }
                days_hours
                date_updated
            }
            hospitals {
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

export const MUTATION_SAVE_STATISTICS_BULK = gql`
    mutation saveStatisticsBulk($statistic: [StatisticInput]!) {
        saveStatisticsBulk(statistic: $statistic) {
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
                website {
                    url
                }
                days_hours
                date_updated
            }
            hospitals {
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

export const MUTATION_SAVE_FOOD_CAMP = gql`
    mutation saveFoodCamp($foodCamp: FoodCampInput!) {
        saveFoodCamp(foodCamp: $foodCamp) {
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
                website {
                    url
                }
                days_hours
                date_updated
            }
            hospitals {
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

export const MUTATION_SAVE_FOOD_CAMPS_BULK = gql`
    mutation saveFoodCampsBulk($foodCamps: [FoodCampInput]!) {
        saveFoodCampsBulk(foodCamps: $foodCamp) {
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
                website {
                    url
                }
                days_hours
                date_updated
            }
            hospitals {
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

export const MUTATION_SAVE_HOSPITAL = gql`
    mutation saveHospital($hospital: HospitalInput!) {
        saveHospital(hospital: $hospital) {
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
                website {
                    url
                }
                days_hours
                date_updated
            }
            hospitals {
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

export const MUTATION_SAVE_HOSPITALS_BULK = gql`
    mutation saveHospitalsBulk($hospital: [HospitalInput]!) {
        saveHospitalsBulk(hospitals: $hospital) {
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
                website {
                    url
                }
                days_hours
                date_updated
            }
            hospitals {
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
