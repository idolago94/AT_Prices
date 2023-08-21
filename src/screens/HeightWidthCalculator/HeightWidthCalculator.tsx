import React, { useMemo, useRef } from "react"
import { StyleSheet, TextInput } from "react-native"
import { Button, Colors, Text, TextField, View } from "react-native-ui-lib"
import { heightWidthCalculator } from '@content/strings.json'
import Clipboard from '@react-native-clipboard/clipboard';

import heights from '@content/heights.json'
import widths from '@content/widths.json'
import prices from '@content/prices.json'
import { toILS } from "@utils/currency";

export const HeightWidthCalculator = () => {
    const widthRef = useRef<TextInput>(null)
    const [height, setHeight] = React.useState<string>('')
    const [width, setWidth] = React.useState<string>('')
    const [result, setResult] = React.useState<string | number>('')

    const showResult = useMemo(() => height && width && result != '', [height, width, result])

    const calculateResult = async () => {
        if (height && width) {
            const price = getPrice()
            if (typeof price === "string") setResult(price)
            else setResult(await toILS(+price))
        }
    }

    const getPrice = (): string | number => {
        const widthRange = widths[+width]
        if (widthRange && prices[widthRange]) {
            const heightRange = heights[+height]
            if (!prices[widthRange][heightRange]) return "Height is not valid"
            return +handleDicount(prices[widthRange][heightRange].split(" ")[0])
        }
        return "Width is not valid"
    }

    const handleDicount = (price: number) => {
        prices.discounts.map((discount) => {
            price -= (discount / 100) * price
        })
        return price
    }

    return (
        <View flex margin-10>
            <View paddingV-20>
                <Text center text50BO>Height x Width Calculator</Text>
            </View>

            <View flex>
                <View>
                    <Text marginL-3 marginB-3>{height ? heightWidthCalculator.height : ''}</Text>
                    <TextField
                        style={s.input}
                        placeholder={heightWidthCalculator.height}
                        value={height}
                        onChangeText={setHeight}
                        onEndEditing={calculateResult}
                        onSubmitEditing={() => widthRef.current?.focus()}
                        enableErrors
                        validate={['required', 'number']}
                        validationMessage={['Field is required', 'Number is invalid']}
                        inputMode="numeric"
                    />
                </View>

                <View>
                    <Text marginL-3 marginB-3>{width ? heightWidthCalculator.width : ''}</Text>
                    <TextField
                        ref={widthRef}
                        style={s.input}
                        placeholder={heightWidthCalculator.width}
                        value={width}
                        onChangeText={setWidth}
                        onEndEditing={calculateResult}
                        enableErrors
                        validate={['required', 'number']}
                        validationMessage={['Field is required', 'Number is invalid']}
                        inputMode="numeric"
                    />
                </View>
            </View>
            <View row style={[s.resultContainer, !result && s.emptyResultContainer]}>
                <View flexG>
                    <View row>
                        {showResult && <View style={s.resultLabel}>
                            <Text>{height} x {width}</Text>
                        </View>}
                    </View>
                    <Text marginL-10 style={!result && s.emptyResult}>{showResult ? (result || '...') : heightWidthCalculator.resultPlaceholder}</Text>
                </View>
                <Button label={heightWidthCalculator.copy} size='small' onPress={() => result && Clipboard.setString(result.toString())} />
            </View>
        </View>
    )
}

const s = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 5,
        padding: 5,
    },
    resultContainer: {
        borderWidth: 1,
        borderColor: "blue",
        borderRadius: 5,
        padding: 5,
        alignItems: 'center',
        marginTop: 12

    },
    emptyResultContainer: {
        borderColor: "gray",
    },
    emptyResult: {
        color: "gray"
    },
    resultLabel: {
        marginTop: -21,
        paddingHorizontal: 3,
    }
})