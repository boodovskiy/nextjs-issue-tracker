import Image from 'next/image'
import Link from 'next/link'
import Pagination from './components/Pagination'

export default function Home({searchParams}: { searchParams: { page: string }}) {
  return (
    <main>
      <h1 className='p-4'>
        <Pagination itemCount={100} pageSize={10} currentPage={parseInt(searchParams.page)} />
      </h1>
    </main>
  )
}
