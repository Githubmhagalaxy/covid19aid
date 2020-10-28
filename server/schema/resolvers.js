const {AuthenticationError} = require('apollo-server-express')
const {Users} = require('../db/models');
const {signToken} = require('../utils/auth');
const axios = require('axios');

module.exports = {
    Query: {
        me: async (parent, args, context, info) => {
            try {
                if(context.user) {
                    const user = await Users.findOne({
                        _id: context.user._id
                    });
                    if(user) {
                        return user
                    }
                }
            } catch (e) {
                throw new Error(e.message);
            }
        },
        savedStatistics: async (parent, args, context, info) => {
            try {
                if(context.user) {
                    const user = await Users.findOne({
                        _id: context.user._id
                    });
                    if(user) {
                        return user.statistics
                    }
                }
            } catch (e) {
                throw new Error(e.message);
            }
        },
        savedFoodCamps: async (parent, args, context, info) => {
            try {
                if(context.user) {
                    const user = await Users.findOne({
                        _id: context.user._id
                    });
                    if(user) {
                        return user.food_camps
                    }
                }
            } catch (e) {
                throw new Error(e.message);
            }
        },
        savedHospitals: async (parent, args, context, info) => {
            try {
                if(context.user) {
                    const user = await Users.findOne({
                        _id: context.user._id
                    });
                    if(user) {
                        return user.hospitals
                    }
                }
            } catch (e) {
                throw new Error(e.message);
            }
        },
        // getHospitals: async (parent, args, context, info) => {
        //     try {
        //         const {city, state} = args
        //         console.log(args)
        //         const zipCodes = await axios.get(`https://service.zipapi.us/zipcode/zips?X-API-KEY=7406190977d0b08251494dab08254d98&city=${city}&state=${state}`);
        //         console.log('here');
        //         if(zipCodes.data.data.length) {
        //             const zipCode = zipCodes.data.data[0];
        //             const {data} = await axios.get(`https://service.zipapi.us/hospital/radius/${zipCode}?X-API-KEY=7406190977d0b08251494dab08254d98&radius=20`);
        //             console.log(data);
        //             return data
        //         } else {
        //             throw new Error('Could not find Any zip codes');
        //         }
        //     } catch (e) {
        //         throw new Error(e.message);
        //     }
        // }
    },
    Mutation: {
        signup: async (parent, args, context, info) => {
            try {
                const {email, password, name} = args;
                if(context.user) {
                    throw new Error(`you are already logged in`);
                } else {
                    const newUser = new Users({
                        email,
                        password,
                        name
                    });
                    const user = await newUser.save();
                    if(user) {
                        return {
                            user,
                            token: signToken({
                                _id: user._id,
                                email: user.email
                            })
                        }
                    }
                }
            } catch (e) {
                throw new AuthenticationError(`Could not add the user, Error with message: ${e.message}`);
            }
        },
        login: async (parent, args, context, info) => {
            try {
                const {email, password} = args;
                if(context.user) {
                    throw new Error(`you are already logged in`);
                } else {
                    const user = await Users.findOne({ email });
                    if(!user) {
                        throw new Error('could not find any user with that email')
                    }
                    if(!(await user.isCorrectPassword(password))) {
                        throw new Error('Oops! wrong password');
                    }
                    return {
                        user,
                        token: signToken({
                            _id: user._id,
                            email: user.email
                        })
                    }
                }
            } catch (e) {
                throw new AuthenticationError(`Could not log in, Error with message: ${e.message}`);
            }
        },
        updateUser: async (parent, args, context, info) => {
            try {
                const {email, password, name} = args;
                if(context.user) {
                    return await Users.findOneAndUpdate(
                        {_id: context.user._id},
                        {email, password, name},
                        {new: true}
                    );
                } else {
                    throw new AuthenticationError('You should log in first')
                }
            } catch (e) {
                throw new Error(`Something went wrong, Error with message: ${e.message}`);
            }
        },
        saveStatistic: async (parent, args, context, info) => {
            try {
                const {statistic} = args;
                if(context.user) {
                    const user = await Users.findOne(
                        {_id: context.user._id},
                    );
                    user.statistics.push(statistic);
                    return await user.save()
                } else {
                    throw new AuthenticationError('You should log in first')
                }
            } catch (e) {
                throw new Error(`Something went wrong, Error with message: ${e.message}`);
            }
        },
        saveStatisticsBulk: async (parent, args, context, info) => {
            try {
                const {statistics} = args;
                if(context.user) {
                    return await Users.findOneAndUpdate(
                        {_id: context.user._id},
                        {statistics: statistics},
                        {new: true}
                    );
                } else {
                    throw new AuthenticationError('You should log in first')
                }
            } catch (e) {
                throw new Error(`Something went wrong, Error with message: ${e.message}`);
            }
        },
        saveFoodCamp: async (parent, args, context, info) => {
            try {
                const {foodCamp} = args;
                if(context.user) {
                    const user =  await Users.findOne(
                        {_id: context.user._id},
                    );
                    user.food_camps.push(foodCamp);
                    return await user.save()
                } else {
                    throw new AuthenticationError('You should log in first')
                }
            } catch (e) {
                throw new Error(`Something went wrong, Error with message: ${e.message}`);
            }
        },
        saveFoodCampsBulk: async (parent, args, context, info) => {
            try {
                const {foodCamps} = args;
                if(context.user) {
                    return await Users.findOneAndUpdate(
                        {_id: context.user._id},
                        {food_camps: foodCamps},
                        {new: true}
                    );
                } else {
                    throw new AuthenticationError('You should log in first')
                }
            } catch (e) {
                throw new Error(`Something went wrong, Error with message: ${e.message}`);
            }
        },
        saveHospital: async (parent, args, context, info) => {
            try {
                const {hospital} = args;
                if(context.user) {
                    const user =  await Users.findOne(
                        {_id: context.user._id}
                    );
                    user.hospitals.push(hospital);
                    return await user.save()
                } else {
                    throw new AuthenticationError('You should log in first')
                }
            } catch (e) {
                throw new Error(`Something went wrong, Error with message: ${e.message}`);
            }
        },
        saveHospitalsBulk: async (parent, args, context, info) => {
            try {
                const {hospitals} = args;
                if(context.user) {
                    return await Users.findOneAndUpdate(
                        {_id: context.user._id},
                        {hospitals},
                        {new: true}
                    );
                } else {
                    throw new AuthenticationError('You should log in first')
                }
            } catch (e) {
                throw new Error(`Something went wrong, Error with message: ${e.message}`);
            }
        }
    }
}