import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const COLORS = {
    purple: '#2C2C58',
    fadePurple: '#8C8CA4',
    gray: 'gray',

    bgColor: 'white',
}

export const SIZES = {
    // font sizes
    headerTitle: 17,
    bigTitle: 24,
    desc: 15,
    title: 16,
    body: 13,

    // app dimensions
    width,
    height,
};

export const FONTS = {
    headerTitle: { fontFamily: "Roboto-Bold", fontSize: SIZES.headerTitle },
    bigTitle: { fontFamily: "Roboto-Bold", fontSize: SIZES.bigTitle },
    desc: { fontFamily: "Roboto-Bold", fontSize: SIZES.desc },
    title: { fontFamily: "Roboto-Bold", fontSize: SIZES.title },
    body: { fontFamily: "Roboto-Regular", fontSize: SIZES.body },
};