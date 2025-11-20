
// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
// import { useTranslation } from 'react-i18next';

// export default function IncomeTaxCalculator() {
//   const { t } = useTranslation();
//   const [income, setIncome] = useState('');
//   const [taxRate, setTaxRate] = useState('');
//   const [taxAmount, setTaxAmount] = useState(null);
//   const [netIncome, setNetIncome] = useState(null);

//   const calculateTax = () => {
//     const incomeNum = parseFloat(income);
//     const taxRateNum = parseFloat(taxRate);

//     if (isNaN(incomeNum) || isNaN(taxRateNum)) {
//       alert(t('calculators.invalid_input_message'));
//       return;
//     }

//     const tax = (incomeNum * taxRateNum) / 100;
//     setTaxAmount(tax.toFixed(2));
//     setNetIncome((incomeNum - tax).toFixed(2));
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.label}>{t('calculators.income_tax.income')}</Text>
//       <TextInput
//         style={styles.input}
//         keyboardType="numeric"
//         value={income}
//         onChangeText={setIncome}
//         placeholder={t('calculators.income_tax.income')}
//       />
//       <Text style={styles.label}>{t('calculators.income_tax.tax_rate')}</Text>
//       <TextInput
//         style={styles.input}
//         keyboardType="numeric"
//         value={taxRate}
//         onChangeText={setTaxRate}
//         placeholder={t('calculators.income_tax.tax_rate')}
//       />
//       <Button title={t('calculators.calculate')} onPress={calculateTax} />
//       {taxAmount !== null && (
//         <View style={styles.results}>
//           <Text>{t('calculators.income_tax.tax_amount')}: {taxAmount}</Text>
//           <Text>{t('calculators.income_tax.net_income')}: {netIncome}</Text>
//         </View>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 10,
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 20,
//     paddingHorizontal: 10,
//   },
//   results: {
//     marginTop: 20,
//   },
// });
