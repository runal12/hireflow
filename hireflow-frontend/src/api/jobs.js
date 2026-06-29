import client from "./client";

/**
 * Fetch jobs with optional search/filter params.
 * @param {Object} params - e.g. { search, location, type, experience }
 */
export async function getJobs(params = {}) {
    const response = await client.get("jobs/", { params });
    return response.data;
}

export async function getJob(id) {
    const response = await client.get(`jobs/${id}/`);
    return response.data;
}

export async function createJob(jobData) {
    const response = await client.post("jobs/", jobData);
    return response.data;
}

export async function updateJob(id, jobData) {
    const response = await client.put(`jobs/${id}/`, jobData);
    return response.data;
}

export async function deleteJob(id) {
    const response = await client.delete(`jobs/${id}/`);
    return response.data;
}

export async function getMyJobs() {
    const response = await client.get("jobs/my/");
    return response.data;
}