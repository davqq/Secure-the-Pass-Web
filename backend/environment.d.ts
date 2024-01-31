declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_HOST: string;
      DB_USER: string;
      DB_PASSWORD: string;
      DB_DATABASE: string;
      Origin: string;
      JWT: string;
      PORT: number;
      ENCYPTION: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
