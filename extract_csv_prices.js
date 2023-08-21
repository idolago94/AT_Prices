const fs = require("fs");
const { parse } = require("csv-parse");

let index = 0
let heights_ranges = []
const widths_ranges = []
const prices_matrix = []

// heights [] 0-1200 (index=height, value="x-y")
// widths [] 150-800 (index=width, value="z-w")
// prices {} { "x-y": { "z-w": number } }  ({ width_range: { height_range: number } })

function generateJsonPrices(heights_ranges, width_ranges, prices_matrix) {
    const prices = {}
    const heights = []
    const widths = []

    heights_ranges.map(hr => {
        const ranges = hr.split("-")
        for (let h = +ranges[0]; h <= +ranges[1]; h++) {
            heights[h] = hr
        }
    })
    width_ranges.map(wr => {
        const ranges = wr.split("-")
        for (let w = +ranges[0]; w <= +ranges[1]; w++) {
            widths[w] = wr
        }
    })

    for (let r = 0; r < prices_matrix.length; r++) {
        for (let c = 0; c < prices_matrix[r].length; c++) {
            prices[width_ranges[r]] = {
                ...prices[width_ranges[r]],
                [heights_ranges[c]]: prices_matrix[r][c]
            }
        }
    }

    // console.log("heights", heights)
    // console.log("widths", widths)
    // console.log("prices", prices)

    return {
        heights,
        widths,
        prices
    }
}

function getPriceByHeightWidth(sizes, config) {
    const { width, height } = sizes
    const {
        heights,
        widths,
        prices
    } = config
    if (!prices[widths[width]]) return "Width is not valid!"
    if (!prices[widths[width]][heights[height]]) return "Height is not valid!"
    return prices[widths[width]][heights[height]]
}

fs.createReadStream("./data.csv")
    .pipe(parse({ delimiter: ",", from_line: 1 }))
    .on("data", function (row) {
        index++
        if (index == 1) {
            row.shift()
            heights_ranges = row
        } else {
            widths_ranges.push(row[0])
            row.shift()
            prices_matrix.push(row)
        }
    })
    .on("error", function (error) {
        console.log(error.message);
    })
    .on("end", function () {
        const config = generateJsonPrices(heights_ranges, widths_ranges, prices_matrix)
        const { heights, widths, prices } = config
        // console.log("423 x 100 =", getPriceByHeightWidth({ width: 423, height: 100 }, config));
        fs.writeFile("src/constants/heights.json", JSON.stringify(heights), () => console.log("heights.json created!"));
        fs.writeFile("src/constants/widths.json", JSON.stringify(widths), () => console.log("widths.json created!"));
        fs.writeFile("src/constants/prices.json", JSON.stringify(prices), () => console.log("prices.json created!"));
    });
