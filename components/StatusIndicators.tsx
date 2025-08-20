import { Text, View } from 'react-native';

export function LoadingIndicator() {
    return <View className="my-2 spinner-container">
        <View className="spinner-border custom-spinner" role="status">
            <Text className="visually-hidden">Loading...</Text>
        </View>
    </View>
}

export function LoadingIndicatorFullScreen() {
    return <View className="spinner-overlay">
        <View className="spinner-border" role="status">
            <Text className="visually-hidden">Loading...</Text>
        </View>
    </View>
}

type ErrorMesage = {
    error: string;
}
export function ErrorIndicator(error: ErrorMesage) {
    return <View className="bg-warning" role="status">
        <Text className="text-danger m-3">{error.error}</Text>
    </View>
}