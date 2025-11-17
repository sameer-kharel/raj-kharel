
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';

const APRCalculator = () => {
  const { t } = useTranslation();
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [fees, setFees] = useState('');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const P = parseFloat(loanAmount);
    const r = parseFloat(interestRate) / 100;
    const N = parseFloat(loanTerm);
    const F = parseFloat(fees) || 0;

    if (!P || !r || !N) {
      Alert.alert(t('calculators.invalid_input'), t('calculators.invalid_input_message'));
      return;
    }

    const totalAmountPaid = (P * r * N) + P + F;
    const totalInterest = totalAmountPaid - P - F;
    const apr = ((totalInterest / (P - F)) / (N * 365)) * 365 * 100; // Simplified APR calculation

    setResult({
      apr,
      totalInterest,
      totalAmountPaid,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{t('calculators.apr_calculator.title')}</Text>

      <TextInput
        style={styles.input}
        placeholder={t('calculators.loan_payment.loan_amount')}
        keyboardType="numeric"
        value={loanAmount}
        onChangeText={setLoanAmount}
      />
      <TextInput
        style={styles.input}
        placeholder={t('calculators.loan_payment.interest_rate')}
        keyboardType="numeric"
        value={interestRate}
        onChangeText={setInterestRate}
      />
      <TextInput
        style={styles.input}
        placeholder={t('calculators.loan_payment.loan_term')}
        keyboardType="numeric"
        value={loanTerm}
        onChangeText={setLoanTerm}
      />
      <TextInput
        style={styles.input}
        placeholder={t('calculators.apr_calculator.fees')}
        keyboardType="numeric"
        value={fees}
        onChangeText={setFees}
      />
      
      <Button title={t('calculators.loan_payment.calculate')} onPress={calculate} />

      {result && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>{t('calculators.apr_calculator.apr_summary')}</Text>
          <Text style={styles.aprText}>{t('calculators.apr_calculator.apr')}: {result.apr.toFixed(2)}%</Text>
          <Text>{t('calculators.credit_card_payoff.total_interest')}: ${result.totalInterest.toFixed(2)}</Text>
          <Text>{t('calculators.apr_calculator.total_paid')}: ${result.totalAmountPaid.toFixed(2)}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  resultContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  aprText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#28a745',
    marginBottom: 10
  }
});

export default APRCalculator;
