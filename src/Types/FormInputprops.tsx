export interface forminput {
    label: string,
    placeholder: string,
    value: string,
    onChangeText: (text: string) => void,
    secureTextEntry?: boolean,
    status: string,
    error?: string
}

