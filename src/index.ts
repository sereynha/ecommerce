import {app} from './app';
import {PORT} from "./utils/secret";

const appRun = app();

appRun.listen(PORT,() => {console.log(`Server is running on port ${PORT} !`)})