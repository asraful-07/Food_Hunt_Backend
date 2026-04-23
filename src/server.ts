import app from "./app";
import { envVars } from "./app/config/env";

const PORT = envVars.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
