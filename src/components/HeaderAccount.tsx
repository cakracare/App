import {Image, View} from "react-native";
import styles from "../style/AccountStyle.tsx";
import {Text} from "@ui-kitten/components";
import React from "react";

type headerAccountProps = {
    image: string,
    name: string,
    email: string
}

export const HeaderAccount = (props:headerAccountProps): React.ReactElement => {
    return (
        <View style={styles.container1}>
            <Image source={{uri: props.image}} style={styles.Image} />
            <View style={styles.container2}>
                <Text style={styles.Text}>{props.name}</Text>
                <Text>{props.email}</Text>
            </View>
        </View>
    );
}