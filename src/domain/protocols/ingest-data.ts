export interface DateData {
  day: string
  month: string
  monthName: string
  year: string
}

export interface DeviceData {
  name: string
  path: string
}

export interface IngestData {
  agenda: string
  workstation: DeviceData
  dateData: DateData
  backup: boolean
  backupDevice: DeviceData
  mediaDriver: DeviceData
}
