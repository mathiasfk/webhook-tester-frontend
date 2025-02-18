import { WebhookRequest } from "../types/WebhookRequest";
import { Webhook } from "../types/Webhook";

const API_BASE_URL = "https://localhost:7261";
const TOKEN_STORAGE_KEY = "webhook_tester_token";

async function getToken(): Promise<string> {
  let token = localStorage.getItem(TOKEN_STORAGE_KEY) || "";

  if (token === "") {
    console.log("No token found, requesting a new one...");
    const response = await fetch(`${API_BASE_URL}/token`, {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Failed to generate token");
    }

    const data = await response.json();
    token = data.token;
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
  }

  return token;
}

async function fetchWithAuth(endpoint: string, options: RequestInit = {}): Promise<any> {
  const token = await getToken();
  
  const headers = new Headers(options.headers);
  headers.append("Authorization", `${token}`);

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  return response.json();
}

async function fetchTabs(): Promise<Webhook[]> {
  return fetchWithAuth("/webhooks");
}

async function createTab(): Promise<Webhook> {
  return fetchWithAuth("/webhooks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  });
}

async function deleteTab(id: number): Promise<void> {
  return fetchWithAuth(`/webhooks/${id}`, {
    method: "DELETE"
  });
}

async function fetchRequests(webhookId: string): Promise<WebhookRequest[]> {
  const data = await fetchWithAuth(`/webhooks/${webhookId}/requests`);
  return data.map((request: WebhookRequest) => ({
    ...request,
    receivedAt: new Date(request.receivedAt),
  }));
}

function openSSEConnection(webhookId: number, onMessage: (request: WebhookRequest) => void): EventSource {
  const eventSource = new EventSource(`${API_BASE_URL}/webhooks/${webhookId}/stream`);
  
  eventSource.onmessage = (event) => {
    const request: WebhookRequest = JSON.parse(event.data);
    request.receivedAt = new Date(request.receivedAt);
    onMessage(request);
  };

  eventSource.onerror = (error) => {
    console.error("SSE connection error:", error);
    eventSource.close();
  };

  return eventSource;
}

export const apiService = {
  getToken,
  fetchWithAuth,
  fetchTabs,
  createTab,
  deleteTab,
  fetchRequests,
  openSSEConnection,
};
