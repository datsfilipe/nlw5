import { Router } from "express";
import { SettingsController } from "./controllers/SettingsController";

const routes = Router();

const settingController = new SettingsController();

routes.post("/settings", settingController.create);

export { routes };