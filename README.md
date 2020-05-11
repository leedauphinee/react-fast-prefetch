# react-prefetch

Prefetch data in your react apps before the component renders.
`yarn add react-fast-prefetch`

`import {ReactPrefetchProvider} from "react-fast-prefetch"

<ReactPrefetchProvider>
    <YourApp />
</ReactPrefetchProvider>
`

`import {useReactPrefetch} from "react-fast-prefetch"

const Home = () => {

    const {prefetch} = useReactPrefetch()

    const prefetchData = () => {
        prefetch('https://jsonplaceholder.typicode.com/todos/1');
    }

    return (
        <Link onMouseEnter={prefetchData} to="/about"></Link>
    )

}
`

`import {useReactPrefetch} from "react-fast-prefetch"

const About = () => {
const {fetchData} = useReactPrefetch()

    useEffect(() => {
        fetchData('https://jsonplaceholder.typicode.com/todos/1').then(response =>
            // USE THE RESPONSE FROM FETCH HERE
        );
    },  [])

    return (
        <Link onMouseEnter={prefetchData}></Link>
    )

}
`
