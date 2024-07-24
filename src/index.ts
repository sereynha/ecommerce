import {app} from "./app";

const port = process.env.PORT || 3000;
const appRun = app();

appRun.listen(port,() => {console.log(`Server is running on port ${port} !`)})