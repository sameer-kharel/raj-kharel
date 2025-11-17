
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';

const DebtConsolidationCalculator = () => {
  const { t } = useTranslation();
  const [debts, setDebts] = useState([{ name: '', amount: '', interestRate: '' }]);
  const [newLoanInterestRate, setNewLoanInterestRate] = useState('');
  const [newLoanTerm, setNewLoanTerm] = useState('');
  const [result, setResult] = useState(null);

  const handleDebtChange = (index, field, value) => {
    const newDebts = [...debts];
    newDebts[index][field] = value;
    setDebts(newDebts);
  };

  const addDebt = () => {
    setDebts([...debts, { name: '', amount: '', interestRate: '' }]);
  };

  const removeDebt = (index) => {
    const newDebts = debts.filter((_, i) => i !== index);
    setDebts(newDebts);
  };

  const calculate = () => {
    const totalDebtAmount = debts.reduce((acc, debt) => acc + (parseFloat(debt.amount) || 0), 0);
    const weightedAverageInterestRate = debts.reduce((acc, debt) => acc + (parseFloat(debt.amount) || 0) * (parseFloat(debt.interestRate) || 0), 0) / totalDebtAmount;

    if (totalDebtAmount === 0 || !newLoanInterestRate || !newLoanTerm) {
      Alert.alert(t('calculators.invalid_input'), t('calculators.invalid_input_message'));
      return;
    }

    const currentMonthlyPayment = debts.reduce((acc, debt) => {
        const amount = parseFloat(debt.amount) || 0;
        const rate = (parseFloat(debt.interestRate) || 0) / 100 / 12;
        // Assuming a 5 year term for individual debts if not specified
        const term = 5 * 12;
        if (rate > 0) {
            return acc + (amount * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
        }
        return acc + amount / term;
    }, 0);


    const newRate = parseFloat(newLoanInterestRate) / 100 / 12;
    const newTerm = parseFloat(newLoanTerm) * 12;
    const newMonthlyPayment = (totalDebtAmount * newRate * Math.pow(1 + newRate, newTerm)) / (Math.pow(1 + newRate, newTerm) - 1);

    const totalInterestCurrent = (currentMonthlyPayment * (5*12)) - totalDebtAmount;
    const totalInterestNew = (newMonthlyPayment * newTerm) - totalDebtAmount;

    setResult({
      totalDebtAmount,
      currentMonthlyPayment,
      newMonthlyPayment,
      monthlySavings: currentMonthlyPayment - newMonthlyPayment,
      totalInterestCurrent,
      totalInterestNew,
    });
  };

  return (
    <ScrollView style={styles.container}>
      {debts.map((debt, index) => (
        <View key={index} style={styles.debtContainer}>
          <TextInput
            style={styles.input}
            placeholder={t('calculators.debt_consolidation.debt_name')}
            value={debt.name}
            onChangeText={(value) => handleDebtChange(index, 'name', value)}
          />
          <TextInput
            style={styles.input}
            placeholder={t('calculators.loan_payment.loan_amount')}
            keyboardType="numeric"
            value={debt.amount}
            onChangeText={(value) => handleDebtChange(index, 'amount', value)}
          />
          <TextInput
            style={styles.input}
            placeholder={t('calculators.loan_payment.interest_rate')}
            keyboardType="numeric"
            value={debt.interestRate}
            onChangeText={(value) => handleDebtChange(index, 'interestRate', value)}
          />
          {debts.length > 1 && <Button title={t('calculators.debt_consolidation.remove_debt')} onPress={() => removeDebt(index)} color="#dc3545" />}
        </View>
      ))}
      
      <Button title={t('calculators.debt_consolidation.add_debt')} onPress={addDebt} />

      <Text style={styles.subtitle}>{t('calculators.debt_consolidation.new_loan_details')}</Text>
      <TextInput
        style={styles.input}
        placeholder={t('calculators.refinance.new_interest_rate')}
        keyboardType="numeric"
        value={newLoanInterestRate}
        onChangeText={setNewLoanInterestRate}
      />
      <TextInput
        style={styles.input}
        placeholder={t('calculators.refinance.new_loan_term')}
        keyboardType="numeric"
        value={newLoanTerm}
        onChangeText={setNewLoanTerm}
      />
      
      <Button title={t('calculators.loan_payment.calculate')} onPress={calculate} />

      {result && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>{t('calculators.debt_consolidation.consolidation_summary')}</Text>
          <Text>{t('calculators.debt_consolidation.total_debt')}: ${result.totalDebtAmount.toFixed(2)}</Text>
          <Text>{t('calculators.debt_consolidation.current_monthly_payment')}: ${result.currentMonthlyPayment.toFixed(2)}</Text>
          <Text>{t('calculators.debt_consolidation.new_monthly_payment')}: ${result.newMonthlyPayment.toFixed(2)}</Text>
          <Text style={result.monthlySavings > 0 ? styles.savings : styles.loss}>
            {t('calculators.refinance.monthly_savings')}: ${result.monthlySavings.toFixed(2)}
          </Text>
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
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  debtContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
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
  savings: {
    color: 'green',
    fontWeight: 'bold',
  },
  loss: {
    color: 'red',
    fontWeight: 'bold',
  }
});

export default DebtConsolidationCalculator;
