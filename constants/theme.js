import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const COLORS = {
    purple: '#2C2C58',
    fadePurple: '#8C8CA4',

    bgColor: 'white',
}

export const SIZES = {
    // font sizes
    headerTitle: 17,

    // app dimensions
    width,
    height,
};

export const FONTS = {
    headerTitle: { fontFamily: "Roboto-Bold", fontSize: SIZES.headerTitle },
};