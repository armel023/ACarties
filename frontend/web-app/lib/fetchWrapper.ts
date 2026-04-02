import { auth } from "@/auth";

const baseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:6001/";

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
  const data = text && JSON.parse(text);
  if (res.ok) {
    return data || res.statusText;
  } else {
    const error = {
      status: res.status,
      message: res.statusText,
    };
    return { error };
  }
}

export const fetchWrapper = {
  get,
  put,
  post,
  del,
};
