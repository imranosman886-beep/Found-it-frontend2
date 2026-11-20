
//Import main helper funtion for making API requests(handles fetch, headers and login token)
import apiRequest from "./api";

//Function 1 - send a new claim to the backend when a user wants to claim a found item. Takes the found item ID and the user's message as parameters. Returns the API response.
export async function createClaim(found_item_id, message) {
  
    //Send a POST request (because we are creating new data in the database)
    return apiRequest("/api/claims", {
    method: "POST",

    //Convert our javascript object into a JSON string so the backend can read it
    body: JSON.stringify({
      found_item_id, // Which item the user is claiming
      message, // The user's message explaining why they are claiming the item
    }),
  });
}

//Function 2 - get all claims that belong to the currently logged-in user
export async function getMyClaims() {

  //No method specified means it defaults to GET (just reading/fetching data from the database)
  return apiRequest("/api/claims/my");
}
=======

import apiRequest from "./api";

export async function createClaim(found_item_id, message) {
  return apiRequest("/api/claims", {
    method: "POST",
    body: JSON.stringify({
      found_item_id,
      message,
    }),
  });
}

export async function getMyClaims() {
  return apiRequest("/api/claims/my");
}

