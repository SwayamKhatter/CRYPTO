import TreadingHistory from '../Portfilio/TreadingHistory'

const Activity = () => {
  return (
    // <div className='px-20 bg-gradient-to-b from-gray-900 to-gray-800 h-screen'>
    //   <p className='py-5 pb-10 text-2xl font-semibold'>Trading History</p>
    //     <TreadingHistory/>
    // </div>



    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-200 px-4 md:px-10 lg:px-20 py-10">
      {/* Section Header */}
      <div className="flex items-center justify-between pb-6">
        <h1 className="text-3xl md:text-4xl font-semibold">Trading History</h1>
      </div>

      {/* Trading History Component */}
      <div className="bg-gray-800 shadow-lg rounded-lg p-5 md:p-8 border border-gray-700 animate-fade-in">
        <TreadingHistory />
      </div>
    </div>
  )
}

export default Activity