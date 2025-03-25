import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
import Business from "./models/Business";
import Category from "./models/Category";
import Faq from "./models/Faq";
import Like from "./models/Like";
import AppLocation from "./models/Location";
import Measurement from "./models/Measurement";
import AppComment from "./models/Comment";
import AppNotification from "./models/Notification";
import Post from "./models/Post";
import Review from "./models/Review";
import Save from "./models/Save";
import User from "./models/User";
import Media from "./models/Media";

dotenv.config();

const port = Number(process.env.DATABASE_PORT);

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST,
  port: port,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  logging: false,
  entities: [
    Business,
    Category,
    AppComment,
    Faq,
    Like,
    AppLocation,
    Measurement,
    AppNotification,
    Post,
    Review,
    Save,
    User,
    Media,
  ],
  migrations: [`${__dirname}/migrations/*.{ts,js}`],
});
