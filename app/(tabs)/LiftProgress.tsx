import { ErrorIndicator, LoadingIndicator } from '@/components/StatusIndicators';
import { styles } from '@/constants/constants';
import GetLiftHistory from '@/data/GetLiftHistory';
import GetLiftOptions from '@/data/GetLiftOptions';
import ILift from '@/interfaces/ILift.interface';
import ILiftOption from '@/interfaces/LiftOptions.interfaces';
import { Picker } from '@react-native-picker/picker';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import LiftProgressChart from '../LiftProgress/LiftProgressChart';

export default function LiftProgress() {
    const [name, setName] = useState<string>("Deadlift");
    const liftHistoryQuery = useQuery<ILift[]>({ queryKey: ['liftHistory', name], queryFn: () => GetLiftHistory(name) })
    const liftOptionsQuery = useQuery<ILiftOption[]>({ queryKey: ['liftOptions'], queryFn: GetLiftOptions })
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedLift, setSelectedLift] = useState<ILift | undefined>();

    function calculateLoad(lift: ILift | null) {
        if(lift == null) return 0;
        const reps = lift.Set1 + (lift.Set2 || 0) + (lift.Set3 || 0) + (lift.Set4 || 0) + (lift.Set5 || 0);
        const load = reps * lift.Weight;
        return load;
    }
    
    return (
        <View>
            <View>
                {liftHistoryQuery.status === 'pending' ? (
                    <LoadingIndicator />
                ) : liftHistoryQuery.status === 'error' ? (
                    <ErrorIndicator error={liftHistoryQuery.error.message} />
                ) : (
                    <LiftProgressChart data={liftHistoryQuery.data} selectedLift={selectedLift} setSelectedLift={setSelectedLift} calculateLoad={calculateLoad} setModalVisible={setModalVisible}/>
                )}
            </View>
            <View style={{}} data-testid="lift-session">
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
            </View>
            {/* Modal for showing details */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text>Weight: {selectedLift?.Weight} kg</Text>
                        <View style={{display: "flex", flexDirection: "row"}}>
                            <View><Text>Reps: </Text></View>
                            <View><Text>{selectedLift?.Set1},</Text></View>
                            <View><Text>{selectedLift?.Set2},</Text></View>
                            <View><Text>{selectedLift?.Set3},</Text></View>
                            <View><Text>{selectedLift?.Set4},</Text></View>
                            <View><Text>{selectedLift?.Set5}</Text></View>
                        </View>
                        <Text>Total Load: {calculateLoad(selectedLift || null)} kg</Text>
                        <Pressable style={styles.button} onPress={() => setModalVisible(false)}>
                            <Text style={styles.buttonText}>Done</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
}