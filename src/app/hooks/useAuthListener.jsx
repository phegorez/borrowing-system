import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { getCurrent } from '../store/authSlice';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const useAuthListener = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const checkAuth = async () => {
            return new Promise((resolve) => {
                onAuthStateChanged(auth, async (user) => {
                    if (user) {

                        const docRef = doc(db, 'users', user.uid)
                        const docSnap = await getDoc(docRef)

                        if (docSnap.exists()) {
                            const userData = docSnap.data()
                            const getCurrentUser = {
                                uid: user.uid,
                                email: userData.email,
                                photo: userData.photo,
                                role: userData.role,
                                displayName: user.displayName,
                                createdDate: userData.createdDate.toDate().toLocaleString(),
                                updatedDate: userData.updatedDate ? userData.updatedDate.toDate().toLocaleString() : null
                            }
                            dispatch(getCurrent(getCurrentUser));
                        }


                        resolve(true);
                    } else {
                        resolve(false);
                    }
                });
            });
        };

        checkAuth();

        // Clean up the listener
        return () => {
            // Unsubscribe or perform any clean-up here if needed
        };
    }, [dispatch]);

    // You can return anything you want here if needed
};

export default useAuthListener;
