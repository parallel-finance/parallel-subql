import { Account } from '../../types/models/Account'

export class AccountHandler {
  static async ensureAccount(id: string): Promise<void> {
    const account = await Account.get(id)

    if (!account) {
      return new Account(id).save()
    }
  }

  static async getAccountById(id: string): Promise<Account> {
    await this.ensureAccount(id)

    const account = await Account.get(id)

    return account
  }

  /* eslint-disable @typescript-eslint/no-explicit-any*/
  static async updateAccount(
    id: string,
    data: Record<string, any>
  ): Promise<void> {
    const account = await this.getAccountById(id)

    Object.keys(data).forEach((key, value) => {
      account[key] = value
    })

    await account.save()
  }
}
