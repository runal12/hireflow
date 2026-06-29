import client from "./client";

export async function applyForJob(jobId) {
    const response = await client.post("applications/", {
        job: jobId,
    });

    return response.data;
}

export async function getMyApplications() {
    const response = await client.get("applications/my/");
    return response.data;
}


export async function checkApplication(jobId) {
    const response = await client.get(`applications/check/?job=${jobId}`);
    return response.data;
}