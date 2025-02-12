/// <reference types="vite/types/importMeta.d.ts" />
/// <reference types="react-scripts" />
/// <reference types="vite-plugin-svgr/client" />

declare module '*.svg' {
  const content: any;

  export default content;
}
