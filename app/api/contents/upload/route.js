import { routeHandler } from "@/utils/authentication";
import { NextResponse } from "next/server";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import AppError from "@/utils/AppError";
import Lecture from "@/models/lectureModel";
import { connectDB } from "@/utils/database";
import Content from "@/models/contentModel";
import Chapter from "@/models/chapterModel";
import Course from "@/models/courseModel";

const s3 = new S3Client({
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

// Validates that "nothing bad" happened on the way to S3
// NOTE: Keeps giving me errors atm
async function computeSHA256(file) {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}

async function getSignedURL({ file, key, metadata, checkSum }) {
  const putObjctCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key, // Create unique file-name
    ContentType: file.type,
    ContentLength: file.size,
    ChecksumSHA256: checkSum,
    Metadata: metadata,
  });

  const signedURL = await getSignedUrl(s3, putObjctCommand, { expiresIn: 60 }); // 60s expiry
  return signedURL;
}

const acceptedFileTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "video/mp4",
  "video/webm",
  "application/json",
];
const maxFileSize = 1024 * 1024 * 2; // 2Mb

export const POST = routeHandler(
  async function (req) {
    await connectDB();

    const formData = await req.formData();
    const lectureId = formData.get("lecture");

    // Get contents from body
    let contents = formData.get("contents");
    contents = JSON.parse(contents);

    // Find lecture
    const lecture = await Lecture.findById(lectureId).select({ slug: 1 });

    // Check if lecture already has content
    const existingContent = await Content.findOne({ lecture: lecture._id });
    if (existingContent)
      return new AppError(
        "Lecture already has content, please delete it before creating another one"
      );

    // Format contents and upload any files to AWS-S3
    let imageCount = 0,
      videoCount = 0;
    for (let i = 0; i < contents.length; i++) {
      const content = contents[i];
      if (content.type === "image") imageCount += 1;
      if (content.type === "video") videoCount += 1;

      // If content is not a file format, don't touch it
      if (!["image", "video"].includes(content.type)) continue;

      const file = formData.get(content.file);

      // Check if file type is acceptable
      if (!acceptedFileTypes.includes(file.type)) {
        return new AppError(`File type (${file.type}) is not accepted!`, 400);
      }

      // Check if file size is acceptable
      if (file.size > maxFileSize) {
        return new AppError("File size is too large!", 400);
      }

      // Create signed URL for file
      const fileFormat = file.type.split("/")[1];
      const fileCount = content.type === "image" ? imageCount : videoCount;
      const fileName = `${content.type}-${lecture.slug}-${fileCount}`; // prettier-ignore
      const signedURL = await getSignedURL({
        file,
        key: `lectures/${content.type}s/${fileName}.${fileFormat}`,
      });
      const fileURL = signedURL.split("?")[0];

      // Upload file to AWS-S3
      await fetch(signedURL, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });

      // Format content object
      content.url = fileURL;
      delete content.file;
    }

    // Create signedURL for content
    const signedURL = await getSignedURL({
      file: { type: "application/json" },
      key: `lectures/contents/content-${lecture.slug}.json`,
    });
    const contentURL = signedURL.split("?")[0];

    // Upload content to AWS-S3
    await fetch(signedURL, {
      method: "PUT",
      body: JSON.stringify(contents),
      headers: { "Content-Type": "application/json" },
    });

    // TODO: If content exists, replace it in AWS, and update url in content doc
    // Create content document
    const content = await Content.create({
      lecture: lectureId,
      url: contentURL,
    });

    // Send response
    return NextResponse.json({
      status: "sucess",
      data: {
        content,
      },
    });
  },
  {
    requiresSession: true,
    restrictTo: ["admin"],
    parseBody: false,
  }
);
