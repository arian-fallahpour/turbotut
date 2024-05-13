import Course from "@/models/courseModel";
import { archiveDocument } from "@/utils/factoryHandler";

export const PATCH = archiveDocument(Course);
