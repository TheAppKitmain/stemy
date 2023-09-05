import DatePicker from "react-native-date-picker";

export default function DateTimePicker({ showDatePicker, onConfirm, onCancel, mode }) {

  return (
    <DatePicker
      modal
      mode={mode ? mode : "date"}
      open={showDatePicker}
      date={new Date()}
      onConfirm={(date) => {
        onConfirm(date)
      }}
      onCancel={() => {
        onCancel();
      }}
    />
  );
}

