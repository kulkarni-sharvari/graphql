import React from "react";
import { gql } from "../__generated__";
import { useQuery } from "@apollo/client";
import { Layout, QueryResult } from "../components";
import { useParams } from "react-router-dom";
import TrackDetail from "../components/track-detail";

export const GET_TRACK = gql(`
    query TrackById($trackById: ID!) {
  trackById(id: $trackById) {
    id
    title
    author {
      id
      name
      photo
    }
    thumbnail
    length
    modulesCount
    description
    numberofViews
    modules {
      id
      title
      length
    }
  }
}
  `);

const Track = () => {
    const { trackId = "" } = useParams();
    const { loading, error, data } = useQuery(GET_TRACK, {
        variables: { trackById: trackId },
    });
    return <Layout>
        <QueryResult error={error} loading={loading} data={data}>
            <TrackDetail track={data?.trackById} />
        </QueryResult>
    </Layout>;
};

export default Track;