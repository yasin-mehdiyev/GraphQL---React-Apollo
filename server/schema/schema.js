const graphql = require("graphql");
const _ = require("lodash");
const axios = require("axios");

const { GraphQLObjectType, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLString, GraphQLInt } = graphql;

const CompanyType = new GraphQLObjectType({
    name: "Company",
    fields: () => ({
      id: { type: GraphQLString },
      name: { type: GraphQLString },
      description: { type: GraphQLString },
      users: {
          type: new GraphQLList(UserType),
          resolve(parentValue, args) {
            return axios.get(`http://localhost:3000/companies/${parentValue.id}/users`)
              .then(res => res.data)
          }
      }
    }),
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLString },
    firstname: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3000/companies/${parentValue.companyId}`)
          .then((resp) => resp.data);
      },
    },
  },
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        // get data
        return axios
          .get(`http://localhost:3000/users/${args.id}`)
          .then((resp) => resp.data);
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        // get data
        return axios
          .get(`http://localhost:3000/users`)
          .then((resp) => resp.data);
      },
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLString } },
      resolve(parentVal, args) {
        // get data
        return axios
          .get(`http://localhost:3000/companies/${args.id}`)
          .then((resp) => resp.data);
      },
    },
  },
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                firstname: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) },
                companyId: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parentVal, { firstname, age, companyId }){
                return axios.post('http://localhost:3000/users', { firstname, age, companyId }).then((resp) => resp.data);
            }
        },
        deleteUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parentVal, { id }){
                return axios.delete(`http://localhost:3000/users/${id}`).then((resp)=>resp.data);
            }
        },
        editUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
                firstname: { type: GraphQLString },
                age: { type: GraphQLInt },
                company: { type: GraphQLString }
            },
            resolve(parentVal, args){
                return axios.patch(`http://localhost:3000/users/${args.id}`, args).then((resp) => resp.data);
            }
        }

    }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});
