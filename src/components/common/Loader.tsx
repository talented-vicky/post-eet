import { MoonLoader, DotLoader, BeatLoader, BounceLoader } from 'react-spinners';
// BeatLoader, BarLoader, BounceLoader


// form submission
const BeatLoaderr = () => {
    return <BeatLoader color='#ffff' loading={true} size={10} />
}
const MoonLoaderr = () => {
    return <MoonLoader color='#ffff' loading={true} size={20} />
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