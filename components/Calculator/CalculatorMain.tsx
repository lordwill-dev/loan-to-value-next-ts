import React, { useState } from 'react';

import {
  Container, Grid, Text, Flex, Box,
} from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import CalculatorWidget from './CalculatorWidget';
import CalculatorInstructions from './CalculatorInstructions';

function InformationBlock({ value }: { value: number | null }) {
  function showBlock() {
    if (!value) return '';

    return (
      <Box sx={(theme) => ({
        borderRadius: theme.radius.lg,
        backgroundColor: value < 80 ? theme.colors.lime[1] : theme.colors.orange[1],
        padding: theme.spacing.md,
      })}
      >
        <Flex gap={16}>
          <IconInfoCircle size="1.5rem" />
          {value < 80 ? (
            <Text>
              A lower LTV ratio is usually viewed as less risky by lenders,
              as it means the borrower has more equity in the property and
              is less likely to default on the loan

            </Text>
          ) : (
            <Text>
              A higher LTV ratio, may indicate higher risk and
              could result in higher interest rates or
              stricter lending requirements.
            </Text>
          )}
        </Flex>
      </Box>
    );
  }

  return <section className="mt-6">{showBlock()}</section>;
}

export default function CalculatorMain() {
  const [lvResult, setLvResult] = useState<number | null>(null);

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
            <CalculatorWidget showInfo={setLvResult} />
          </Grid.Col>
        </Grid>

        <InformationBlock value={Number(lvResult)} />

      </Container>
    </section>
  );
}
