import { Profile } from 'src/models/user/profile.model';
import { ApiServiceResponse } from 'src/utils/api-response';
import { UploadedFiles } from '../../types/files';

export default class ProfileServices {
  public async updateUserProfileService(
    files: UploadedFiles,
    user_id: string,
  ): Promise<ApiServiceResponse<any>> {
    const profile = await Profile.findOne({ user: user_id });

    return { status: 200, data: profile };
  }

  public async getUserProfileService(
    user_id: string,
  ): Promise<ApiServiceResponse<any>> {
    const profile = await Profile.findOne({ user: user_id });

    return { status: 200, data: profile };
  }
}
