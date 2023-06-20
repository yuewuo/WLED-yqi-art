
export function is_stabilizer_exist(d, i, j) {
    if (i == 0) { return j > 0 && j < d && j % 2 == 1 }
    if (i == d) { return j > 0 && j < d && j % 2 == 0 }
    if (j == 0) { return i > 0 && i < d && i % 2 == 0 }
    if (j == d) { return i > 0 && i < d && i % 2 == 1 }
    return true
}

export function is_x(i, j) {
    return (i + j) % 2 == 0
}

export function is_z(i, j) {
    return (i + j) % 2 == 1
}

export function is_x_stabilizer(d, i, j) {
    return is_stabilizer_exist(d, i, j) && is_x(i, j)
}

export function is_z_stabilizer(d, i, j) {
    return is_stabilizer_exist(d, i, j) && is_z(i, j)
}

export function is_qubit_exit(d, i, j) {
    return i >= 0 && i < d && j >= 0 && j < d
}

export const ip_reg = /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/

export class Config {

    constructor(d) {
        this.d = d
        const sensor_matrix = Array.from({length: 2 * (d+1)}, () => Array(4 * (d+1)).fill(" "))
        const set_stabilizer = (i, j, c) => {
            sensor_matrix[2 * i][4 * j + 1] = c
        }
        const set_qubit = (i, j, c) => {
            sensor_matrix[2 * i + 1][4 * j + 3] = c
        }
        for (let i=0; i<=d; ++i) {
            for (let j=0; j<=d; ++j) {
                if (is_stabilizer_exist(d, i, j)) {
                    set_stabilizer(i, j, is_x(i,j) ? "X" : "Z")
                }
                if (is_qubit_exit(d, i, j)) {
                    if (i < d-1) {
                        if (i % 2 == 0) {
                            set_qubit(i, j, j % 2 == 0 ? "↖" : "↘")
                        } else {
                            set_qubit(i, j, j % 2 == 0 ? "↗" : "↙")
                        }
                    } else {
                        if (j == 0) {
                            set_qubit(i, j, "↙")
                        } else {
                            set_qubit(i, j, j % 2 == 0 ? "↗" : "↘")
                        }
                    }
                }
            }
        }
        this.sensor_matrix = sensor_matrix
        const ip_address = Array.from({length: d+1}, () => Array(d+1).fill(null))
        this.ip_address = ip_address
    }

    get_sensor_direction(i, j) {
        return this.sensor_matrix[2 * i + 1][4 * j + 3]
    }

    is_stabilizer_exist(i, j) {
        return is_stabilizer_exist(this.d, i, j)
    }

    print_sensor() {
        const d = this.d
        for (let di=0; di<2*(d+1); di++) {
            console.log(this.sensor_matrix[di].join(""))
        }
    }

    print() {
        const d = this.d
        const pixels = Array.from({length: 5 * (d+1)}, () => Array(2 * (d+1)).fill("     "))
        this.iterate_stabilizer((i, j) => {
            const ip = this.ip_address[i][j].split(".")
            pixels[5 * i][2 * j] = (ip[0]).padStart(5, ' ')
            pixels[5 * i][2 * j + 1] = ("." + ip[1]).padEnd(5, ' ')
            pixels[5 * i + 1][2 * j] = ("." + ip[2]).padStart(5, ' ')
            pixels[5 * i + 1][2 * j + 1] = ("." + ip[3]).padEnd(5, ' ')
            pixels[5 * i + 2][2 * j + 1] = (is_x(i,j) ? "(X)" : "(Z)").padEnd(5, ' ')
        })
        this.iterate_qubit((i, j) => {
            pixels[5 * i + 3][2 * j + 2] = `[${this.get_sensor_direction(i, j)}]  `
        })
        for (let di=0; di<5*(d+1); di++) {
            console.log(pixels[di].join(""))
        }
    }

    iterate_stabilizer(func) {
        const d = this.d
        for (let i=0; i<=d; ++i) {
            for (let j=0; j<=d; ++j) {
                if (this.is_stabilizer_exist(i, j)) {
                    func(i, j)
                }
            }
        }
    }

    iterate_qubit(func) {
        const d = this.d
        for (let i=0; i<d; ++i) {
            for (let j=0; j<d; ++j) {
                func(i, j)
            }
        }
    }

}
