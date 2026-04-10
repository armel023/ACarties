import { auth } from "@/auth";

const baseUrl = process.env.API_URL;

async function get(url: string) {
  const requestOptions = {
    method: "GET",
    headers: await getHeaaders(),
  };
  const res = await fetch(`${baseUrl}${url}`, requestOptions);
  return await handleResponse(res);
}

async function put(url: string, body: unknown) {
  const requestOptions = {
    method: "PUT",
    headers: await getHeaaders(),
    body: JSON.stringify(body),
  };
  const res = await fetch(`${baseUrl}${url}`, requestOptions);
  return await handleResponse(res);
}

async function post(url: string, body: unknown) {
  const requestOptions = {
    method: "POST",
    headers: await getHeaaders(),
    body: JSON.stringify(body),
  };
  const res = await fetch(`${baseUrl}${url}`, requestOptions);
  return await handleResponse(res);
}

async function del(url: string) {
  const requestOptions = {
    method: "DELETE",
    headers: await getHeaaders(),
  };
  const res = await fetch(`${baseUrl}${url}`, requestOptions);
  return await handleResponse(res);
}

async function getHeaaders() {
  const session = await auth();
  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  if (session) {
    headers.set("Authorization", `Bearer ${session.accessToken}`);
  }
  return headers;
}

async function handleResponse(res: Response) {
  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (res.ok) {
    return data || res.statusText;
  } else {
    const error = {
      status: res.status,
      message: typeof data === "string" ? data : res.statusText,
    };
    console.error("API Error:", error); // Debugging log
    return { error };
  }
}

export const fetchWrapper = {
  get,
  put,
  post,
  del,
};
