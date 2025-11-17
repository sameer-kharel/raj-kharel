
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { db } from '../../data/index';

export default function CreditCardPayoffScreen() {
  const { t } = useTranslation();
  const [balance, setBalance] = useState('');
  const [apr, setApr] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState('');
  const [payoffTime, setPayoffTime] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);
  const currency = db.user.currency;

  const calculatePayoff = () => {
    const P = parseFloat(balance);
    const annualRate = parseFloat(apr);
    const A = parseFloat(monthlyPayment);

    if (isNaN(P) || isNaN(annualRate) || isNaN(A) || P <= 0 || annualRate < 0 || A <= 0) {
      Alert.alert(t('calculators.loan_payment.invalid_input'), t('calculators.loan_payment.invalid_input_message'));
      return;
    }

    const r = annualRate / 100 / 12;

    if (A <= P * r) {
        Alert.alert(t('calculators.credit_card_payoff.low_payment_title'), t('calculators.credit_card_payoff.low_payment_message'));
        setPayoffTime(null);
        setTotalInterest(null);
        return;
    }

    // Using the NPER formula
    const N = -Math.log(1 - (r * P) / A) / Math.log(1 + r);
    const numMonths = Math.ceil(N);
    const years = Math.floor(numMonths / 12);
    const months = numMonths % 12;

    const totalPaid = A * numMonths;
    const interestPaid = totalPaid - P;

    if (isNaN(numMonths) || numMonths === Infinity || numMonths < 0) {
        setPayoffTime(t('calculators.loan_payment.invalid_result'));
        setTotalInterest(null);
    } else {
        setPayoffTime(`${years > 0 ? `${years} ${t('calculators.credit_card_payoff.years')} ` : ''}${months} ${t('calculators.credit_card_payoff.months')}`);
        setTotalInterest(`${currency.symbol}${interestPaid.toFixed(2)}`);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>{t('calculators.credit_card_payoff.card_balance')} ({currency.symbol})</Text>
            <TextInput style={styles.input} placeholder="e.g., 5000" keyboardType="numeric" value={balance} onChangeText={setBalance} />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>{t('calculators.credit_card_payoff.apr')} (%)</Text>
            <TextInput style={styles.input} placeholder="e.g., 19.99" keyboardType="numeric" value={apr} onChangeText={setApr} />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>{t('calculators.credit_card_payoff.monthly_payment')} ({currency.symbol})</Text>
            <TextInput style={styles.input} placeholder="e.g., 200" keyboardType="numeric" value={monthlyPayment} onChangeText={setMonthlyPayment} />
          </View>

          <TouchableOpacity style={styles.calculateButton} onPress={calculatePayoff}>
            <Text style={styles.calculateButtonText}>{t('calculators.loan_payment.calculate')}</Text>
          </TouchableOpacity>

          {payoffTime && totalInterest && (
            <View style={styles.resultContainer}>
                <View style={styles.resultRow}>
                    <Text style={styles.resultLabel}>{t('calculators.credit_card_payoff.payoff_time')}</Text>
                    <Text style={styles.resultValue}>{payoffTime}</Text>
                </View>
                <View style={styles.resultRow}>
                    <Text style={styles.resultLabel}>{t('calculators.credit_card_payoff.total_interest')}</Text>
                    <Text style={styles.resultValue}>{totalInterest}</Text>
                </View>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { flexGrow: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  inputContainer: { marginBottom: 20 },
  label: { fontSize: 16, color: '#666', marginBottom: 8 },
  input: { backgroundColor: '#f0f0f0', borderRadius: 10, padding: 15, fontSize: 16, color: '#333' },
  calculateButton: { backgroundColor: '#dc3545', padding: 18, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  calculateButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  resultContainer: { marginTop: 30, padding: 20, backgroundColor: '#fff8f8', borderRadius: 10, borderWidth: 1, borderColor: '#ffdfe2' },
  resultRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 },
  resultLabel: { fontSize: 18, color: '#333' },
  resultValue: { fontSize: 20, fontWeight: 'bold', color: '#dc3545' },
});
