// import type { CodegenConfig } from "@graphql-codegen/cli";

// const config: CodegenConfig = {
//   overwrite: true,
//   schema: "http://localhost:4000/graphql",
//   // documents: "src/**/*.tsx",
// generates: {
//   "src/gql/": {
//     preset: "client",
// plugins: [
//   "typescript",
//   "typescript-operations",
//   "typescript-react-apollo",
// ],
// config: {
//   withHooks: true,
//   withComponent: true,
// },
//   },
// },
// };

// export default config;
import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:4000/graphql",
  // documents: ["src/**/*.ts", "src/**/*.tsx"],
  documents: ["./src/graphql/**/*.graphql"],
  generates: {
    "src/graphql/api.ts": {
      // preset: "client",
      presetConfig: {
        gqlTagName: "gql",
      },
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
        apolloReactHooksImportFrom: "@apollo/client",
      },
    },
  },
};

export default config;
