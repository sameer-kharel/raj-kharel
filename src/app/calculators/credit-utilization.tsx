
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';

const CreditUtilizationCalculator = () => {
  const { t } = useTranslation();
  const [creditCards, setCreditCards] = useState([{ balance: '', limit: '' }]);
  const [result, setResult] = useState(null);

  const handleCardChange = (index, field, value) => {
    const newCards = [...creditCards];
    newCards[index][field] = value;
    setCreditCards(newCards);
  };

  const addCard = () => {
    setCreditCards([...creditCards, { balance: '', limit: '' }]);
  };

  const removeCard = (index) => {
    const newCards = creditCards.filter((_, i) => i !== index);
    setCreditCards(newCards);
  };

  const calculate = () => {
    const totalBalance = creditCards.reduce((acc, card) => acc + (parseFloat(card.balance) || 0), 0);
    const totalLimit = creditCards.reduce((acc, card) => acc + (parseFloat(card.limit) || 0), 0);

    if (totalLimit === 0) {
      Alert.alert(t('calculators.invalid_input'), t('calculators.credit_utilization.zero_limit_error'));
      return;
    }

    const utilization = (totalBalance / totalLimit) * 100;

    setResult({
      totalBalance,
      totalLimit,
      utilization,
    });
  };

  return (
    <ScrollView style={styles.container}>
      {creditCards.map((card, index) => (
        <View key={index} style={styles.cardContainer}>
          <TextInput
            style={styles.input}
            placeholder={t('calculators.credit_card_payoff.card_balance')}
            keyboardType="numeric"
            value={card.balance}
            onChangeText={(value) => handleCardChange(index, 'balance', value)}
          />
          <TextInput
            style={styles.input}
            placeholder={t('calculators.credit_utilization.credit_limit')}
            keyboardType="numeric"
            value={card.limit}
            onChangeText={(value) => handleCardChange(index, 'limit', value)}
          />
          {creditCards.length > 1 && <Button title={t('calculators.debt_consolidation.remove_debt')} onPress={() => removeCard(index)} color="#dc3545" />}
        </View>
      ))}

      <Button title={t('calculators.credit_utilization.add_card')} onPress={addCard} />
      
      <View style={{marginTop: 10}}>
        <Button title={t('calculators.loan_payment.calculate')} onPress={calculate} />
      </View>

      {result && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>{t('calculators.credit_utilization.utilization_summary')}</Text>
          <Text>{t('calculators.credit_utilization.total_balance')}: ${result.totalBalance.toFixed(2)}</Text>
          <Text>{t('calculators.credit_utilization.total_limit')}: ${result.totalLimit.toFixed(2)}</Text>
          <Text style={styles.utilizationText}>{t('calculators.credit_utilization.credit_utilization')}: {result.utilization.toFixed(2)}%</Text>
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
  cardContainer: {
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
  utilizationText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  }
});

export default CreditUtilizationCalculator;
