import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Navbar from '../components/Navbar.js'
import { useState } from 'react'
import { prisma } from '../lib/prisma'
import { useRouter } from 'next/router'

interface Essays{
  essays: {
    id: number
    prompt: string
    wordcount: number
    isRequired: boolean
    content: string
  } []
}

interface FormData {
  prompt: string
  wordcount: number
  isRequired: boolean
  content: string
  drafts: Array<number>
}

const Home = ({essays}: Essays) => {
  
  const [form, setForm] = useState<FormData>({
    prompt: '',
    wordcount: 0,
    isRequired: false,
    content: '',
    drafts: [],
  })


  const router = useRouter()

  const refreshData = () => {
    router.replace(router.asPath)
  }

  async function create(data: FormData) {
    try {
      fetch('http://localhost:3000/api/createEssay', {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }).then(() => {
      setForm({prompt: '', wordcount: 0, isRequired: false, content: '', drafts: [] })
      refreshData()
      })
    } catch (error) {
      console.log (error);
    }
  }

  async function deleteEssay(id: number) {
    try {
      fetch(`http://localhost:3000/api/essay/${id}`, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'DELETE'
      }).then(()=> {
        refreshData()
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (data: FormData) => {
    try {
      create(data)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Head>
        <title>Essay Dive</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>

      <div>
        <Navbar/>

        <main>
        <h1 className="text-center"> Essays </h1>
        
        <form 
          id="create-essay-form"
          onSubmit={e => {
            e.preventDefault()
            handleSubmit(form)
          }}>
          <div id="create-essay-form" className="pt-8 mx-10">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Add an Essay</h3>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="prompt" className="block text-sm font-medium text-gray-700">
                Prompt
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="prompt"
                  placeholder="Paste your essay prompt here."
                  value={form.prompt}
                  onChange={e => setForm({...form, prompt: e.target.value})}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="wordcount" className="block text-sm font-medium text-gray-700">
                Word Count
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="wordcount"
                  placeholder="250"
                  min="1"
                  max="2000"
                  value={form.wordcount}
                  onChange={e => setForm({...form, wordcount: parseInt(e.target.value)})}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>

          <div className="mt-5 relative flex items-start">
            <div className="flex items-center h-5">
              <input
                id="comments"
                name="comments"
                type="checkbox"
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                onChange={e => setForm({...form, isRequired: e.target.checked})}
              />
              <div className="ml-3 text-sm">
                  <label htmlFor="comments" className="font-medium text-gray-700">
                    Required?
                  </label>
              </div>
           </div>
          </div>

            

          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="prompt" className="block text-sm font-medium text-gray-700">
                Content
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="prompt"
                  placeholder="Paste your essay prompt here."
                  value={form.content}
                  onChange={e => setForm({...form, content: e.target.value})}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            </div>
          </div>


          <button
              type="submit"
              className="ml-10 mt-5 bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Essay
          </button>
        </form>


        {/* ESSAY INDEX */}

        <div >
          <ul>
            {essays.map(essay => {
              if (essay.isRequired) {
                return (
                <div key={essay.id} className="ml-10 mt-5">
                <h2><strong>{essay.prompt}</strong></h2>
                <h3>Word Count: {essay.wordcount}</h3>
                <h4>Essay Required</h4>
                </div>
              )} else {
              return (
              <div key={essay.id} className="ml-10 mt-5">
                <h2><strong>{essay.prompt}</strong></h2>
                <h3>Word Count: {essay.wordcount}</h3>
                <h4>{essay.isRequired}</h4>
                <p>id: {essay.id}</p>
                <button onClick={()=> deleteEssay(essay.id)}>x</button>
              </div>
              )
              }
            })}

          </ul>

        </div>





        </main>
    </div>
    </div>

  )
}

export default Home


export const getServerSideProps: GetServerSideProps = async () => {
  const essays = await prisma.essay.findMany({
    select: {
      id: true,
      prompt: true,
      wordcount: true,
      isRequired: true,
      content: true
    }
  })

  return {
    props: {
      essays
    }
  }
}
