import { Colors } from '@/constants/Colors';
import { Text, View, TextInput, Pressable, StyleSheet } from 'react-native';
import { BorderRadius, FontSize, Margins, Paddings } from '@/constants/Dimensions';
import { RecordPaymentPage } from '@/constants/Strings';

const colors = Colors.light;

export default function Index() {
  return (
    <View style={styles.container}>
      <View>
      <TextInput style={styles.inputPayment} value='0'/>
      <Pressable style={styles.buttonPayment}><Text style={styles.TextPayment}>{RecordPaymentPage.recordPayment}</Text></Pressable>
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
    marginBottom: Margins.large
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