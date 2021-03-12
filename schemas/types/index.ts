import path from "path";
import { loadFilesSync } from "graphql-tools";

const allTypes = loadFilesSync(path.join(__dirname, "./*.schema.graphql"));

export default allTypes;
