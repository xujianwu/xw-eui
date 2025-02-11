import { makeInstaller } from "@xw-eui/utils";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import componens from "./componens";
import "@xw-eui/theme/index.css";

library.add(fas);
const installer = makeInstaller(componens);
export * from "@xw-eui/components";
export default installer;
