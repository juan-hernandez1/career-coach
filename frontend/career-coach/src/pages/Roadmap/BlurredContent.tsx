import help from "../../assets/images/Overwhelmed-amico 1.png"
import { DownChevron } from "../../assets/icons/DownChevron"
import { DownArrow } from '../../assets/icons/DownArrow';

export const BlurredContent = () => {
  return (
    <div className="flex justify-center items-center">
        <div className="flex flex-col items-center">
            <div className="text-purpleText font-semibold text-base mb-16 mt-7">
                <h4>Whoops, our roadmap is feeling a bit like a procrastinating student and can only plan the next 3 months. But hey, with a focused sprint, you'll be acing that career exam in no time!</h4>
            </div>
            <div className="absolute z-10 mt-40">
                <img src={help} alt="struggling man" />
            </div>
            <div className="flex flex-col items-center blur">
                <div className="border-4 rounded-md border-purpleText p-5">
                    <div className="flex flex-col">
                        <div className="flex justify-between">
                            <span className="font-bold text-base text-purpleText">Month 4: Lorem ipsum dolor sit amet consectetur adipisicing. </span>
                            <div>
                                <button
                                    className="border-4 rounded-lg border-purpleText p-1"
                                >
                                    <DownChevron />
                                </button>
                            </div>
                        </div>
                        <p className="text-xs font-medium text-purpleText">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae sit laborum recusandae accusantium, est assumenda saepe consectetur. Magnam, magni earum accusantium quis quod illo distinctio repellat!</p>
                    </div>
                </div>
                <div className="my-1">
                    <DownArrow />
                </div>
                <div className="border-4 rounded-md border-purpleText p-5">
                    <div className="flex flex-col">
                        <div className="flex justify-between">
                            <span className="font-bold text-base text-purpleText">Month 5: Lorem ipsum dolor sit amet consectetur adipisicing. </span>
                            <div>
                                <button
                                    className="border-4 rounded-lg border-purpleText p-1"
                                >
                                    <DownChevron />
                                </button>
                            </div>
                        </div>
                        <p className="text-xs font-medium text-purpleText">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae sit laborum recusandae accusantium, est assumenda saepe consectetur. Magnam, magni earum accusantium quis quod illo distinctio repellat!</p>
                    </div>
                </div>
                <div className="my-1">
                    <DownArrow />
                </div>
                <div className="border-4 rounded-md border-purpleText p-5">
                    <div className="flex flex-col">
                        <div className="flex justify-between">
                            <span className="font-bold text-base text-purpleText">Month 6: Lorem ipsum dolor sit amet consectetur adipisicing. </span>
                            <div>
                                <button
                                    className="border-4 rounded-lg border-purpleText p-1"
                                >
                                    <DownChevron />
                                </button>
                            </div>
                        </div>
                        <p className="text-xs font-medium text-purpleText">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae sit laborum recusandae accusantium, est assumenda saepe consectetur. Magnam, magni earum accusantium quis quod illo distinctio repellat!</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
