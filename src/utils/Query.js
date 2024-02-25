const fetchPhotos = () => {
  return `
   query GetPhotos {
      photos {
        updated_at
        id
        photo_url
        description
      }
    }
`;
};

const addActivity = (heading) => {
  return `    
    mutation MyMutation {
        insert_activity_one(object: {heading: "${heading}"}) {
          heading
          id
        }
    }
    `;
};

const insertOptionByActivityId = (activity_id, text, color) => {
  const insertOptionsByActivityId = `
      mutation MyMutation {
        insert_options_activity_one(object: {activity_id: "${activity_id}", name: "${text}", color: "${color}"}) {
          color
          id
          name
        }
      }
      `;
  return insertOptionsByActivityId;
};

const insertVoteByOptionId = (option_id) => {
  const insertVoteCounts = `
    mutation MyMutation {
      insert_vote_count_one(object: {current_count: 0, option_id: "${option_id}"}) {
        current_count
        id
        option_id
      }
    }
    `;
  return insertVoteCounts;
};

const getAllActivity = () => {
  const graphqlQuery = `
    query MyQuery {
      activity {
        heading
        id
      }
    }
`;
  return graphqlQuery;
};

const getActivityById = (formattedId) => {
  const graphqlQuery = `
    query MyQuery {
      activity_by_pk(id:  ${formattedId}) {
        heading
        id
        options_activities {
          color
          activity_id
          name
          id
          vote_counts {
            current_count
            id
            option_id
          }
        }
      }
    }
        `;
  return graphqlQuery;
};

const voteCountByOptionId = (id) => {
    const query = `
    query MyQuery {
      vote_count(where: {option_id: {_eq: ${id}}}) {
        current_count
        id
        option_id
      }
    }
    `
    return query
}

const getAllVotesByActivtyId = (formattedId) => {
    const graphqlQuery = `
    query MyQuery {
    activity_by_pk(id:  ${formattedId}) {
      heading
      options_activities {
        name
    
        vote_counts {
          current_count
        }
      }
    }
    }
      `
      return graphqlQuery
}

const updateVoteCountByOptionId = (formattedId,updatedCount) => {
    const query = `
    mutation MyMutation {
      update_vote_count(where: {option_id: {_eq: ${formattedId}}}, _set: {current_count:  ${updatedCount + 1}}) {
        returning {
          current_count
          id
          option_id
        }
      }
    }
    `
    return query
}
export {
  fetchPhotos,
  addActivity,
  insertOptionByActivityId,
  insertVoteByOptionId,
  getAllActivity,
  getActivityById,
  voteCountByOptionId,
  getAllVotesByActivtyId,
  updateVoteCountByOptionId
};
