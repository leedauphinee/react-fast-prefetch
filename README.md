# react-fast-prefetch

Prefetch data in your react apps before your components renders.

```
yarn add react-fast-prefetch
```

Export the ReactPrefetchProvider and wrap your app in it. This allows us to use the useReactPrefetch from anywhere on our site.

```javascript
import { ReactPrefetchProvider } from "react-fast-prefetch";

<ReactPrefetchProvider>
  <YourApp />
</ReactPrefetchProvider>;
```

Import the useReactPrefetch hook into a component where your href link is located.
Destructure the prefetch function from the hook, and call it onMouseEnter or onMouseDown depending on the priorty of your link. Applying to many onMouseEnter prefetches could cause memory issues, so it's recommended to only use onMouseEnter on very high traffic links.

```javascript
import { useReactPrefetch } from "react-fast-prefetch";

const Home = () => {
  const { prefetch } = useReactPrefetch();

  const prefetchData = () => {
    prefetch("https://jsonplaceholder.typicode.com/todos/1");
  };

  return <Link onMouseEnter={prefetchData} to="/about"></Link>;
};
```

In your component that that needs data, destructure fetchData from the hook, and use it like you would with axios.

```javascript
import { useReactPrefetch } from "react-fast-prefetch"

const About = () => {
const { fetchData } = useReactPrefetch()

    useEffect(() => {
        fetchData('https://jsonplaceholder.typicode.com/todos/1').then(response =>
            // USE THE RESPONSE FROM FETCH HERE
        );
    },  [])

    return (
        <Link onMouseEnter={prefetchData}></Link>
    )

}
```
