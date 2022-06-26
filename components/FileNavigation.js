import { ChevronDownIcon } from '@heroicons/react/solid'

export default function FileNavigation() {

    const colleges = [
        { id: 1 , name: "Harvard College", essays: [ {id: 1, prompt: "Why Harvard?"}, {id: 2, prompt: "Tell us about a time you helped someone." }]},
        { id: 2, name: "University of Texas", essays: [ {id: 1, prompt: "Why Harvard?"}, {id: 2, prompt: "Tell us about a time you helped someone." }]},
        { id: 3, name: "Boston University", essays: [ {id: 1, prompt: "Why Harvard?"}, {id: 2, prompt: "Tell us about a time you helped someone." }]}
      ]

    return (

    <div>
        <h2>Colleges</h2>

      <ul role="list" className="divide-y divide-gray-200">
          {colleges.map ((college) => (
            <li key={college.id} className="py-4 ">
            <button className="group">
            <div className="flex items-center text-left h-12 px-3 font-semibold hover:bg-gray-200">
                <span>{college.name}</span>
                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </div>
            <div className="max-h-0 overflow-hidden duration-300 group-focus:max-h-40 text-align-left">
                {college.essays.map((essay) => (
                    <button 
                        key={essay.id} 
                        onClick={setEssay(essay.id)}
                        className="w-full py-3 px-4 text-left flex items-center text-sm hover:bg-gray-200"
                        >
                        <a href="#">{essay.prompt}</a>
                    </button>
                ))}

            </div>
            </button>
           </li>
          ))}
          
      </ul>

    </div>

    )
};