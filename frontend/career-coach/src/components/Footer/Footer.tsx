import facebook from '../../assets/images/facebook.png'
import instagram from '../../assets/images/instagram.png'
import x from '../../assets/images/x.png'

export const Footer = () => {
  return (
    <footer className="flex items-center bg-footer h-[110px] w-full">
        <div className="flex justify-between w-full mx-14 font-medium text-sm">
            <div>
                <p>All rights reserved The Jays 2024</p>
            </div>
            <div className="flex gap-5">
                <img src={facebook} alt="facebook" />
                <img src={instagram} alt="instagram" />
                <img src={x} alt="x" />
            </div>
        </div>
    </footer>
  )
}
