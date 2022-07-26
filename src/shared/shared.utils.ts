import * as bcrypt from 'bcrypt';

export class SharedUtils {
  private static readonly SALT_OR_ROUNDS = 10;
  static async hashValue(toHash: string): Promise<string> {
    return bcrypt.hash(toHash, SharedUtils.SALT_OR_ROUNDS);
  }
}
