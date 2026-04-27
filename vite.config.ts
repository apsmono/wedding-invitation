import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

function normalizeBasePath(value: string) {
  if (value === "/") {
    return value;
  }

  return value.endsWith("/") ? value : `${value}/`;
}

function resolveRepositoryBase(repositoryName: string) {
  if (repositoryName.endsWith(".github.io")) {
    return "/";
  }

  return normalizeBasePath(`/${repositoryName}/`);
}

const configuredBase = process.env.VITE_BASE_PATH;
const repositoryBase = process.env.GITHUB_REPOSITORY
  ? resolveRepositoryBase(process.env.GITHUB_REPOSITORY.split("/")[1])
  : undefined;
const packageBase = process.env.npm_package_name
  ? resolveRepositoryBase(process.env.npm_package_name)
  : "/";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: configuredBase ?? repositoryBase ?? packageBase,
});
