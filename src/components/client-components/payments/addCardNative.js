import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { } from 'react-native-paper';
import { Formik } from 'formik';
import * as yup from 'yup';

//icons
import IonIcon from 'react-native-vector-icons/Ionicons';

//helpers
import { colors, fonts } from '../../theme';
import { CustomButton, CustomInput, Title } from '../../components';

import { PaymentParamaList } from '../../routes/RouteType';
import FastImage from 'react-native-fast-image';
import Icons from './components/Icons';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addCard } from '../../redux/actions/paymentAction';
import { resetSuccess } from '../../redux/reducers/paymentReducer';

type NavigationProp = StackNavigationProp<PaymentParamaList>;

const CardTypes = {
    cvc = 'cvc',
    cvc_amex = 'cvc_amex',
    american_express = 'american-express',
    diners_club = 'diners-club',
    mastercard = 'mastercard',
    discover = 'discover',
    jcb = 'jcb',
    placeholder = 'placeholder',
    visa = 'visa',
}

interface FormValues= {
    cardNumber: string;
    name: string;
    expiryDate: string;
    cvv: string;
    cardType: CardTypes;
    isDefault: boolean;
}

const validationSchema = yup.object().shape({
    cardNumber: yup
        .string()
        .required('Card Number is required')
        .matches(/^\d{4} ?\d{4} ?\d{4} ?\d{4}$/, 'Card Number is not valid'),

    name: yup.string().required('Name is required'),
    expiryDate: yup
        .string()
        .required('Expiry Date is required')
        .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Expiry Date is not valid')
        .test(
            'expiryMonth',
            'Expiry Date is not valid',
            value => value !== '00' && new Date() <= new Date(`20${value.slice(-2)}`),
        ),
    cvv: yup
        .string()
        .required('CVV is required')
        .min(3, 'CVV must be 3 digits')
        .max(3, 'CVV must be 3 digits'),
});

