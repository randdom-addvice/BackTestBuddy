import express, { Application } from "express";
import healthCheck from "express-healthcheck";
import compression from "compression";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import logger from "@/config/logger";
import { mergedResolvers, mergedSchemas } from "@/graphql/index";
import { altairExpress } from "altair-express-middleware";
import connectDb from "@/config/db";
import { seedDatabase } from "@/utils/seedData";
import { makeExecutableSchema } from "graphql-tools";

const NAMESPACE = "Server";

class App {
  public app: Application;
  public port: number;
  private readonly graphQLPath: string = "/graphql";

  constructor(port: number) {
    this.app = express();
    this.port = port;
    // (async () => await seedDatabase(connectDb))();
    connectDb();

    this.initializeMiddleware();
  }

  public async bootstrap(): Promise<void> {
    const schema = makeExecutableSchema({
      typeDefs: mergedSchemas,
      resolvers: mergedResolvers,
    });

    const server = new ApolloServer({
      // typeDefs: mergedSchemas,
      // resolvers: mergedResolvers,
      schema,
      plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground({
          settings: {
            "schema.polling.enable": false,
          },
        }),
      ],
    });

    server.listen().then(({ url }) => {
      console.log(`Server ready at ${url}`);
    });
    await new Promise<void>((resolve) =>
      this.app.listen({ port: this.port, path: this.graphQLPath }, resolve)
    );
    console.log(
      "🚀Playground:  https://studio.apollographql.com/sandbox/explorer"
    );
  }

  private initializeMiddleware(): void {
    const devContentSecurityPolicy = {
      directives: {
        scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
        imgSrc: ["'self'", "data:", "https://cdn.jsdelivr.net"],
      },
    };
    const IS_DEV = process.env.NODE_ENV !== "production";
    this.app.use(
      helmet({
        contentSecurityPolicy: IS_DEV ? devContentSecurityPolicy : undefined,
      })
    );

    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.use(express.json({ limit: "50mb" }));
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(compression());
    this.app.use("/altair", altairExpress({ endpointURL: "/graphql" }));
    this.app.use(
      "/healthCheck",
      healthCheck({
        healthy: function () {
          return {
            status: "up and healthy",
            upTime: process.uptime(),
          };
        },
      })
    );
  }

  private logRequests(): void {
    this.app.use((req, res, next) => {
      logger.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}]`);

      res.on("finish", () => {
        logger.info(
          NAMESPACE,
          `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}]`
        );
      });

      next();
    });
  }
}

export default App;
