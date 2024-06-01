import { getAuth, updatePassword, onAuthStateChanged, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";

export const onChangePassword = async (currentPassword: string, newPassword: string) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
        try {
            // Повторная аутентификация пользователя
            const credential = EmailAuthProvider.credential(user.email, currentPassword);
            await reauthenticateWithCredential(user, credential);

            // Обновление пароля
            await updatePassword(user, newPassword);
            console.log("Пароль успешно обновлен");
            return true;
        } catch (error) {
            console.error("Ошибка при обновлении пароля:", error);
            if (error.code === 'auth/wrong-password') {
                console.error("Текущий пароль неверен.");
            } else if (error.code === 'auth/too-many-requests') {
                console.error("Слишком много попыток. Пожалуйста, попробуйте позже.");
            } else {
                console.error("Ошибка:", error.message);
            }
            return false;
        }
    }
    return false;
};
