import bcrypt from 'bcrypt';

export const generateHashedPassword = async (password) => {
    const saltRounds = 10;
    try {
        const hashed = await bcrypt.hash(password, saltRounds);
        return hashed;
    }
    catch(error) {
        console.error('Error while hashing password: ', error.message);
    }
};

export const compareHashedPasswords = async (inputPassword, hashedPassword) => {
    try {
        const isMatch = await bcrypt.compare(inputPassword, hashedPassword);
        return isMatch;
    } catch (error) {
        console.error("Error while comparing passwords: ", error.message);
    }
};