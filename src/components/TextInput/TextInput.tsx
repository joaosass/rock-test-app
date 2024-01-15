import React from 'react';
import {View} from 'react-native';
import {Text, TextInput} from 'react-native-paper';

import {Control, Controller, FieldPath, FieldValues} from 'react-hook-form';
import useTextInput from './useTextInput';
import styles from './styles';

interface TextInputProps<T extends FieldValues> {
  control: Control<T>;
  errorMessage?: string;
  label: string;
  name: FieldPath<T>;
  type?: string;
}

function TextInputComponent<T extends FieldValues>({
  control,
  errorMessage,
  label,
  name,
  type,
}: TextInputProps<T>): React.JSX.Element {
  const {handleCurrency, handleType} = useTextInput();

  return (
    <View style={styles.textInputGap}>
      <Controller
        control={control}
        name={name}
        render={({field: {onChange, ...field}}) => (
          <TextInput
            mode="outlined"
            label={label}
            {...handleType(type)}
            onChangeText={
              type === 'currency'
                ? text => onChange(handleCurrency(text))
                : onChange
            }
            error={Boolean(errorMessage)}
            {...field}
          />
        )}
      />
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
    </View>
  );
}

export default TextInputComponent;