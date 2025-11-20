
// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { router } from 'expo-router';
// import { db } from '../../data/index';

// export default function LoanPaymentCalculatorScreen() {
//   const [loanAmount, setLoanAmount] = useState('');
//   const [interestRate, setInterestRate] = useState('');
//   const [loanTerm, setLoanTerm] = useState('');
//   const [monthlyPayment, setMonthlyPayment] = useState(null);
//   const currency = db.user.currency;

//   const calculateLoan = () => {
//     const P = parseFloat(loanAmount);
//     const r = parseFloat(interestRate) / 100 / 12;
//     const n = parseFloat(loanTerm) * 12;

//     if (isNaN(P) || isNaN(r) || isNaN(n) || P <= 0 || r < 0 || n <= 0) {
//       Alert.alert('Invalid Input', 'Please enter valid numbers for all fields.');
//       return;
//     }

//     const M = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

//     if (isNaN(M) || M === Infinity || M < 0) {
//         setMonthlyPayment("Invalid result, check your inputs");
//     } else {
//         setMonthlyPayment(`${currency.symbol}${M.toFixed(2)}`);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
//         <ScrollView contentContainerStyle={styles.container}>
//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>Loan Amount ({currency.symbol})</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="e.g., 25000"
//               placeholderTextColor="#aaa"
//               keyboardType="numeric"
//               value={loanAmount}
//               onChangeText={setLoanAmount}
//             />
//           </View>

//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>Annual Interest Rate (%)</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="e.g., 5.5"
//               placeholderTextColor="#aaa"
//               keyboardType="numeric"
//               value={interestRate}
//               onChangeText={setInterestRate}
//             />
//           </View>

//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>Loan Term (Years)</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="e.g., 5"
//               placeholderTextColor="#aaa"
//               keyboardType="numeric"
//               value={loanTerm}
//               onChangeText={setLoanTerm}
//             />
//           </View>

//           <TouchableOpacity style={styles.calculateButton} onPress={calculateLoan}>
//             <Text style={styles.calculateButtonText}>Calculate</Text>
//           </TouchableOpacity>

//           {monthlyPayment && (
//             <View style={styles.resultContainer}>
//               <Text style={styles.resultLabel}>Monthly Payment:</Text>
//               <Text style={styles.resultValue}>{monthlyPayment}</Text>
//             </View>
//           )}
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea: { flex: 1, backgroundColor: '#fff' },
//   container: { flexGrow: 1, padding: 20 },
//   title: { fontSize: 22, fontWeight: 'bold', color: '#333' },
//   inputContainer: { marginBottom: 20 },
//   label: { fontSize: 16, color: '#666', marginBottom: 8 },
//   input: { backgroundColor: '#f0f0f0', borderRadius: 10, padding: 15, fontSize: 16, color: '#333' },
//   calculateButton: { backgroundColor: '#28a745', padding: 18, borderRadius: 10, alignItems: 'center', marginTop: 10 },
//   calculateButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
//   resultContainer: { marginTop: 30, padding: 20, backgroundColor: '#f0f8ff', borderRadius: 10, alignItems: 'center', borderWidth: 1, borderColor: '#d1eaff' },
//   resultLabel: { fontSize: 18, color: '#333', marginBottom: 10 },
//   resultValue: { fontSize: 26, fontWeight: 'bold', color: '#28a745' },
// });
