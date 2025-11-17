import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { db } from '../../data/index';

export default function RefinanceCalculatorScreen() {
  const router = useRouter();

  // Current Mortgage
  const [currentLoanAmount, setCurrentLoanAmount] = useState('');
  const [currentInterestRate, setCurrentInterestRate] = useState('');
  const [currentLoanTerm, setCurrentLoanTerm] = useState('');

  // New Mortgage
  const [newInterestRate, setNewInterestRate] = useState('');
  const [newLoanTerm, setNewLoanTerm] = useState('');

  // Results
  const [newMonthlyPayment, setNewMonthlyPayment] = useState(null);
  const [savings, setSavings] = useState(null);

  const currency = db.user.currency;

  const calculateRefinance = () => {
    // Current Loan Calculation
    const P1 = parseFloat(currentLoanAmount);
    const r1 = parseFloat(currentInterestRate) / 100 / 12;
    const n1 = parseFloat(currentLoanTerm) * 12;

    if (isNaN(P1) || isNaN(r1) || isNaN(n1) || P1 <= 0 || r1 < 0 || n1 <= 0) {
      Alert.alert('Invalid Input', 'Please enter valid numbers for all fields in Current Mortgage.');
      return;
    }

    const currentPayment = P1 * (r1 * Math.pow(1 + r1, n1)) / (Math.pow(1 + r1, n1) - 1);

    // New Loan Calculation
    const P2 = P1; // Assuming refinancing the remaining balance
    const r2 = parseFloat(newInterestRate) / 100 / 12;
    const n2 = parseFloat(newLoanTerm) * 12;

    if (isNaN(r2) || isNaN(n2) || r2 < 0 || n2 <= 0) {
      Alert.alert('Invalid Input', 'Please enter valid numbers for all fields in New Mortgage.');
      return;
    }

    const newPayment = P2 * (r2 * Math.pow(1 + r2, n2)) / (Math.pow(1 + r2, n2) - 1);
    const monthlySavings = currentPayment - newPayment;

    if (isNaN(newPayment) || newPayment === Infinity || newPayment < 0) {
      setNewMonthlyPayment("Invalid result, check your inputs");
      setSavings(null);
    } else {
      setNewMonthlyPayment(`${currency.symbol}${newPayment.toFixed(2)}`);
      setSavings(`${monthlySavings > 0 ? '' : '-'}${currency.symbol}${Math.abs(monthlySavings).toFixed(2)}`);
    }
  };

  // Safely determine savings color
  const getSavingsColor = () => {
    if (!savings) return '#333';
    const value = parseFloat(savings.replace(/[^\d.-]/g, ''));
    if (isNaN(value)) return '#333';
    return value >= 0 ? '#28a745' : '#dc3545';
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
          {/* Current Mortgage */}
          <Text style={styles.sectionTitle}>Current Mortgage</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Remaining Loan Amount ({currency.symbol})</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., 250000"
              keyboardType="numeric"
              value={currentLoanAmount}
              onChangeText={setCurrentLoanAmount}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Annual Interest Rate (%)</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., 5.5"
              keyboardType="numeric"
              value={currentInterestRate}
              onChangeText={setCurrentInterestRate}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Remaining Loan Term (Years)</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., 25"
              keyboardType="numeric"
              value={currentLoanTerm}
              onChangeText={setCurrentLoanTerm}
            />
          </View>

          {/* New Mortgage */}
          <Text style={styles.sectionTitle}>New Mortgage</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>New Annual Interest Rate (%)</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., 4.5"
              keyboardType="numeric"
              value={newInterestRate}
              onChangeText={setNewInterestRate}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>New Loan Term (Years)</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., 30"
              keyboardType="numeric"
              value={newLoanTerm}
              onChangeText={setNewLoanTerm}
            />
          </View>

          <TouchableOpacity style={styles.calculateButton} onPress={calculateRefinance}>
            <Text style={styles.calculateButtonText}>Calculate</Text>
          </TouchableOpacity>

          {newMonthlyPayment && (
            <View style={styles.resultContainer}>
              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>New Monthly Payment:</Text>
                <Text style={styles.resultValue}>{newMonthlyPayment}</Text>
              </View>
              {savings !== null && (
                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>Monthly Savings:</Text>
                  <Text style={[styles.resultValue, { color: getSavingsColor() }]}>{savings}</Text>
                </View>
              )}
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
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginTop: 10, marginBottom: 15, borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 5 },
  inputContainer: { marginBottom: 15 },
  label: { fontSize: 16, color: '#666', marginBottom: 8 },
  input: { backgroundColor: '#f0f0f0', borderRadius: 10, padding: 15, fontSize: 16, color: '#333' },
  calculateButton: { backgroundColor: '#28a745', padding: 18, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  calculateButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  resultContainer: { marginTop: 30, padding: 20, backgroundColor: '#f0f8ff', borderRadius: 10, borderWidth: 1, borderColor: '#d1eaff' },
  resultRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 },
  resultLabel: { fontSize: 18, color: '#333' },
  resultValue: { fontSize: 20, fontWeight: 'bold', color: '#007bff' },
});
