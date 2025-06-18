export class Transaction {
    constructor(public commit: () => Promise<void>, public rollback: () => Promise<void>) {}
  }