import { MoonLoader, DotLoader, BeatLoader, BounceLoader } from 'react-spinners';
// BeatLoader, BarLoader, BounceLoader


// form submission
const BeatLoaderr = () => {
    return <BeatLoader color='#ffff' loading={true} size={8} />
}
const MoonLoaderr = () => {
    return <MoonLoader color='#7c7c7c' loading={true} size={50} />
}

// data fetch
const DotLoaderr = () => {
    return <DotLoader color='#39251C' loading={true} size={30} />
}
const BounceLoaderr = () => {
    return <BounceLoader color='#39251C' loading={true} size={20} />
}


const loaderSpinner = {
    MoonLoaderr,
    DotLoaderr,
    BounceLoaderr,
    BeatLoaderr,
}

export default loaderSpinner;