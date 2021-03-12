import path from "path";
import { loadFilesSync } from "graphql-tools";

const allTypes = loadFilesSync(path.join(__dirname, "./*.schema.graphql"));

export default allTypes;

// import { fileLoader, mergeTypes } from "merge-graphql-schemas";

// const allTypes = fileLoader(path.join(__dirname, "./*.graphql"));
// console.log("allTypes: ", allTypes);

// export default allTypes;
