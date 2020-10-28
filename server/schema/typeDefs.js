const {gql} = require('apollo-server-express');

const typeDefs = gql`
    type Query {
        me: User
        savedStatistics: [Statistic]
        savedFoodCamps: [FoodCamp]
        savedHospitals: [Hospital]
#        getHospitals(city: String!, state: String!): [Hospital]
    }
    
    type Mutation {
        signup(email: String!, password: String!, name: String!): Auth
        login(email: String!, password: String!): Auth
        updateUser(email: String!, password: String, name: String!): User
        saveStatistic(statistic: StatisticInput!): User
        saveStatisticsBulk(statistics: [StatisticInput]!): User
        saveFoodCamp(foodCamp: FoodCampInput!): User
        saveFoodCampsBulk(foodCamps: [FoodCampInput]!): User
        saveHospital(hospital: HospitalInput!): User
        saveHospitalsBulk(hospitals: [HospitalInput]!): User
    }
    
    type Auth {
        token: ID
        user: User
    }
    
    type User {
        _id: ID
        email: String
        statistics: [Statistic]
        food_camps: [FoodCamp]
        hospitals: [Hospital]
    }
    
    type Statistic {
        _id: ID
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
    
    type FoodCamp {
        _id: ID
        food_resource_type: String
        agency: String
        location: String
        operational_status: String
        operational_notes: String
        current_process_for: String
        who_they_serve: String
        address: String
        latitude: Float
        longitude: Float
        phone_number: String
        website: Website
        days_hours: String
        date_updated: String
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
        phone_number: String
        website: WebsiteInput
        days_hours: String
        date_updated: String
    }
    
    type Website {
        url: String
    }
    
    input WebsiteInput {
        url: String
    }
    
    type Hospital {
        _id: ID
        Zip: String
        Name: String
        Address: String
        City: String
        State: String
        telephone: String
        latitude: Float
        longitude: Float
        website: String
        beds: Int
        naics_desc: String
        helipad: String
        population: Int
        county: String
        distance: Float
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

`;

module.exports = typeDefs;