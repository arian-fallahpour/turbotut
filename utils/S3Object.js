import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import crypto from "crypto";
import AppError from "./AppError";
import { KeyboardReturn } from "@mui/icons-material";

const s3 = new S3Client({
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

class S3Object {
  constructor(buffer, type, size) {
    this.buffer = buffer;
    this.type = type;
    this.size = size;
  }

  getUniqueFilename(name) {
    const prefix = process.env.NODE_ENV === "development" ? "dev" : "prod";
    const randomBytes = crypto.randomBytes(32).toString("hex");
    return `${prefix}-${name}-${randomBytes}`;
  }

  async computeSHA256() {
    const buffer = this.buffer;
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  }

  async getSignedURL({ key, metadata }) {
    const checksum = await this.computeSHA256();

    const putObjectCommand = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key, // Create unique file-name
      ContentType: this.type,
      ContentLength: this.size,
      ChecksumSHA256: checksum,
      Metadata: metadata,
    });

    return await getSignedUrl(s3, putObjectCommand, {
      expiresIn: 60, // 60s expiry
    });
  }

  getAccessURL(signedURL) {
    return signedURL.split("?")[0];
  }

  getFileExtension() {
    return this.type.split("/")[1];
  }

  async upload(signedURL) {
    const res = await fetch(signedURL, {
      method: "PUT",
      body: this.buffer,
      headers: { "Content-Type": this.type },
    });

    let appError;
    if (!res.ok) {
      appError = new AppError("File could not be uploaded to storage", 400);
    }

    return appError;
  }

  static async deleteS3Object(key) {
    const deleteObjectCommand = new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
    });

    await s3.send(deleteObjectCommand);
  }
}

export default S3Object;
