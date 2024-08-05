import Chapter from "@/models/chapterModel";
import Content from "@/models/contentModel";
import Course from "@/models/courseModel";
import Lecture from "@/models/lectureModel";
import { routeHandler } from "@/utils/authentication";
import { connectDB } from "@/utils/database";
import { NextResponse } from "next/server";

export const POST = routeHandler(
  async function (req, { params }) {
    await connectDB();

    const chaptersPerCourse = 3;
    const lecturesPerChapter = 3;

    const course = await Course.create({
      name: "Test Course",
      image: "test.png",
      summary:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eu turpis maximus, tristique ex a, mollis tellus. Suspendisse dictum dolor porta ligula venenatis suscipit sed vel dui. Maecenas eu massa fermentum, rhoncus turpis at, vehicula urna. Curabitur eros libero, facilisis in tellus ut, elementum ultrices dolor. Sed iaculis a sapien a faucibus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In blandit congue fermentum. Curabitur sed aliquam mauris, et pretium arcu. Fusce feugiat ipsum magna, nec viverra turpis dictum vel. Nullam id erat venenatis, pulvinar mauris quis, tincidunt diam. Aliquam id sollicitudin orci.Vestibulum eu laoreet sapien, nec posuere ipsum. Aenean viverra facilisis nulla, id rutrum mauris sodales rhoncus. Phasellus eros ante, fringilla ut arcu in, lobortis elementum velit.",
    });

    for (let i = 0; i < chaptersPerCourse; i++) {
      const chapter = await Chapter.create({
        course: course._id,
        name: `Test Chapter ${i + 1}`,
      });

      for (let j = 0; j < lecturesPerChapter; j++) {
        const lecture = await Lecture.create({
          chapter: chapter._id,
          name: `Test Lecture ${lecturesPerChapter * i + (j + 1)}`,
        });

        await Content.create({
          lecture: lecture._id,
        });
      }
    }

    return NextResponse.json({
      status: "success",
      message: "test course created!",
    });
  },
  { requiresSession: true, restrictTo: ["admin"] }
);
