import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { EnvConfig } from './get-env';

/* eslint-disable no-undef */
cloudinary.config({
  cloud_name: EnvConfig.cloudinaryCloudName,
  api_key: EnvConfig.cloudinaryApiKey,
  api_secret: EnvConfig.cloudinaryApiSecret,
  secure: true,
});

export const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  // eslint-disable-next-line no-unused-vars
  params: async (_req, _file) => {
    return {
      folder: EnvConfig.cloudinaryFolderName,
    };
  },
});

export default class Cloudinary {
  public static async deleteFromCloudinary(fileName: string) {
    try {
      const result = await new Promise((resolve, reject) => {
        return cloudinary.api.delete_resources_by_prefix(
          fileName,
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        );
      });

      return result;
    } catch (err) {
      return err;
    }
  }
}
