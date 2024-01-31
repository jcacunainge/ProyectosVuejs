import { generateClasses } from '@formkit/themes'
const config = {
    config: {
        classes: generateClasses({
            global:{
                wrapper: 'mb-3',
                message: 'bg-red-500 text-white text-center text-sm font-bold uppercase p-1 my-2 rounded-lg',
                label: 'block mb-1 font-bold text-white',
                input: 'w-full p-2 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400'
            },
            submit: {
                input: '$reset bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-bold w-full p-1 mt-5'
            }

        })
    }
}

export default config