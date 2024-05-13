import Lecture from "@/models/lectureModel";
import { archiveDocument } from "@/utils/factoryHandler";

export const PATCH = archiveDocument(Lecture);
