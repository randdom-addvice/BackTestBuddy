import mongoose from "mongoose";
import config from "@/config/config";

const RETRY_TIMEOUT = 30000;

mongoose.Promise = global.Promise;

const connectDb = async function (): Promise<any> {
  return await mongoose
    .connect(config.server.mongoUrl)
    .then((db) => db)
    .catch((err) =>
      console.error("Mongoose connect(...) failed with err:", err)
    );
};

let isConnectedBefore = false;

connectDb();

mongoose.connection.on("error", () => {
  console.error("Could not connect to MongoDB");
});

mongoose.connection.on("disconnected", () => {
  console.error("Lost MongoDB connection...");
  if (!isConnectedBefore) {
    setTimeout(async () => await connectDb(), RETRY_TIMEOUT);
  }
});
mongoose.connection.on("connected", () => {
  isConnectedBefore = true;
  console.info("Connection established to MongoDB");
});

mongoose.connection.on("reconnected", () => {
  console.info("Reconnected to MongoDB");
});

mongoose.set("autoIndex", true);
export default connectDb;
