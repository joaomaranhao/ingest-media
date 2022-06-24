import { FsHandler } from "../protocols/fs-handler";
import { IngestData } from "../protocols/ingest-data";

export class IngestUsecase {
  constructor (private fsHandler: FsHandler) {}
  exec (ingestData: IngestData) {
    const mediaExists = this.fsHandler.exists(ingestData.mediaDriver.path)
    if (!mediaExists) return new Error('Mídia não encontrada.')
  }
}
