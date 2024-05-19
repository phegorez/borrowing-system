import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { getCurrent } from '../store/authSlice';
import { auth } from '../firebase';

const useAuthListener = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const checkAuth = async () => {
            return new Promise((resolve) => {
                onAuthStateChanged(auth, async (user) => {
                    if (user) {
                        const getCurrentUser = {
                            id: user.uid,
                            email: user.email,
                            displayName: user.displayName
                        }
                        dispatch(getCurrent(getCurrentUser));
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
