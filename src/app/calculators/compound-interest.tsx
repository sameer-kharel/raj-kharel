
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

export default function CompoundInterestCalculator() {
  const { t } = useTranslation();
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');
  const [compounds, setCompounds] = useState('');
  const [futureValue, setFutureValue] = useState(null);

  const calculateInterest = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(years);
    const n = parseFloat(compounds);

    if (isNaN(p) || isNaN(r) || isNaN(t) || isNaN(n)) {
      alert(t('calculators.invalid_input_message'));
      return;
    }

    const amount = p * Math.pow(1 + r / n, n * t);
    setFutureValue(amount.toFixed(2));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{t('calculators.compound_interest.principal')}</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={principal}
        onChangeText={setPrincipal}
        placeholder={t('calculators.compound_interest.principal')}
      />
      <Text style={styles.label}>{t('calculators.compound_interest.rate')}</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={rate}
        onChangeText={setRate}
        placeholder={t('calculators.compound_interest.rate')}
      />
      <Text style={styles.label}>{t('calculators.compound_interest.years')}</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={years}
        onChangeText={setYears}
        placeholder={t('calculators.compound_interest.years')}
      />
      <Text style={styles.label}>{t('calculators.compound_interest.compounds')}</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={compounds}
        onChangeText={setCompounds}
        placeholder={t('calculators.compound_interest.compounds')}
      />
      <Button title={t('calculators.calculate')} onPress={calculateInterest} />
      {futureValue !== null && (
        <View style={styles.results}>
          <Text>{t('calculators.compound_interest.future_value')}: {futureValue}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  results: {
    marginTop: 20,
  },
});
