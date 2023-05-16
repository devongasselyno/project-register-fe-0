import React, { useEffect, useState } from 'react'

function Pagination({ pages = 7, setCurrentPage}) {

    const numberOfPages = []
    for (let i = 1; i <= pages; i++) {
        numberOfPages.push(i)
    }

    const [currentButton, setCurrentButton] = useState(1)

    const [arrOfCurrButtons, setArrOfCurrButtons] = useState([])

    useEffect(() => {
        let tempNumberOfPages = [...arrOfCurrButtons]
        let dotsInitial = '...'

        if (numberOfPages.length < 6){
            tempNumberOfPages = numberOfPages
        }
        else if (currentButton >= 1 && currentButton <= 3) {
            tempNumberOfPages = [1, 2, 3, 4, dotsInitial, numberOfPages.length]
        }

        setArrOfCurrButtons(tempNumberOfPages)
        setCurrentPage(currentButton)
    }, [currentButton])

  return (
    <div className='pagination-container flex justify-items-center items-center w-full text-sm gap-3'>
        <a className='flex justify-items-center items-center h-10 w-10 no-underline text-black transition border-solid border-2 border-gray-500 cursor-pointer' href='#'>
            Prev
        </a>

        {arrOfCurrButtons.map(((item, index) => {
            return <a
                href='a'
                key={index}
                className={`${currentButton === item ? 'active' : ''}`}
                onClick={() => setCurrentButton(item)}
            >
                {item}
            </a>
        }))}
        <a className='flex justify-items-center items-center h-10 w-10 no-underline text-black transition border:[1px] cursor-pointer' href='#'>1</a>
        
        <a className='flex justify-items-center items-center h-10 w-10 no-underline text-black transition border:[1px] cursor-pointer' href='#'>
            Next
        </a>
    </div>
  )
}

export default Pagination