import cloudinary, {
  configureCloudinary,
} from "../config/cloudinary.js";

const UPLOAD_FOLDER =
  process.env.CLOUDINARY_UPLOAD_FOLDER ||
  "planpilot-analyses";

const assertCloudinaryConfig = () => {
  const missingConfig = [
    "CLOUDINARY_CLOUD_NAME",
    "CLOUDINARY_API_KEY",
    "CLOUDINARY_API_SECRET",
  ].filter((key) => !process.env[key]);

  if (missingConfig.length > 0) {
    throw new Error(
      `Missing Cloudinary environment variables: ${missingConfig.join(
        ", "
      )}`
    );
  }

  configureCloudinary();
};

export const uploadImageToCloudinary = (
  file
) => {
  assertCloudinaryConfig();

  return new Promise((resolve, reject) => {
    const uploadStream =
      cloudinary.uploader.upload_stream(
        {
          folder: UPLOAD_FOLDER,
          resource_type: "image",
          use_filename: true,
          unique_filename: true,
        },
        (error, result) => {
          if (error) {
            reject(error);
            return;
          }

          resolve({
            imageUrl: result.secure_url,
            cloudinaryPublicId:
              result.public_id,
          });
        }
      );

    uploadStream.end(file.buffer);
  });
};

export const deleteCloudinaryImage =
  async (publicId) => {
    if (!publicId) {
      return;
    }

    assertCloudinaryConfig();

    await cloudinary.uploader.destroy(
      publicId,
      {
        resource_type: "image",
      }
    );
  };
