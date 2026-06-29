import client from "./client";

/**
 * Fetch a candidate's public profile by user ID.
 * Used by recruiters on the /candidate/:id page.
 */
export async function getCandidateProfile(id) {
    const response = await client.get(`users/${id}/`);
    return response.data;
}
