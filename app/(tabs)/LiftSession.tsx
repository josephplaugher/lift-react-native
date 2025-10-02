import LiftHistoryTable from "@/components/LiftHistoryTable";
import { ErrorIndicator, LoadingIndicator, LoadingIndicatorFullScreen } from "@/components/StatusIndicators";
import { styles } from "@/constants/constants";
import GetLiftHistory from "@/data/GetLiftHistory";
import GetLiftOptions from "@/data/GetLiftOptions";
import useAddSets from "@/hooks/useAddSet";
import ILift from "@/interfaces/ILift.interface";
import ILiftOption from "@/interfaces/LiftOptions.interfaces";
import { Picker } from "@react-native-picker/picker";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

export default function LiftSession() {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [userMsg, setUserMsg] = useState<string>("");
  const [Name, setName] = useState<string>("Deadlift");

  const [kg20, setKg20] = useState<number>(0);
  const [kg15, setKg15] = useState<number>(0);
  const [kg10, setKg10] = useState<number>(0);
  const [kg5, setKg5] = useState<number>(0);
  const [kg2_5, setKg2_5] = useState<number>(0);

  const liftHistoryQuery = useQuery<ILift[]>({ queryKey: ['liftHistory', Name], queryFn: () => GetLiftHistory(Name) })
  const liftOptionsQuery = useQuery<ILiftOption[]>({ queryKey: ['liftOptions'], queryFn: GetLiftOptions })
  const { AddSets, Weight, setWeight, Set1, setSet1, Set2, setSet2, Set3, setSet3, Set4, setSet4, Set5, setSet5 } = useAddSets(liftHistoryQuery, Name, setUserMsg, setError, loading, setLoading);

  useEffect(() => {
    const w: number = ((kg20 + kg15 + kg10 + kg5 + kg2_5) * 2) + 20;
    setWeight(w)
  }, [setWeight, kg20, kg15, kg10, kg5, kg2_5])

  useEffect(()=> {
    console.log("name: ", Name)
  },[Name])
  
  return (
    <>
      <View className="container-fluid py-0 px-2" style={styles.LiftHistoryTable}>
        <View className="row overflow-auto p-2 h-75">
          {liftHistoryQuery.status === 'pending' ? (
            <LoadingIndicator />
          ) : liftHistoryQuery.status === 'error' ? (
            <ErrorIndicator error={liftHistoryQuery.error.message} />
          ) : (
            <LiftHistoryTable lifts={liftHistoryQuery.data} />
          )}
        </View>
      </View>
      <View className="container-fluid py-3 border border-4 border-primary" style={styles.liftOptions} data-testid="lift-session">
        <View className="row pb-3" >
          <View className="col">
            <>
              <Picker onValueChange={(val: string) => setName(val)}
                className={`form-control ${liftOptionsQuery.status == "pending" ? "bg-warning" : liftOptionsQuery.status == "error" ? "text-danger" : ""}`}>
                {liftOptionsQuery.status === 'pending' ? (
                  <Picker.Item value="" label="Getting lift options..." />
                ) : liftOptionsQuery.status === 'error' ? (
                  <Picker.Item value="" label="Something went wrong" />
                ) : (
                  liftOptionsQuery.data.map((l: ILiftOption) =>
                    <Picker.Item key={l.Id} value={l.Name} label={l.Name} />
                  )
                )}
              </Picker>
            </>
          </View>
        </View>

        <View className="row">
          <View className="col">
            <View>
              <View style={styles.weightSelectGroup}>
                <Pressable style={kg20 == 0 ? styles.unselectedWeight : styles.selectedWeight} onPress={() => kg20 == 0 ? setKg20(20) : setKg20(0)}><Text style={kg20 == 0 ? styles.unselectedWeightFont : styles.selectedWeightFont}>20kg</Text></Pressable>
                <Pressable style={kg15 == 0 ? styles.unselectedWeight : styles.selectedWeight} onPress={() => kg15 == 0 ? setKg15(15) : setKg15(0)}><Text style={kg15 == 0 ? styles.unselectedWeightFont : styles.selectedWeightFont}>15kg</Text></Pressable>
                <Pressable style={kg10 == 0 ? styles.unselectedWeight : styles.selectedWeight} onPress={() => kg10 == 0 ? setKg10(10) : setKg10(0)}><Text style={kg10 == 0 ? styles.unselectedWeightFont : styles.selectedWeightFont}>10kg</Text></Pressable>
                <Pressable style={kg5 == 0 ? styles.unselectedWeight : styles.selectedWeight} onPress={() => kg5 == 0 ? setKg5(5) : setKg5(0)}><Text style={kg5 == 0 ? styles.unselectedWeightFont : styles.selectedWeightFont}>5kg</Text></Pressable>
                <Pressable style={kg2_5 == 0 ? styles.unselectedWeight : styles.selectedWeight} onPress={() => kg2_5 == 0 ? setKg2_5(2.5) : setKg2_5(0)}><Text style={kg2_5 == 0 ? styles.unselectedWeightFont : styles.selectedWeightFont}>2.5kg</Text></Pressable>
                <View style={styles.inputGroup}>
                  <Text style={styles.totalSelectedWeight}>{Weight}</Text>
                </View>
              </View>
              <View style={styles.addSetForm}>
                <View style={styles.inputGroup}>
                  <Text>Set 1</Text>
                  <TextInput style={styles.liftInputStyle} value={Set1.toString()} onChangeText={() => setSet1} />
                </View>
                <View style={styles.inputGroup}>
                  <Text>Set 2</Text>
                  <TextInput style={styles.liftInputStyle} value={Set2.toString()} onChangeText={() => setSet2} />
                </View>
                <View style={styles.inputGroup}>
                  <Text>Set 3</Text>
                  <TextInput style={styles.liftInputStyle} value={Set3.toString()} onChangeText={() => setSet3} />
                </View>
                <View style={styles.inputGroup}>
                  <Text>Set 4</Text>
                  <TextInput style={styles.liftInputStyle} value={Set4.toString()} onChangeText={() => setSet4} />
                </View>
                <View style={styles.inputGroup}>
                  <Text>Set 5</Text>
                  <TextInput style={styles.liftInputStyle} value={Set5.toString()} onChangeText={() => setSet5} />
                </View>
                <View style={styles.inputGroup}>
                  {userMsg ? <Text>{userMsg}</Text>
                    :
                    <Pressable onPress={() => AddSets} style={styles.submitBtn}>
                      <Text style={styles.submitBtn}>Add Sets</Text>
                    </Pressable>
                  }
                </View>
              </View>
            </View>
            {error && <Text>{error}</Text>}
          </View>
        </View>
      </View >
      {loading && <View>
        <LoadingIndicatorFullScreen />
      </View>}
    </>
  )
}