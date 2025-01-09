import { makeInstaller } from "@xw-eui/utils";
import componens from "./componens";
import "@xw-eui/theme/index.css";
const installer = makeInstaller(componens);
export * from "@xw-eui/components";
export default installer;
