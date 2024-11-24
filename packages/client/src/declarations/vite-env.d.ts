/// <reference types="vite/client" />



// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ImportMetaEnv extends PublicEnv {}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}