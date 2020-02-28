import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import Constants from 'expo-constants'

export default function App() {
  const col1Buttons = [
    ['7', '8', '9'],
    ['4', '5', '6'],
    ['1', '2', '3'],
    ['.', '0', '='],
  ]

  const col2Buttons = [
    'C', '÷', '+', '-', 'x'
  ]

  const [display, setDisplay] = useState(0)
  const [result, setResult] = useState(0)

  const handleOperation = (op) => {
    if (op === 'C') {
      setDisplay('')
      setResult('')
    }
    else if (op === '=') {
      setDisplay(result)
      setResult('')
    }
    else {
      const calc = display + op
      let resultCalc = result

      try {
        let fixedOp = calc.split('x').join('*')
        fixedOp = fixedOp.split('÷').join('/')
        resultCalc = new String(eval(fixedOp)).toString()
      }
      catch(e) {}

      setDisplay(calc)
      setResult(resultCalc)
    }

  }
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.textDisplay}>{display}</Text>
      <Text style={styles.textResult}>{result}</Text>

      <View style={styles.buttons}>
        <View style={styles.col1}>
          {col1Buttons.map((line, ind) => (
            <View key={ind} style={styles.line}>
              {line.map(op => (
                <TouchableOpacity
                  key={op}
                  style={styles.btnCol1}
                  onPress={() => handleOperation(op)}
                >
                  <Text style={styles.btnText}>{op}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>

        <View style={styles.col2}>
          {col2Buttons.map(op => (
            <View key={op} style={styles.line}>
              <TouchableOpacity
                style={styles.btnCol2}
                onPress={() => handleOperation(op)}
              >
                <Text style={styles.btnText}>
                  {op}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C0C0C0',
    alignItems: 'stretch',
    justifyContent: 'center',
    marginTop: Constants.statusBarHeight,
  },
  textDisplay: {
    flex: 1,
    fontSize: 40,
    fontFamily: 'monospace',
    color: '#FF8C00',
    textAlign: 'right',
    paddingRight: 20,
    paddingTop: 20,
  },
  textResult: {
    flex: 0.4,
    fontSize: 20,
    fontFamily: 'monospace',
    color: '#0d0d0d',
    textAlign: 'right',
    paddingRight: 30,
    paddingBottom: 10,
  },
  buttons: {
    flex: 5,
    flexDirection: 'row',
  },
  line:{
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  btnCol1: {
    flex: 1,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 10,
    padding: 10,
    marginHorizontal: 5,
  },
  btnCol2: {
    flex: 1,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF8C00',
    borderRadius: 15,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  btnText: {
    color: '#0D0D0D',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 25
  },
  col1: {
    flex: 3,
  },
  col2: {
    flex: 1,
    justifyContent: 'center',
  }
});
