import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Platform} from 'react-native';

export default function App() {

    const [currentValue, setCurrentValue] = useState('');
    const [expression, setExpression] = useState('');
    const [op, setOp] = useState(null)

    function handleClick(value: any) {
        if (value == 'C') {
            if (currentValue == '') {
                setExpression(''); setOp(null)
            }
            setCurrentValue('');

        } else {
            if (value === '.') {
                handleDot(value)
            }
            if (typeof value === 'number') {
                handleDigit(value)
            }
            else {
                handleOperation(value)
            }
        }
    }

    function handleOperation(value: any) {
        if (value == '=') {
            setCurrentValue(eval(expression))
            setExpression('')
        }
        if (op == null) {
            if (expression == '') {
                setExpression(expression + currentValue)
            } else {
                setCurrentValue(eval(expression));
                setExpression(expression)
            }
        } else {
            setCurrentValue(eval(expression));
        }
        setOp(value)
    }


    function handleDot(value: any) {
        if (expression != '.' && currentValue != '' && currentValue != '.') { setCurrentValue((currentValue + '.'))}

    }

    function handleDigit(value: number) {
        if (op != null) {
            setExpression(expression+op+value);
            setCurrentValue(value.toString());
        } else {
            setCurrentValue((currentValue === '0' && value === 0) ? '0' : currentValue + value);
            setExpression(expression+value);
        }
        setOp(null);
    }


    let nums = [[1, 2, 3], [4, 5, 6], [7, 8, 9], ['.', 0, '=']]
    let rows = []
    for (let i = 0; i < 4; i++) {
        let row = []
        for (let j = 0; j < 3; j++) {
            row.push(<TouchableOpacity onPress={() => {
                handleClick(nums[i][j])
            }} style={styles.btn}>
                <Text style={styles.btnText}>{nums[i][j]}</Text>
            </TouchableOpacity>)
        }
        rows.push(<View style={styles.row}>{row}</View>)
    }


    let operations = ['C', '+', '-', '*', '/']
    let ops = []
    for (let i = 0; i < 5; i++) {
        ops.push(<TouchableOpacity onPress={() => {
            handleClick(operations[i])
        }} style={styles.btn}>
            <Text style={styles.btnText}>
                {operations[i]}
            </Text>
        </TouchableOpacity>)
    }


    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
            <View style={styles.container}>
                <View style={styles.result}>
                    <Text style={styles.resultText}>{currentValue}</Text>
                </View>
                <View style={styles.calculation}>
                    <Text style={styles.calculationText}>{expression}{op}</Text>
                </View>
                <View style={styles.buttons}>
                    <View style={styles.numbers}>
                        {rows}
                    </View>
                    <View style={styles.operations}>
                        {ops}
                    </View>
                </View>
            </View>
        </SafeAreaView>


    );
}

const styles = StyleSheet.create({
    container: {
        ...Platform.select({
            ios: {
                flex: 1,
            },
            web: {
                margin: 100,
                height: 350,
                width: 250,
            },
            android: {
                flex: 1,
            }
        }),
    },
    result: {
        flex: 2,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    resultText: {
        fontSize: 34,
        color: 'white',
    },
    calculation: {
        flex: 1,
        backgroundColor: '#696969',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    calculationText: {
        fontSize: 24,
        color: 'white',
    },
    row: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    buttons: {
        flex: 6,
        flexDirection: 'row',
    },
    numbers: {
        flex: 3,
        backgroundColor: '#708090',
    },
    operations: {
        flex: 1,
        backgroundColor: '#4682B4',
    },
    btn: {
        flex: 1,
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'center',
    },
    btnText: {
        fontSize: 30,
    }


});
