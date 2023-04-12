import React, { useState } from 'react';
import { calculatorRequest } from '@/utils/graphql';
import { calculatePercentageValue } from '@/utils/helpers';
import { LOAN_TO_VALUE } from '@/utils/queries';
import {
  Box, TextInput, createStyles, Text, Button, Slider, Stack,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconInfoCircle, IconX } from '@tabler/icons-react';

type Value = {
  toSpend: number;
  downPayment: number
}

type Props = {
  showInfo: React.Dispatch<React.SetStateAction<number | null>>;
}

const inputStyles = createStyles((theme) => ({
  label: {
    color: theme.fn.rgba(theme.colors.violet[1], 0.9),
    fontWeight: 400,
  },
}));

const SLIDER_MARKS = [
  { value: 0, label: '0%' },
  { value: 25, label: '25%' },
  { value: 50, label: '50%' },
  { value: 75, label: '75%' },
  { value: 100, label: '100%' },
];

export default function ChildComponent({ showInfo }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [ltvResult, setLtvResult] = useState<string>('');

  const { classes } = inputStyles();

  const form = useForm({
    initialValues: {
      toSpend: 25_000,
      downPayment: calculatePercentageValue({ baseValue: 25_000, percent: 50 }),
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

  const handleSliderChange = (value: number) => {
    const { toSpend } = form.values;

    const percentAmount = calculatePercentageValue({ baseValue: toSpend, percent: value });

    form.setFieldValue('downPayment', percentAmount);
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

        const removedPercent = data.loanToValueCalc?.result?.split('%')[0] || null;

        showInfo(removedPercent);
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

          <Text sx={(theme) => ({
            color: theme.fn.rgba(theme.colors.violet[1], 0.9),
          })}
          >
            Downpayment amount

            <Text fz="xs" className="flex items-center ">
              <IconInfoCircle size="1.1rem" className="mr-1" />
              How large a down payment can you afford
            </Text>
          </Text>

          <Slider
            color="dark"
            defaultValue={50}
            label={(val) => {
              const mark = SLIDER_MARKS.find((slider) => slider.value === val);
              return mark ? mark.label : '';
            }}
            classNames={{
              markLabel: classes.label,
            }}
            step={25}
            marks={SLIDER_MARKS}
            disabled={isLoading || hasError}
            onChange={(value) => handleSliderChange(value)}
          />

          <Stack spacing={0} className="!mt-12">
            <Text
              fz="xs"
              sx={(theme) => ({
                color: theme.fn.rgba(theme.colors.violet[1], 0.9),
              })}
              align="center"
              className="mb-6"
            >
              or manually enter

            </Text>

            <TextInput
              label=""
              type="number"
              placeholder="How large a down payment can you afford"
              size="md"
              classNames={{
                label: classes.label,
              }}
              disabled={isLoading || hasError}
              {...form.getInputProps('downPayment')}
            />
          </Stack>

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

    </div>

  );
}
