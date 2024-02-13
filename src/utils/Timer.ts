import type { Ref } from 'vue'
import type { Data } from './Types'
import Swal from 'sweetalert2'

class Timer {
  randomId: number
  isStart: boolean
  dataLength: number

  constructor(public duration: number, public data: Data[], public state: Ref) {
    this.dataLength = data.length
    this.duration = duration
    this.randomId = 0
    this.isStart = false
    this.state = state
  }

  toggleRandomPick() {
    if (!this.isStart) {
      try {
        if (this.dataLength < 2) {
          throw new Error('LESS THAN 2')
        }
        this.randomPick()
        const promiseRandomPick = new Promise<Data>((resolve, reject) => {
          setTimeout(() => {
            this.stopRandomPick()
            resolve(this.state.value)
          }, 5000)
        })

        return promiseRandomPick
      } catch (error) {
        Swal.fire({
          icon: 'warning',
          title: 'Data Kurang Dari 2',
          text: 'Mending tidak perlu diacak!'
        })
      }
    }
  }

  stopRandomPick(): void {
    this.isStart = false
    clearInterval(this.randomId)
  }

  randomPick(): void {
    this.isStart = true
    this.randomId = setInterval(() => {
      this.state.value = this.data[this.randomizeNumber(this.data.length)]
    }, 50)
  }

  private randomizeNumber(max: number): number {
    return Math.floor(Math.random() * max)
  }
}
export { Timer }
