import { AuthorModel, TrackModel } from "../models";
import { RESTDataSource } from "@apollo/datasource-rest";

export class TrackAPI extends RESTDataSource {
    baseURL = "https://odyssey-lift-off-rest-api.herokuapp.com/";

    getAllTracks(): Promise<TrackModel[]> {
        // return this.get<TrackModel[]>("tracks")
        return this.get<TrackModel[]>("tracks");
    }

    getAuthorByID(authorId: String): Promise<AuthorModel> {
        return this.get<AuthorModel>(`author/${authorId}`)
    }
}