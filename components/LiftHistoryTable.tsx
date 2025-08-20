import React from "react";
import { FlatList, StyleSheet, Text, View } from 'react-native';
import ILift from "../interfaces/ILift.interface";

export default function LiftHistoryTable(param: { lifts: ILift[] }) {
    return (
        <>
            <View style={styles.header}>
                <Text style={styles.itemText}>Date</Text>
                <Text style={styles.itemText}>Name</Text>
                <Text style={styles.itemText}>Weight</Text>
                <Text style={styles.itemText}>Sets</Text>
                <Text style={styles.itemText}></Text>
            </View>
            {param.lifts.length > 0 ?
                <View style={styles.container}>
                    <FlatList
                        data={param.lifts}
                        keyExtractor={(item) => item.Id + item.Name}
                        renderItem={({ item }) => (
                            <View style={styles.item}>
                                <Text style={styles.itemText}>{item.Date}</Text>
                                <Text style={styles.itemText}>{item.Name}</Text>
                                <Text style={styles.itemText}>{item.Weight}kg</Text>
                                <Text style={styles.itemText}>{item.Set1}</Text>
                                <Text style={styles.itemText}>{item.Set2}</Text>
                                <Text style={styles.itemText}>{item.Set3}</Text>
                                <Text style={styles.itemText}>{item.Set4}</Text>
                                <Text style={styles.itemText}>{item.Set5}</Text>
                            </View>
                        )}
                    />
                </View>
                :
                <View>
                    <Text>Nothing here</Text>
                </View>
            }
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    header: {
        fontSize: 20,
        margin: 10,
        fontWeight: "bold",
        borderRadius: 3,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    item: {
        marginBottom: 5,
        borderRadius: 3,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        borderColor: "#4a90e2",
        borderWidth: 1
    },
    itemText: {
        fontSize: 16,
        paddingInline: 8,
    },
});