import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [serviceError, setServiceError] = useState("");

  const refreshUser = useCallback(async () => {
    setLoading(true);
    setServiceError("");
    try {
      const payload = await apiRequest("/api/auth/me", { method: "GET" }, true);
      setUser(payload.user || null);
    } catch (error) {
      if (error.status !== 401) {
        setServiceError(error.message);
      }
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const register = useCallback(async (form) => {
    const payload = await apiRequest("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(form),
    });
    setUser(payload.user);
    return payload.user;
  }, []);

  const login = useCallback(async (form) => {
    const payload = await apiRequest("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(form),
    });
    setUser(payload.user);
    return payload.user;
  }, []);

  const logout = useCallback(async () => {
    await apiRequest("/api/auth/logout", { method: "POST" }, true);
    setUser(null);
  }, []);

  const updateEmail = useCallback(async (form) => {
    const payload = await apiRequest("/api/auth/update-email", {
      method: "PATCH",
      body: JSON.stringify(form),
    });
    setUser(payload.user);
    return payload.user;
  }, []);

  const updatePassword = useCallback(async (form) => {
    return apiRequest("/api/auth/update-password", {
      method: "PATCH",
      body: JSON.stringify(form),
    });
  }, []);

  const deleteAccount = useCallback(async (form) => {
    await apiRequest("/api/auth/delete-account", {
      method: "DELETE",
      body: JSON.stringify(form),
    });
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      serviceError,
      refreshUser,
      register,
      login,
      logout,
      updateEmail,
      updatePassword,
      deleteAccount,
    }),
    [
      user,
      loading,
      serviceError,
      refreshUser,
      register,
      login,
      logout,
      updateEmail,
      updatePassword,
      deleteAccount,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

async function apiRequest(path, options = {}, allowUnauthorized = false) {
  let response;
  try {
    response = await fetch(path, {
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });
  } catch {
    throw new ApiError(
      "Authentication service is not reachable. Check the production API configuration.",
      503,
    );
  }

  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json") ? await response.json() : {};

  if (!response.ok && !(allowUnauthorized && response.status === 401)) {
    throw new ApiError(
      payload.error || "Authentication request failed. Please try again.",
      response.status,
    );
  }

  return payload;
}

class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}
