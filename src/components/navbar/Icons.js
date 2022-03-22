import Logo1 from './../../img/logo.jpg';

export const Logo = () => {
    return (
        <div className='flex items-center justify-start text-white space-x-4'>
            <div className="w-12">
                <img className="rounded-xl" src={Logo1} alt="MFER Friends" />
            </div>
            <h1 className='hidden sm:flex text-3xl'>MFER Friends</h1>
        </div>
    )
}
