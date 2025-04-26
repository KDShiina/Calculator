import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { evaluate, round, pi, e } from 'mathjs';


export default function App() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handlePress = (value) => {
    if (value === 'C') {
      setExpression('');
      setResult('');
    } else if (value === 'DEL') {
      setExpression((prev) => prev.slice(0, -1));
    } else if (value === '=') {
      try {
        let formattedExpr = expression
          .replace(/√/g, 'sqrt')
          .replace(/%/g, '*0.01')
          .replace(/cot/g, '(1/tan') // cần đóng ngoặc sau này
          .replace(/pi/g, `${pi}`)
          .replace(/e/g, `${e}`);
  
        // Đếm số mở cot để đóng đúng
        const cotCount = (expression.match(/cot/g) || []).length;
        for (let i = 0; i < cotCount; i++) {
          formattedExpr += ')';
        }
  
        const evalResult = evaluate(formattedExpr);
        setResult(evalResult.toString());
      } catch (error) {
        setResult('Error');
      }
    } else {
      setExpression((prev) => prev + value);
    }
  };
  

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const buttons = [
    ['C', '(', ')', 'DEL'],
    ['sin', 'cos', 'tan', 'cot'],
    ['log', 'ln', '^', '√'],
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '-'],
    ['0', '.', 'pi', '+'],
    ['e', '%', '=', ''],
  ];
  

  const styles = createStyles(isDarkMode);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#000' : '#fff'}
      />
      <View style={styles.header}>
        <Text style={styles.title}>Máy Tính</Text>
        <TouchableOpacity onPress={toggleTheme}>
          <Ionicons
            name={isDarkMode ? 'sunny' : 'moon'}
            size={24}
            color={isDarkMode ? '#fff' : '#000'}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.display}>
        <Text style={styles.expression}>{expression}</Text>
        <Text style={styles.result}>{result}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        {buttons.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.buttonRow}>
            {row.map((buttonValue) => (
              <TouchableOpacity
                key={buttonValue}
                style={styles.button}
                onPress={() => handlePress(buttonValue)}
              >
                <Text style={styles.buttonText}>{buttonValue}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const createStyles = (isDarkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#000' : '#fff',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
    },
    title: {
      fontSize: 24,
      color: isDarkMode ? '#fff' : '#000',
    },
    display: {
      flex: 1,
      justifyContent: 'flex-end',
      padding: 20,
    },
    expression: {
      fontSize: 32,
      color: isDarkMode ? '#fff' : '#000',
      textAlign: 'right',
    },
    result: {
      fontSize: 24,
      color: isDarkMode ? '#888' : '#555',
      textAlign: 'right',
      marginTop: 10,
    },
    buttonsContainer: {
      padding: 10,
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    button: {
      flex: 1,
      margin: 2,
      paddingVertical: 8,
      paddingHorizontal: 6,
      backgroundColor: isDarkMode ? '#333' : '#ddd',
      borderRadius: 6,
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 60,
      minHeight: 40,
    },    
    buttonText: {
      fontSize: 14,
      color: isDarkMode ? '#fff' : '#000',
      textAlign: 'center',
    },    
  });
