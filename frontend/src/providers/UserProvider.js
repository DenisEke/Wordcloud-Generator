import React, {createContext, useContext, useEffect, useState} from "react";
import {FirebaseContext} from "./FirebaseProvider";

export const UserContext = createContext();

export default function UserProvider(props) {

    const auth = useContext(FirebaseContext).auth;
    const firestore = useContext(FirebaseContext).firestore;

    const [user, setUser] = useState(null);
    const [authenticated, setAuthenticated] = useState();

    useEffect(() => {

        const observers = [];

        if (user) {
            const query = firestore.collection('users').doc(user.uid).collection("payments").orderBy('created', 'asc');
            const observer = query.onSnapshot(querySnapshot => {
                console.log("snapshot payments");
                const newPayments = [];
                querySnapshot.forEach((doc) => newPayments.push({id: doc.id, ...doc.data()}));
                setUser({...user, payments: newPayments, amount: getDownloadsLeft(newPayments)});
            }, err => {
                console.log(`Encountered error: ${err}`);
            });
            observers.push(observer);
        }

        return () => {
            observers.forEach((o) => o());
        }

    }, [authenticated]);

    useEffect(() => {

        const unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
                setAuthenticated(true);
                console.log("auth state changed to logged in");
            } else {
                setUser(null);
                setAuthenticated(false);
                console.log("auth state changed to logged out");
            }
        });

        // returned function will be called on component unmount
        return () => {
            unsubscribeFromAuth()
        }
    }, []);

    return (
        <UserContext.Provider value={user}>
            {props.children}
        </UserContext.Provider>)

}

function getDownloadsLeft(payments) {

    if (!payments) {
        return 0;
    }

    let amount = 0;

    payments.forEach(payment => {
        amount += payment.amount
    });

    return amount;
}

