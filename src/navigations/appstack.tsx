import React, { FC } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { DetailPage, TransactionListPage } from '../screens/index'
const {Navigator, Screen} = createStackNavigator<RootStackParamList>()

interface objData {
    "account_number": string,
    "amount": number,
    "beneficiary_bank": string,
    "beneficiary_name": string,
    "completed_at": string,
    "created_at": string,
    "fee": number,
    "id": string,
    "key": string,
    "remark": string,
    "sender_bank": string,
    "status": string,
    "unique_code": number
}

export type RootStackParamList = {
    TransactionListPage: undefined;
    DetailPage: {
        data: objData;
    }
}

const AppStack: FC = () => {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false }}>
                <Screen name="TransactionListPage" component={TransactionListPage}/>
                <Screen name="DetailPage" component={DetailPage}/>
            </Navigator>
        </NavigationContainer>
    )
}
export default AppStack;