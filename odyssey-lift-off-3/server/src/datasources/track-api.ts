import { RESTDataSource } from "@apollo/datasource-rest";
import { TrackModel, AuthorModel, ModuleModel } from "../models"

export class TrackAPI extends RESTDataSource {
  baseURL = "https://odyssey-lift-off-rest-api.herokuapp.com/";

  getTracksForHome() {
    return this.get<TrackModel[]>("tracks");
  }

  getAuthor(authorId: string) {
    return this.get<AuthorModel>(`author/${authorId}`);
  }

  getTrackById(id: String): Promise<TrackModel> {
    return this.get<TrackModel>(`track/${id}`)
  }

  getTrackModules(trackId: String): Promise<ModuleModel[]> {
    return this.get<ModuleModel[]>(`track/${trackId}/modules`)
  }
}
