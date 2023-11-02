import { View, Text } from 'react-native'
import React from 'react'
import { formHeading } from '../styles/styles'

const PageHeading = ({ text, paddingTopStyle }) => {
    return (
        <View style={{ marginBottom: 20, marginTop: 20, paddingTop: paddingTopStyle }}>
            <Text style={formHeading}>{text}</Text>
        </View>
    )
}

export default PageHeading