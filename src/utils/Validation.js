import * as moment from 'moment';

const empty = (value) => {
    const val = value ? value.toString().trim() : value || value === 0;
    return !val;
};

const minOf = (value, min, max) => {
    return !empty(value) && value.length >= min && value.length <= max;
};

const minOfNew = (value, min) => {
    return !empty(value) && value.length >= min;
}

const maxOf = (value, max) => {
    return !empty(value) && value.length < max;
};

const password = (value) => {
    const rePass = /^(?=(.*\d){1})(?=.*[A-Z])(?=.*[a-z])(?=.*[#!@$^&*_-]).{7,16}$/;
    return !empty(value) && value.length >= 8 && rePass.test(value);
};

const email = (value) => {
    const re =
        /^((?!.*@-)([^<>()[\].,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|([a-zA-Z0-9-]+\.)+(com|in|edu|org|io|net|gov|mil|co|int|eu|uk|us|coop|aero|museum|name|pro|info|jobs|mobi|tel|travel|asia|cat|post|tel|xxx|aero|museum|arpa|biz|gov|edu|coop|int|mil|net|org|eu|aero|museum|name|pro|info|jobs|mobi|tel|travel|asia|cat|post|xxx))$/;
    return re.test(String(value).toLowerCase());
};

const loginPassword = (value) => {
    const regex = /(?=(.*\d){3})(?=(.*[a-z]){1})(?=(.*[A-Z]){1})/;
    return !empty(value) && value.length >= 8 && value.length <= 16 && regex.test(value);
};
const numericPhone = (value) => {
    const reNum = /^[0-9]*$/;
    return !empty(value) && value.length == 10 && reNum.test(value);
};
const aadhar = (value) => {
    const reNum = /^[0-9]*$/;
    return !empty(value) && value.length == 12 && reNum.test(value);
};

const date = (value) => {
    return moment(value).isValid();
};
const boolean = (value) => {
    if (typeof value === 'boolean') {
        return true;
    }
    if (value === true || value === false || value === 'true') {
        return true;
    }
    return false;
};
const description = (value) => {
    if (!value) {
        return false;
    }
    value = value.trim();
    return value.length >= 2 && value.length <= 200;
};
const alphabets = (value) => {
    const reg = /^[a-zA-Z ]+$/;
    return !empty(value) && reg.test(value);
}
const number = (value) => {
    const reg = /^[0-9]+$/;
    return !empty(value) && reg.test(value);
}

const numberType = (value) => {
    const reg = /^[0-9]+$/;
    return reg.test(value) && value != 0 && !empty(value);
}

const numberType2 = (value) => {
    const reg = /^[0-9]+$/;
    return reg.test(value) && value != 0;
}

const minAlphabets = (value, min) => {
    const reg = new RegExp(`^[A-Za-z ]{${min},}$`);
    return reg.test(value);
}

const newNumberValidator = (value) => {
    const reg = /^(05\d\d{7})|\+?(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/
    return reg.test(value);
}

const mailNumber = (value) => {

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // Regular expression for phone number validation
    const phoneRegex = /^[0-9]*$/
    // /^\d{15}$/;

    return !empty(value) && (emailRegex.test(value) || phoneRegex.test(value));
}

const Validation = {
    number,
    empty,
    minOf,
    boolean,
    maxOf,
    email,
    password,
    numericPhone,
    loginPassword,
    date,
    description,
    aadhar,
    alphabets,
    numberType,
    numberType2,
    minAlphabets,
    newNumberValidator,
    mailNumber,
    minOfNew
};

export default Validation;