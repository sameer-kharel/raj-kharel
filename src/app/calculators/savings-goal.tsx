
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

export default function SavingsGoalCalculator() {
  const { t } = useTranslation();
  const [goal, setGoal] = useState('');
  const [current, setCurrent] = useState('');
  const [contribution, setContribution] = useState('');
  const [months, setMonths] = useState(null);

  const calculateMonths = () => {
    const goalNum = parseFloat(goal);
    const currentNum = parseFloat(current);
    const contributionNum = parseFloat(contribution);

    if (isNaN(goalNum) || isNaN(currentNum) || isNaN(contributionNum)) {
      alert(t('calculators.invalid_input_message'));
      return;
    }

    if (contributionNum <= 0) {
      alert(t('calculators.savings_goal.invalid_contribution'));
      return;
    }

    const monthsNeeded = (goalNum - currentNum) / contributionNum;
    setMonths(Math.ceil(monthsNeeded));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{t('calculators.savings_goal.goal')}</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={goal}
        onChangeText={setGoal}
        placeholder={t('calculators.savings_goal.goal')}
      />
      <Text style={styles.label}>{t('calculators.savings_goal.current')}</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={current}
        onChangeText={setCurrent}
        placeholder={t('calculators.savings_goal.current')}
      />
      <Text style={styles.label}>{t('calculators.savings_goal.contribution')}</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={contribution}
        onChangeText={setContribution}
        placeholder={t('calculators.savings_goal.contribution')}
      />
      <Button title={t('calculators.calculate')} onPress={calculateMonths} />
      {months !== null && (
        <View style={styles.results}>
          <Text>{t('calculators.savings_goal.months', { months })}</Text>
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
