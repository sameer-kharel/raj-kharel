
// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { router } from 'expo-router';
// import { useTranslation } from 'react-i18next';
// import { db } from '../../data/index';

// export default function AutoLoanCalculatorScreen() {
//   const { t } = useTranslation();
//   const [vehicleCost, setVehicleCost] = useState('');
//   const [downPayment, setDownPayment] = useState('');
//   const [tradeInValue, setTradeInValue] = useState('');
//   const [interestRate, setInterestRate] = useState('');
//   const [loanTerm, setLoanTerm] = useState('');
//   const [monthlyPayment, setMonthlyPayment] = useState(null);
//   const currency = db.user.currency;

//   const calculateAutoLoan = () => {
//     const P = parseFloat(vehicleCost) - parseFloat(downPayment) - parseFloat(tradeInValue);
//     const r = parseFloat(interestRate) / 100 / 12;
//     const n = parseFloat(loanTerm) * 12;

//     if (isNaN(P) || isNaN(r) || isNaN(n) || P <= 0 || r < 0 || n <= 0) {
//       Alert.alert(t('calculators.loan_payment.invalid_input'), t('calculators.loan_payment.invalid_input_message'));
//       return;
//     }

//     const M = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

//     if (isNaN(M) || M === Infinity || M < 0) {
//         setMonthlyPayment(t('calculators.loan_payment.invalid_result'));
//     } else {
//         setMonthlyPayment(`${currency.symbol}${M.toFixed(2)}`);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
//         <ScrollView contentContainerStyle={styles.container}>
//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>{t('calculators.auto_loan.vehicle_cost')} ({currency.symbol})</Text>
//             <TextInput style={styles.input} placeholder="e.g., 30000" keyboardType="numeric" value={vehicleCost} onChangeText={setVehicleCost} />
//           </View>

//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>{t('calculators.auto_loan.down_payment')} ({currency.symbol})</Text>
//             <TextInput style={styles.input} placeholder="e.g., 5000" keyboardType="numeric" value={downPayment} onChangeText={setDownPayment} />
//           </View>

//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>{t('calculators.auto_loan.trade_in_value')} ({currency.symbol})</Text>
//             <TextInput style={styles.input} placeholder="e.g., 2000" keyboardType="numeric" value={tradeInValue} onChangeText={setTradeInValue} />
//           </View>

//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>{t('calculators.loan_payment.interest_rate')}</Text>
//             <TextInput style={styles.input} placeholder="e.g., 3.5" keyboardType="numeric" value={interestRate} onChangeText={setInterestRate} />
//           </View>

//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>{t('calculators.loan_payment.loan_term')}</Text>
//             <TextInput style={styles.input} placeholder="e.g., 5" keyboardType="numeric" value={loanTerm} onChangeText={setLoanTerm} />
//           </View>

//           <TouchableOpacity style={styles.calculateButton} onPress={calculateAutoLoan}>
//             <Text style={styles.calculateButtonText}>{t('calculators.loan_payment.calculate')}</Text>
//           </TouchableOpacity>

//           {monthlyPayment && (
//             <View style={styles.resultContainer}>
//               <Text style={styles.resultLabel}>{t('calculators.loan_payment.monthly_payment')}</Text>
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
//   calculateButton: { backgroundColor: '#007bff', padding: 18, borderRadius: 10, alignItems: 'center', marginTop: 10 },
//   calculateButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
//   resultContainer: { marginTop: 30, padding: 20, backgroundColor: '#f0f8ff', borderRadius: 10, alignItems: 'center', borderWidth: 1, borderColor: '#d1eaff' },
//   resultLabel: { fontSize: 18, color: '#333', marginBottom: 10 },
//   resultValue: { fontSize: 26, fontWeight: 'bold', color: '#007bff' },
// });
