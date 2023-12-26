import express, { Application } from "express";
import healthCheck from "express-healthcheck";
import compression from "compression";
import session from "express-session";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { ApolloServer } from "apollo-server";
// import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import MongoDBStore from "connect-mongodb-session";
import cookieParser from "cookie-parser";

import logger from "@/config/logger";
import { mergedResolvers, mergedSchemas } from "@/graphql/index";
import { altairExpress } from "altair-express-middleware";
import connectDb from "@/config/db";
import { seedDatabase } from "@/utils/seedData";
import { makeExecutableSchema } from "graphql-tools";
import { IUser } from "@/graphql/user/types";
import { generateCSRFToken, getUserFromToken } from "@/resources/services/auth";
import config from "./config/config";
import { throwGraphQLError } from "./resources/services/errorHandler";

declare module "express-session" {
  interface Session {
    user?: IUser;
  }
}

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
      csrfPrevention: true,
      schema,
      context: ({ req }) => {
        const token = req.headers.authorization || "";
        const user = getUserFromToken(token);
        // req.session.user = user;

        return { user, session: req };
      },
      plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground({
          settings: {
            "schema.polling.enable": false,
          },
        }),
      ],
    });
    // await server.start();
    // server.applyMiddleware({ app: this.app });

    // await server.listen();

    await new Promise<void>((resolve) =>
      this.app.listen({ port: this.port, path: this.graphQLPath }, resolve)
    );
    server.listen().then(({ url }) => {
      console.log(`Server ready at ${url} `);
    });
    console.log(
      "🚀Playground:  https://studio.apollographql.com/sandbox/explorer"
    );
  }

  private initializeMiddleware(): void {
    let sess = {
      secret: process.env.EXPRESS_SESSION_SECRET ?? "Unfound secret",
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }, // 1 week,
    };
    this.app.use(session(sess));

    const devContentSecurityPolicy = {
      directives: {
        scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
        imgSrc: ["'self'", "data:", "https://cdn.jsdelivr.net"],
      },
    };
    const IS_DEV = process.env.NODE_ENV !== "production";
    const sessionStore = MongoDBStore(session);
    const store = new sessionStore({
      uri: config.server.mongoUrl,
      collection: "loggedSessions",
    });
    store.on("error", function (error) {
      console.log(`Can't connect to store. Reason: ${error}`);
    });
    this.app.use(
      helmet({
        contentSecurityPolicy: IS_DEV ? devContentSecurityPolicy : undefined,
      })
    );

    this.app.use(cors());
    this.app.use(morgan("dev"));
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
