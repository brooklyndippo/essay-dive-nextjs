import EssayEditor from "../components/EssayEditor"
import FileNavigation from "../components/FileNavigation"
import {useState} from 'react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Dashboard() {

  const [college, setCollege] = useState(null)
  const [essay, setEssay] = useState(null)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-6">
        <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:block lg:col-span-3 xl:col-span-2">
            <nav aria-label="Sidebar" className="sticky top-6 divide-y divide-gray-300">
              <FileNavigation setEssay={setEssay}/>
            </nav>
          </div>
          <main className="lg:col-span-9 xl:col-span-6">
              <EssayEditor essay={essay.id}/>
         </main>
          <aside className="hidden xl:block xl:col-span-4">
            <div className="sticky top-6 space-y-4">{/* Your content */}</div>
          </aside>
        </div>
      </div>
    </div>
  )
}
