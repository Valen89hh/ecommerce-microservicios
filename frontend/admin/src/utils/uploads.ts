export async function uploadFileToS3(file: File): Promise<string> {
    const urlfetch = `${import.meta.env.VITE_BACKEND_URL}/api/upload-url`
    console.log(urlfetch)
    const res = await fetch(urlfetch, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNzUwMTkxMzIyLCJleHAiOjE3NTAxOTQ5MjIsIm5iZiI6MTc1MDE5MTMyMiwianRpIjoidllSWk9KVmV5dVBsZXlEWiIsInN1YiI6IjgiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.57ING43odLF7oTQKARSgzDi1CkO9SJjbLaTzF3_EP9c`
        },
        body: JSON.stringify({
        fileName: file.name,
        fileType: file.type,
        }),
    });
    console.log("Response: ", res)
    const { url, key } = await res.json();
    console.log("Url", url, "Key", key)

    await fetch(url, {
        method: "PUT",
        headers: {
        "Content-Type": file.type,
        },
        body: file,
    });

    return `https://${import.meta.env.NEXT_PUBLIC_S3_BUCKET}.s3.amazonaws.com/${key}`;
}
