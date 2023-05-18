const Form = ({Submit}) => {

    return (
        <div>
            <form 
            className='flex flex-row gap-5 font-mont'
            onSubmit={(e) => Submit(e)}>
                <input 
                className='p-1 rounded-lg'
                placeholder='...' />
                <button className='text-white' type='submit'>Search</button>
            </form>
        </div>
    )
}

export default Form