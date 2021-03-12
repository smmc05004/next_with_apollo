import path from "path";
import { loadFilesSync } from "graphql-tools";

const allResolvers = loadFilesSync(path.join(__dirname, "./*.resolvers.ts"));

export default allResolvers;
