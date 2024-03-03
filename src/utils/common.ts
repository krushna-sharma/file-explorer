const generateRandomID = (length: number) => {
    const characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
        charLength = characters.length;
    let result = "",
        counter = 0;
    while (counter++ < length) {
        result += characters.charAt(Math.floor(Math.random() * charLength));
    }
    return result;
};

export const getID = () => {
    return generateRandomID(8);
};
