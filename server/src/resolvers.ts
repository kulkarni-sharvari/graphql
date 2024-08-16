import { Resolvers } from "./types";

export const resolvers: Resolvers = {
    Query:
    {
        // returns an array of Tracks that will be used to populate
        // the homepage grid of our web client
        tracksForHome: (_, __, { dataSources }) => {
            return dataSources.trackAPI.getAllTracks();
        },
    },

    Track: {
        author: ({authorId}, _, { dataSources }) => {
            return dataSources.trackAPI.getAuthorByID(authorId)
        }
    }
}
