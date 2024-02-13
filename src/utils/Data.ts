import { type Data } from './Types'
class DataSource {
  constructor(private key: string) {
    this.key = key

    this._initLocalStorage()
  }

  getData(): Data[] {
    const data: string | null = localStorage.getItem(this.key)
    if (data === null) {
      return []
    }
    return JSON.parse(data)
  }

  getNonSelected(): Data[] {
    const data: Data[] = JSON.parse(localStorage.getItem(this.key) || '[]')
    if (data === null) {
      return []
    }
    const filteredData = data.filter((filtered) => {
      if (!filtered.selected) {
        return filtered
      }
    })

    return filteredData
  }

  setData(payload: Data): void {
    const currentData: string | null = localStorage.getItem(this.key) || '[]'

    const dataArr = JSON.parse(currentData)
    dataArr?.push(payload)

    localStorage.setItem(this.key, JSON.stringify(dataArr))
  }

  private _initLocalStorage(): void {
    const isExist: string | null = localStorage.getItem(this.key)
    if (!isExist) {
      localStorage.setItem(this.key, JSON.stringify([]))
    }
  }

  removeData(id: string) {
    const currentData: string | null = localStorage.getItem(this.key) || '[]'

    const dataArr: Data[] = JSON.parse(currentData)

    const filteredData = dataArr.filter((data: Data) => {
      if (data.id !== id) {
        return data
      }
    })

    localStorage.setItem(this.key, JSON.stringify(filteredData))
  }

  setSelected(id: string): void {
    const currentData: string | null = localStorage.getItem(this.key) || '[]'

    const dataArr: Data[] = JSON.parse(currentData)

    const mappedData = dataArr.map((data: Data) => {
      if (id === data.id) {
        data.selected = true

        return data
      }
      return data
    })

    localStorage.setItem(this.key, JSON.stringify(mappedData))
  }

  resetSelected(): void {
    const currentData: string | null = localStorage.getItem(this.key) || '[]'

    const dataArr: Data[] = JSON.parse(currentData)

    const mappedData = dataArr.map((data: Data) => {
      data.selected = false
      return data
    })

    localStorage.setItem(this.key, JSON.stringify(mappedData))
  }
}

export { DataSource }
