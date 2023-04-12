import React, { useState } from 'react';

import { Container, Grid, Text } from '@mantine/core';
import CalculatorWidget from './CalculatorWidget';
import CalculatorInstructions from './CalculatorInstructions';

export default function CalculatorMain() {
  return (
    <section className="py-4">
      <Container
        size="md"
        sx={() => ({
          width: '100%',
        })}
      >
        <Text fz="xl" fw="500" component="h2">Calculator</Text>

        <Grid gutterLg="xl" gutterMd="sm">
          <Grid.Col md={6}>
            <CalculatorInstructions />
          </Grid.Col>

          <Grid.Col md={6}>
            <CalculatorWidget />
          </Grid.Col>
        </Grid>
      </Container>
    </section>
  );
}
