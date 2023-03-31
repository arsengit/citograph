/**
 * @file api.ts
 * @description This file contains the API service.
 */
import useNotificationStore from '@/stores/notification';

// Root URL of the API
const API_ROOT = process.env.API_ROOT;

/**
 * parseResponse is a generic function that parses the response body
 * @param response is the response object
 * @returns <T>
 * @throws Error
 * @example
 * const response = await fetch(`${API_ROOT}${endpoint}`);
 * return parseResponse<T>(response);
 */
async function parseResponse<T>(response: Response): Promise<T> {
  try {
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      const error = new Error(data.detail);
      useNotificationStore.getState().setNotification({
        id: Date.now(),
        message: data.detail,
        status: 'danger',
      });
      throw error;
    }
  } catch (error) {
    throw error;
  }
}

/**
 * get is a generic function that makes a GET request
 * @param endpoint is the endpoint of the request
 * @returns IResponse<T>
 * @throws Error
 * @example
 * const response = await get<T>(endpoint);
 */
export const get = async <T>(endpoint: string): Promise<T> => {
  const response = await fetch(`${API_ROOT}${endpoint}`, {
    method: 'GET',
    headers: getRequestHeaders(),
  });
  return parseResponse<T>(response);
};

/**
 * post is a generic function that makes a POST request
 * @param endpoint is the endpoint of the request
 * @param data is the data to be sent in the request body
 * @returns IResponse<T>
 * @throws Error
 * @example
 * const response = await post<T>(endpoint, data);
 */
export const post = async <T>(endpoint: string, data: any): Promise<T> => {
  const response = await fetch(`${API_ROOT}${endpoint}`, {
    method: 'POST',
    headers: getRequestHeaders(),
    body: JSON.stringify(data),
  });
  return parseResponse<T>(response);
};

/**
 * put is a generic function that makes a PUT request
 * @param endpoint is the endpoint of the request
 * @param data is the data to be sent in the request body
 * @returns IResponse<T>
 * @throws Error
 * @example
 * const response = await put<T>(endpoint, data);
 */
export const put = async <T>(endpoint: string, data: any): Promise<T> => {
  const response = await fetch(`${API_ROOT}${endpoint}`, {
    method: 'PUT',
    headers: getRequestHeaders(),
    body: JSON.stringify(data),
  });
  return parseResponse<T>(response);
};

/**
 * remove is a generic function that makes a DELETE request
 * @param endpoint is the endpoint of the request
 * @returns IResponse<T>
 * @throws Error
 * @example
 * const response = await remove<T>(endpoint);
 */
export const remove = async <T>(endpoint: string): Promise<T> => {
  const response = await fetch(`${API_ROOT}${endpoint}`, {
    method: 'DELETE',
  });
  return parseResponse<T>(response);
};

/**
 * getTimezoneOffset is a function that returns the timezone offset
 * @returns string
 * @example
 * const timezoneOffset = getTimezoneOffset();
 */
function getTimezoneOffset(): string {
  return `${new Date().getTimezoneOffset()}`;
}

/**
 * getRequestHeaders is a function that returns the request headers
 * @returns object
 * @example
 * const requestHeaders = getRequestHeaders();
 * const response = await fetch(`${API_ROOT}${endpoint}`, {
 *  method: "POST",
 *  headers: requestHeaders,
 *  body: JSON.stringify(data),
 * });
 */
function getRequestHeaders() {
  return {
    'Content-Type': 'application/json',
    'X-Timezone-Offset': getTimezoneOffset(),
  };
}

export const API = { get, post, put, delete: remove };
