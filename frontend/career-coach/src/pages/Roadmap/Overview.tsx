import { useState } from "react"
import { Checkmark } from "../../assets/icons/Checkmark";

export const Overview = () => {
    const [selectedMonth, setSelectedMonth] = useState<number>();

    const handleCircleClick = (monthIndex: number) => {
        if (monthIndex === 0 && selectedMonth === 0) {
          setSelectedMonth(-1)
        } else {
          setSelectedMonth(monthIndex)
        }
      }

  return (
    <div className="flex flex-col items-center mt-28">
    <div className="border-2 border-purpleText py-2 px-10 rounded-lg">
      <p className="text-xs font-bold mb-4 text-purpleText">Overview</p>
      <div className="space-y-4">
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className="flex items-center gap-16">
            <span className="text-xs flex-1 font-medium">Month {i + 1}</span>
            <div className="relative flex items-center">
              {i <= (selectedMonth ?? -1) ? (
                <div onClick={() => handleCircleClick(i)} className="w-6 h-6 bg-purple border-2 border-purpleText rounded-full flex items-center justify-center text-white z-10 cursor-pointer">
                  <Checkmark />
                </div>
              ) : (
                <div onClick={() => handleCircleClick(i)} className="w-6 h-6 bg-buttonWhite border-2 border-purpleText rounded-full flex items-center justify-center text-white z-10 cursor-pointer"></div>
                )}
              {i < 11 && (
                <div className={`absolute w-1 h-6 top-full left-1/2 transform -translate-x-1/2 ${i <= (selectedMonth ?? -1) ? 'bg-purpleText': 'bg-line'}`}></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  )
}