const AddCard = () => {
    const navigation = useNavigation < NavigationProp > ();

    const dispatch = useAppDispatch();
    const { loading, error, success } = useAppSelector(state => state.payment);

    const handleOnSubmit = (values: FormValues) => {
        dispatch(
            addCard({
                cardNumber: Number(values.cardNumber.replace(/\s/g, '')),
                exp_month: Number(values.expiryDate.split('/')[0]),
                exp_year: 20 + '' + Number(values.expiryDate.split('/')[1]),
                cvv: values.cvv,
                name: values.name,
                isDefault: values.isDefault ? 1 : 0,
            }),
        );
    };

    const detectCardType = (cardNumber) => {
        const cardTypes = [
            {
                type: 'visa',
                pattern: /^4/,
            },
            {
                type: 'mastercard',
                pattern: /^5[1-5]/,
            },
            {
                type: 'cvc_amex',
                pattern: /^3[47]/,
            },
            {
                type: 'discover',
                pattern: /^(6011|65|64[4-9]|622)/,
            },
            {
                type: 'jcb',
                pattern: /^35/,
            },
            {
                type: 'diners-club',
                pattern: /^36/,
            },
            // Add more card types as needed
        ];

        for (const cardType of cardTypes) {
            if (cardNumber.match(cardType.pattern)) {
                return cardType.type;
            }
        }

        return 'placeholder';
    };

    useEffect(() => {
        if (success) {
            navigation.goBack();
            dispatch(resetSuccess());
        }
    }, [success]);
    return (
        <SafeAreaView style={styles.container}>
            <Title title="New payment method" />

            <ScrollView>
                <Formik
                    initialValues={
                        {
                            cardNumber: '',
                            name: '',
                            expiryDate: '',
                            cvv: '',
                            cardType: 'placeholder',
                            isDefault: false,
                        } as FormValues
                    }
                    validationSchema={validationSchema}
                    onSubmit={handleOnSubmit}>
                    {({ handleChange, handleSubmit, values, errors, setFieldValue }) => (
                        <View style={{ margin: 10 }}>
                            <View style={{}}>
                                <CustomInput
                                    label="Card Number"
                                    placeholder="Card Number"
                                    value={values.cardNumber}
                                    maxLength={19}
                                    onChangeText={text => {
                                        const formattedText = text
                                            .replace(/\s/g, '')
                                            .replace(/(\d{4})/g, '$1 ')
                                            .trim();
                                        handleChange('cardNumber')(formattedText);
                                        const cardType = detectCardType(formattedText);
                                        handleChange('cardType')(cardType);
                                    }}
                                    keyboardType="number-pad"
                                    returnKeyType="done"
                                    style={{ marginLeft: 20 }}
                                    containerStyle={{}}
                                //error={!!errors.cardNumber}
                                />
                                <View
                                    style={{
                                        justifyContent: 'flex-end',
                                        alignSelf: 'flex-end',
                                        top: 40,
                                        position: 'absolute',
                                    }}>
                                    <FastImage
                                        source={Icons[values.cardType]}
                                        resizeMode="contain"
                                        style={{ width: 50, height: 20 }}
                                    />
                                </View>
                                {errors.cardNumber && (
                                    <Text style={styles.errorText}>{errors.cardNumber}</Text>
                                )}
                            </View>

                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginTop: 10,
                                }}>
                                <View style={{ flex: 1 }}>
                                    <CustomInput
                                        label="Expiry Date"
                                        placeholder="(MM/YY)"
                                        value={values.expiryDate}
                                        maxLength={5}
                                        onChangeText={text => {
                                            if (text.length === 2 && values.expiryDate.length === 1) {
                                                text += '/';
                                            }
                                            handleChange('expiryDate')(text);
                                        }}
                                        //error={!!errors.expiryDate}
                                        containerStyle={{}}
                                        keyboardType="number-pad"
                                        returnKeyType="done"
                                    />
                                    {errors.expiryDate && (
                                        <Text style={styles.errorText}>{errors.expiryDate}</Text>
                                    )}
                                </View>
                                <View style={{ flex: 1 }}>
                                    <CustomInput
                                        label="CVV"
                                        placeholder="CVV"
                                        maxLength={3}
                                        keyboardType="number-pad"
                                        returnKeyType="done"
                                        value={values.cvv}
                                        onChangeText={handleChange('cvv')}
                                        containerStyle={{}}
                                    //error={!!errors.cvv}
                                    />
                                    {errors.cvv && (
                                        <Text style={styles.errorText}>{errors.cvv}</Text>
                                    )}
                                </View>
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <CustomInput
                                    label="Name"
                                    autoCorrect={false}
                                    maxLength={30}
                                    placeholder="Name"
                                    value={values.name}
                                    onChangeText={handleChange('name')}
                                //error={!!errors.name}
                                />
                                {errors.name && (
                                    <Text style={styles.errorText}>{errors.name}</Text>
                                )}
                            </View>

                            <View
                                style={{
                                    flexDirection: 'row',
                                    marginTop: 20,
                                    alignItems: 'center',
                                }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setFieldValue('isDefault', !values.isDefault);
                                    }}>
                                    <IonIcon
                                        name={values.isDefault ? 'checkbox' : 'square-outline'}
                                        size={20}
                                        color={values.isDefault ? colors.primary : '#BDBDBD'}
                                    />
                                </TouchableOpacity>
                                <Text style={{ fontFamily: fonts.regular }}>
                                    {' '}
                                    Set as default payment method
                                </Text>
                            </View>

                            {error && (
                                <Text
                                    style={[
                                        styles.errorText,
                                        { textAlign: 'center', fontSize: 16 },
                                    ]}>
                                    {error}
                                </Text>
                            )}

                            <CustomButton
                                title="Submit"
                                disabled={!loading}
                                loading={loading}
                                style={{ marginTop: 20 }}
                                onPress={handleSubmit}
                            />
                        </View>
                    )}
                </Formik>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9fbff',
    },
    button: {
        marginTop: 10,
    },
    innerText: {
        fontFamily: fonts.medium,
    },
    errorText: {
        fontFamily: fonts.regular,
        color: colors.red,
        fontSize: 10,
        marginTop: 5,
    },
});

export default AddCard;