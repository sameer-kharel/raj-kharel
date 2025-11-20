
// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
// import { useTranslation } from 'react-i18next';

// export default function SalesTaxCalculator() {
//   const { t } = useTranslation();
//   const [amount, setAmount] = useState('');
//   const [taxRate, setTaxRate] = useState('');
//   const [taxAmount, setTaxAmount] = useState(null);
//   const [totalAmount, setTotalAmount] = useState(null);

//   const calculateTax = () => {
//     const amountNum = parseFloat(amount);
//     const taxRateNum = parseFloat(taxRate);

//     if (isNaN(amountNum) || isNaN(taxRateNum)) {
//       alert(t('calculators.invalid_input_message'));
//       return;
//     }

//     const tax = (amountNum * taxRateNum) / 100;
//     setTaxAmount(tax.toFixed(2));
//     setTotalAmount((amountNum + tax).toFixed(2));
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.label}>{t('calculators.sales_tax.amount')}</Text>
//       <TextInput
//         style={styles.input}
//         keyboardType="numeric"
//         value={amount}
//         onChangeText={setAmount}
//         placeholder={t('calculators.sales_tax.amount')}
//       />
//       <Text style={styles.label}>{t('calculators.sales_tax.tax_rate')}</Text>
//       <TextInput
//         style={styles.input}
//         keyboardType="numeric"
//         value={taxRate}
//         onChangeText={setTaxRate}
//         placeholder={t('calculators.sales_tax.tax_rate')}
//       />
//       <Button title={t('calculators.calculate')} onPress={calculateTax} />
//       {taxAmount !== null && (
//         <View style={styles.results}>
//           <Text>{t('calculators.sales_tax.tax_amount')}: {taxAmount}</Text>
//           <Text>{t('calculators.sales_tax.total_amount')}: {totalAmount}</Text>
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
