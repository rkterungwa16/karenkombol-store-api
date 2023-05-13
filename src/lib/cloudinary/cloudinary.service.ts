import { Inject, Injectable } from '@nestjs/common';
import { UploadApiResponse, UploadApiOptions, v2 } from 'cloudinary';
import { CloudinaryConstants } from './enums';

@Injectable()
export class CloudinaryService {
  constructor(
    @Inject(CloudinaryConstants.PROVIDER_NAME)
    private readonly cloudinary: typeof v2,
  ) {}
  async upload(
    file: string,
    options: UploadApiOptions,
  ): Promise<UploadApiResponse> {
    return await this.cloudinary.uploader.upload(file, options);
  }

  async getImagesByContextKeyValuePairs(key: string, value: string) {
    return await this.cloudinary.api.resources_by_context(key, value);
  }
}
