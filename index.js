import * as React from "react";
import axios from "axios";
const ReactPrefetchContext = React.createContext([]);
export const ReactPrefetchProvider = ({ children }) => {
    const PromiseRef = React.useRef([]);
    const prefetch = (url, options = {}) => {
        const newData = PromiseRef.current.find((data) => data.url === url);
        if (newData) {
            return;
        }
        const promise = axios.get(url, options);
        const data = [...PromiseRef.current, { url, value: promise }];
        PromiseRef.current = data;
    };
    const fetchData = (url, options = {}) => {
        const test1 = PromiseRef.current.find((data) => data.url === url);
        if (test1) {
            if (test1.value instanceof Promise) {
                return test1.value;
            }
        }
        return new Promise((resolve, reject) => {
            const newData = PromiseRef.current.find((data) => data.url === url);
            if (newData) {
                resolve(newData.value);
                const data = PromiseRef.current.filter((d) => d.url !== url);
                PromiseRef.current = data;
            }
            else {
                axios
                    .get(url, options)
                    .then((res) => {
                    resolve(res);
                })
                    .catch((err) => {
                    reject(err);
                });
            }
        });
    };
    const data = [PromiseRef.current, prefetch, fetchData];
    return (React.createElement(ReactPrefetchContext.Provider, { value: data }, children));
};
export const useReactPrefetch = () => {
    const context = React.useContext(ReactPrefetchContext);
    if (context === undefined) {
        throw new Error("useReactPrefetch can only be used inside ReactPrefetchProvider");
    }
    const [PromiseRef, prefetch, fetchData] = context;
    React.useEffect(() => {
        return () => {
            return (PromiseRef.current = []);
        };
    }, []);
    return { prefetch, fetchData };
};
//# sourceMappingURL=index.js.map