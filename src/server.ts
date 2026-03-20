import app from "./app";
import { envVars } from "./app/config/env";

const PROT = envVars.PORT || 5002;

const bootstrap = () => {
  try {
    app.listen(PROT, () => {
      console.log(`Server on running ${PROT}`);
    });
  } catch (err: any) {
    console.error("Failed to start server:", err);
  }
};

bootstrap();
