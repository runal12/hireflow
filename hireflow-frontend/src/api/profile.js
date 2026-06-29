import client from "./client";

export async function getProfile() {
    const res = await client.get("users/profile/");
    return res.data;
}

export async function updateProfile(data) {
    const res = await client.patch(
        "users/profile/",
        data,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return res.data;
}