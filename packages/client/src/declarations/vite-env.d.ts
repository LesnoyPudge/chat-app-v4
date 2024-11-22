/// <reference types="vite/client" />



interface ImportMetaEnv extends PublicEnv {}

interface ImportMeta {
    readonly env: ImportMetaEnv;
};