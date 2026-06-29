import client from "./client";

export async function getApplicants(jobId, search = "") {
    const params = { job: jobId };
    if (search.trim()) params.search = search.trim();

    const response = await client.get("applications/applicants/", { params });
    return response.data;
}

export async function updateApplicationStatus(id, status) {
    const response = await client.patch(
        `applications/${id}/status/`,
        { status }
    );
    return response.data;
}