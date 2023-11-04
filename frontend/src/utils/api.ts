import { IApiResponseError } from "../types/types";

export async function sendRequest<T>(
    url: string,
    method: string,
    body?: any,
    headers?: Record<string, string>
  ): Promise<{ status: number, data: T | IApiResponseError }> {
    const requestOptions: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify(body),
    };
  
    const response = await fetch(url, requestOptions);
  
    const responseData = await response.json();
  
    return {
      status: response.status,
      data: responseData,
    };
  }
  