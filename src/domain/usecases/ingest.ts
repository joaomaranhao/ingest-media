export class IngestUsecase {
  constructor (private fsHandler: any) {}
  exec (ingestData: any) {
    this.fsHandler.exists(ingestData.mediaDriver.path)
  }
}
