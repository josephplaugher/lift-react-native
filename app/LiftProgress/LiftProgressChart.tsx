import ILift from "@/interfaces/ILift.interface";
import { SetStateAction } from "react";
import { Dimensions, View } from "react-native";
import { LineChart } from "react-native-chart-kit";

export default function LiftProgressChart(props: {
    data: ILift[],
    selectedLift: ILift | undefined,
    setSelectedLift: React.Dispatch<SetStateAction<ILift | undefined>>,
    calculateLoad: (lift: ILift) => number,
    setModalVisible: React.Dispatch<SetStateAction<boolean>>,
}) {
    function dateFormat(dateStr: string) {
        const date = new Date(dateStr + "T00:00:00");
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        });
    }

    function setLiftDetails(index: number) {
        const targetLift = props.data?.[index];
        props.setSelectedLift(targetLift);
    }

    return (
        <View>
        <LineChart
            data={{
                labels: [
                    dateFormat(props.data[6].Date),
                    dateFormat(props.data[5].Date),
                    dateFormat(props.data[4].Date),
                    dateFormat(props.data[3].Date),
                    dateFormat(props.data[2].Date),
                    dateFormat(props.data[1].Date),
                    dateFormat(props.data[0].Date),
                ],
                datasets: [
                    {
                        data: [
                            props.calculateLoad(props.data[6]),
                            props.calculateLoad(props.data[5]),
                            props.calculateLoad(props.data[4]),
                            props.calculateLoad(props.data[3]),
                            props.calculateLoad(props.data[1]),
                            props.calculateLoad(props.data[0]),
                        ]
                    }
                ]
            }}
            width={Dimensions.get("window").width} // from react-native
            height={Dimensions.get("window").height * .75}
            yAxisLabel=""
            yAxisSuffix=" kg"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
                backgroundColor: "#000",
                backgroundGradientFrom: "green",
                backgroundGradientTo: "white",
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                    borderRadius: 0,
                },
                propsForDots: {
                    r: "8",
                    strokeWidth: "2",
                    stroke: "#ffa726"
                }
            }}
            bezier
            onDataPointClick={(data) => {
                setLiftDetails(data.index);
                props.setModalVisible(true);
            }}
            style={{
                marginVertical: 0,
                borderRadius: 0,
            }}
        />
        </View>
    )
}