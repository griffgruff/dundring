/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_ENV_OVERRIDE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
