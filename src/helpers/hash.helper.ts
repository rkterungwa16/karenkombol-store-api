import * as bcrypt from 'bcryptjs';

export class HashHelper {
  private static salt = 10;

  public static async encrypt(str: string): Promise<string> {
    return await bcrypt.hash(str, this.salt);
  }

  public static async compare(
    plain: string,
    encrypted: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plain, encrypted);
  }
}
