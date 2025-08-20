import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  LiftHistoryTable: {
    height: "60%",
    // backgroundColor: "#4a90e2",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10, // optional (for status bar spacing on some devices)
  },
  liftOptions: {
    bottom: 0,
    position: "absolute"
  },
  inputGroup: {
    display: "flex", flexDirection: "column", alignItems: "center", padding: 3
  },
  liftInputStyle: {
    width: 60
  },
  addSetForm: {
    display: "flex", flexDirection: "row", alignItems: "center", padding: 3
  },
  submitBtn: {
    backgroundColor: "#4a90e2",
    padding: 10, 
  }
});

