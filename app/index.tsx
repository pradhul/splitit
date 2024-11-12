import { Colors } from '@/constants/Colors';
import { Text, View, TextInput, Pressable, StyleSheet } from 'react-native';
import { BorderRadius, FontSize, Margins, Paddings } from '@/constants/Dimensions';
import { RecordPaymentPage } from '@/constants/Strings';
import { useState } from 'react';

const colors = Colors.light;

export default function Index() {

  const [amount, setAmount] = useState("0");
  return (
    <View style={styles.container}>
      <View>
      <TextInput autoFocus={true} keyboardType='number-pad' style={styles.inputPayment} onChangeText={text => {setAmount(text)}} />
      <Pressable style={styles.buttonPayment} onPress={() => {}}><Text style={styles.TextPayment}>{RecordPaymentPage.recordPayment}</Text></Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.backGround
  },
  inputPayment: {
    color: colors.primary1,
    padding: Paddings.normal,
    textAlign: 'center',
    fontSize: 50,
    marginBottom: Margins.large,
    borderBottomWidth: .5,
    borderBottomColor: colors.primary1
  },
  buttonPayment: {
    backgroundColor: colors.primary1,
    padding: Paddings.large,
    borderRadius: BorderRadius.button,
    opacity: .9
  },
  TextPayment: {
    color: colors.neutral1,
    fontSize: FontSize.normal,
    textAlign: 'center',
    fontWeight: 'bold'
  }
})