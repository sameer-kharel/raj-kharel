
import React from 'react';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { db } from '../../data';

export default function CalculatorsLayout() {
  const { t } = useTranslation();
  const findCalc = (id) => db.calculators.find(c => c.id === id) || {};

  return (
    <Stack>
      <Stack.Screen name="loan-payment" options={{ title: t(findCalc('loan-payment').title) }} />
      <Stack.Screen name="mortgage" options={{ title: t(findCalc('mortgage').title) }} />
      <Stack.Screen name="refinance" options={{ title: t(findCalc('refinance').title) }} />
      <Stack.Screen name="auto-loan" options={{ title: t(findCalc('auto-loan').title) }} />
      <Stack.Screen name="credit-card-payoff" options={{ title: t(findCalc('credit-card-payoff').title) }} />
      <Stack.Screen name="debt-consolidation" options={{ title: t(findCalc('debt-consolidation').title) }} />
      <Stack.Screen name="credit-utilization" options={{ title: t(findCalc('credit-utilization').title) }} />
      <Stack.Screen name="apr-calculator" options={{ title: t(findCalc('apr-calculator').title) }} />
    </Stack>
  );
}
