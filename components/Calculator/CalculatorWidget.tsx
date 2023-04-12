import calculatorRequest from '@/utils/graphql';
import { LOAN_TO_VALUE } from '@/utils/queries';
import {
  Box, TextInput, createStyles, Text, Alert, Button,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';
import React, { useState } from 'react';

const inputStyles = createStyles((theme) => ({
  label: {
    color: theme.fn.rgba(theme.colors.violet[1], 0.9),
    fontWeight: 400,
  },
}));

type Value = {
  toSpend: number;
  downPayment: number
}

export default function CalculatorWidget() {
  // const [toSpend, setToSpend] = useState<number>(10000);
  // const [down, setDown] = useState<number>(1500);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [ltvResult, setLtvResult] = useState<string>('');

  const { classes } = inputStyles();

  const form = useForm({
    initialValues: {
      toSpend: 25_000,
      downPayment: 0,
    },
  });

  const handleError = () => {
    setHasError(true);

    notifications.show({
      withCloseButton: true,
      onClose: () => setHasError(false),
      title: 'Bummer!',
      message: 'We encountered an error processing your request. Please try again later.',
      loading: false,
      icon: <IconX />,
      color: 'red',
    });
  };

  async function handleSubmit({ toSpend, downPayment }: Value) {
    setIsLoading(true);

    try {
      const data = await calculatorRequest({
        query: LOAN_TO_VALUE({
          depositValue: downPayment,
          purchasePrice: toSpend,
        }),
      });

      if (data) {
        setLtvResult(data.loanToValueCalc?.result);
        setHasError(false);
      } else {
        handleError();
      }
    } catch (error) {
      handleError();

      console.log(error, 'error');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <Box
        sx={(theme) => ({
          background: theme.fn.linearGradient(
            200,
            theme.colors.violet[3],
            theme.colors.violet[8],
            theme.colors.violet[9],
          ),
          borderRadius: theme.radius.md,
          padding: theme.spacing.lg,

          '@media (min-width: 990px)': {
            padding: '2.5rem',
          },
        })}
        className="shadow-lg"
      >
        <form onSubmit={form.onSubmit(({ toSpend, downPayment }) => handleSubmit({ toSpend, downPayment }))} className="space-y-6">
          <TextInput
            label="Expected home price"
            type="number"
            placeholder="How much do you expect to spend?"
            size="md"
            classNames={{
              label: classes.label,
            }}
            disabled={isLoading || hasError}
            {...form.getInputProps('toSpend')}
          />

          <TextInput
            label="Down payment amount"
            type="number"
            placeholder="How large a down payment can you afford"
            size="md"
            classNames={{
              label: classes.label,
            }}
            disabled={isLoading || hasError}
            {...form.getInputProps('downPayment')}
          />

          <Text
            fz="xl"
            sx={(theme) => ({
              color: theme.fn.rgba(theme.colors.violet[1], 0.9),
              visibility: ltvResult === '' ? 'hidden' : 'visible',
            })}
          >
            Your LTV is
            {' '}
            <Text component="span" underline fw={500}>{ltvResult}</Text>

          </Text>

          <Button
            type="submit"
            fullWidth
            radius="md"
            color="dark"
            disabled={isLoading || hasError}
          >
            Calculate
          </Button>

        </form>

      </Box>

      {/* <Alert icon={<IconAlertCircle size="1rem" />} title="What this means for you?" color="lime">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore dignissimos fuga quasi obcaecati facere illum est, repellendus eos placeat deserunt animi natus, sequi delectus, nostrum iste totam quae culpa. Dolorem.</Alert> */}
    </div>

  );
}
