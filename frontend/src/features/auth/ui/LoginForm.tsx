import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../api/login";

export function LoginForm() {
  const [tenantSlug, setTenantSlug] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    mutation.mutate({ tenantSlug, email, password });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={tenantSlug}
        onChange={(e) => setTenantSlug(e.target.value)}
        placeholder="tenant"
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
      />
      <input
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />
      <button type="submit" disabled={mutation.isPending}>
        Войти
      </button>
      {mutation.isError && <p>{(mutation.error as Error).message}</p>}
    </form>
  );
}
