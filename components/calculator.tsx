'use client'

import { useEffect, useState } from "react"

export default function Calculator() {
  const [subTotal, setSubTotal] = useState<number | undefined>(undefined)
  const [percentage, setPercentage] = useState<number | undefined>(undefined)
  const [tipResult, setTipResult] = useState<string | undefined>(undefined)
  const [totalResult, setTotalResult] = useState<string | undefined>(undefined)

  const handleSubTotalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubTotal(Number(e.target.value))
  }

  const handlePercentageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPercentage(Number(e.target.value) / 100)
  }


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if ((subTotal == 0 || subTotal == undefined) || (percentage == 0 || percentage == undefined)) {
      setTipResult(undefined)
      setTotalResult(undefined)
    } else {
      const tip = Math.round((subTotal * percentage) * 100) / 100
      setTipResult(tip.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      }))
      const total = Math.round((subTotal + (subTotal * percentage)) * 100) / 100
      setTotalResult(total.toLocaleString('en-US', {
        style: "currency",
        currency: 'USD',
      }))
    }



  }


  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold">Tip Calculator</h1>
      <form className="flex flex-col items-center gap-4 my-4" onSubmit={handleSubmit}>
        <div className="flex flex-col items-end gap-2 my-4">
          <div>
            <label htmlFor="subtotal">Sub Total: </label>
            <input name="subtotal" className="bg-black border border-zinc-800 p-2 rounded-lg" type="text" placeholder="Bill amount..." onChange={handleSubTotalChange} />
          </div>
          <div>
            <label htmlFor="percentage">Percentage: </label>
            <input name="percentage" className="bg-black border border-zinc-800 p-2 rounded-lg" type="text" placeholder="Percentage" onChange={handlePercentageChange} />
          </div>

        </div>

        <button className="hover:bg-zinc-900 hover:scale-[1.02] active:scale-[.99] transition-all border border-zinc-700 rounded-lg w-52" type="submit">Submit</button>
        <div className="h-52 flex flex-col gap-4 items-center mt-8">
          <p>Tip amount:</p>
          <div className="h-16">
            <p className="text-4xl font-bold">{tipResult ?? ''}</p>
          </div>
          <p>Total Bill:</p>
          <p className="text-4xl font-bold">{totalResult ?? ''}</p>
        </div>
      </form>
    </div>
  )
}
