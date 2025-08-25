import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  LiftHistoryTable: {
    height: "60%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10, // optional (for status bar spacing on some devices)
  },
  liftOptions: {
    bottom: 0,
    position: "absolute"
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 3,
    fontSize: 16
  },
  liftInputStyle: {
    width: 55,
    paddingLeft: 15,
    marginBottom: 5,
    borderRadius: 3,
    borderColor: "#4a90e2",
    borderWidth: 1,
    fontSize: 16
  },
  addSetForm: {
    display: "flex", flexDirection: "row", padding: 3
  },
  submitBtn: {
    backgroundColor: "#4a90e2",
    padding: 8,
    marginTop: 5,
    fontSize: 16,
    borderRadius: 8,
    color: "#ffffff"
  },
  weightSelectGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 3
  },
  selectedWeight: {
    backgroundColor: "#4a90e2",
    textAlign: "center",
    justifyContent: "center",
    padding: 7,
    margin: 1,
    fontSize: 14,
    borderRadius: 8,
  },
  unselectedWeight: {
    backgroundColor: "#ffffff",
    color: "#4a90e2",
    textAlign: "center",
    justifyContent: "center",
    padding: 7,
    margin: 1,
    fontSize: 14,
    borderRadius: 8,
  },
  selectedWeightFont: {
    color: "#ffffff",
    padding: 7,
  },
  unselectedWeightFont: {
    color: "#4a90e2",
    padding: 7,
  },
  totalSelectedWeight: {
    textAlign: "center",
    justifyContent: "center",
    width: 55,
    padding: 10,
    marginBottom: 3,
    borderRadius: 8,
    borderColor: "#4a90e2",
    borderWidth: 2,
    fontSize: 16
  }
});

